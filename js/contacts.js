let contactsList = [];
let currentContactIndex = null;

//function retrieves the data from the Firebase database
async function fetchContactsData() {
  try {
    let contacts = await getData("contacts");
    if (!contacts || contacts.length === 0) {
      console.error("Die Kontaktliste ist leer.");
      return [];
    }
    return contacts;
  } catch (error) {
    console.error("Fehler beim Abrufen der Kontakte:", error);
    return [];
  }
}

//groups the contacts according to the first letter
function groupContactsByInitial(contacts) {
  return contacts.reduce((grouped, contact) => {
    let initial = contact.name.charAt(0).toUpperCase();
    if (!grouped[initial]) {
      grouped[initial] = [];
    }
    grouped[initial].push(contact);
    return grouped;
  }, {});
}

function sortContactsByName(contacts) {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getRandomColor() {
  let r = Math.floor(Math.random() * 128) + 128;
  let g = Math.floor(Math.random() * 128) + 128;
  let b = Math.floor(Math.random() * 128) + 128;
  return `rgb(${r}, ${g}, ${b})`;
}

//sorts and generates the list to display it
async function renderContactList() {
  let contacts = await fetchContactsData();
  if (!contacts.length) return;

  contactsList.length = 0;
  contactsList.push(...contacts);

  sortContactsByName(contacts);
  let groupedContacts = groupContactsByInitial(contacts);
  let html = generateContactListHTML(groupedContacts);

  document.getElementById("contactList").innerHTML = html;
}

async function showContactDetails(id) {
  let contact = await getContactById(id);
  if (!contact) {
    console.error("Kontakt nicht gefunden.");
    return;
  }

  let contactDetailsHTML = generateContactDetailsHTML(contact);
  let contactDetailsContainer = document.getElementById("current-contact");

  if (contactDetailsContainer) {
    contactDetailsContainer.classList.remove("slide-in-right");
    let replayAnimationSlide = contactDetailsContainer.offsetWidth;
    contactDetailsContainer.classList.add("slide-in-right");

    contactDetailsContainer.innerHTML = contactDetailsHTML;
    document.getElementById("contactDetailsContainer").classList.add("active");
    toggleResponsiveView("details");
  } else {
    console.error("Element mit ID 'current-contact' nicht gefunden.");
  }
}

//neue Suchfunktion in einer JSON Struktur
async function getContactById(id) {
  let contacts = await getData("contacts");
  let contact = contacts.find((contact) => contact.id === id);

  return contact;
}

async function addContact() {
  let newContact = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    color: document.getElementById("color").value,
  };

  try {
    await pushData("contacts", newContact);
    contactsList.push(newContact);
    renderContactList();
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Kontakts:", error);
  }
}

//loads the contact data and opens the edit dialog
async function editContact(id) {
  let contact = await getContactById(id);
  if (!contact) {
    console.error("Kontakt nicht gefunden.");
    return;
  }

  currentContactIndex = contactsList.findIndex((contact) => contact.id === id);
  if (currentContactIndex === -1) {
    console.error("Aktueller Kontaktindex ist ungültig.");
    return;
  }

  if (!fillContactForm(contact)) {
    console.error("Ein oder mehrere Formularelemente fehlen.");
    return;
  }

  // openEditContactDialog();
}

//handleSaveContact takes over the main logic for saving a contact and then updates the contact list
async function handleSaveContact(updatedContact) {
  try {
    await changeData("contacts", updatedContact);
    contactsList[currentContactIndex] = updatedContact;
    renderContactList();
    closeEditDialog();
    document.getElementById("current-contact").innerHTML = "";
    document
      .getElementById("contactDetailsContainer")
      .classList.remove("active");
  } catch (error) {
    console.error("Fehler beim Speichern des Kontakts:", error);
    alert("Failed to save the contact. Please try again.");
  }
}

//checks the current contact index and then calls handleSaveContact to save the contact
async function saveEditedContact() {
  if (currentContactIndex === null || currentContactIndex === -1) {
    return console.error("Aktueller Kontaktindex ist ungültig.");
  }

  let nameElement = document.getElementById("error-contact-edit-name-input");
  let emailElement = document.getElementById("error-contact-edit-email-input");
  let phoneElement = document.getElementById("error-contact-edit-phone-input");

  if (!nameElement || !emailElement || !phoneElement) {
    return console.error("Ein oder mehrere Formularelemente fehlen.");
  }

  let updatedContact = {
    ...contactsList[currentContactIndex],
    name: nameElement.value.trim(),
    email: emailElement.value.trim(),
    phone: phoneElement.value.trim(),
    color: contactsList[currentContactIndex].color,
    initials: getInitials(nameElement.value.trim()),
  };

  handleSaveContact(updatedContact);
}

//saves the data in the database
async function saveNewContact() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill out all fields.");
    return;
  }

  let newContact = {
    name: name,
    email: email,
    phone: phone,
    color: getRandomColor(),
    initials: getInitials(name),
  };

  try {
    await pushData("contacts", newContact);
    contactsList.push(newContact);
    renderContactList();
    closeDialog();
  } catch (error) {
    console.error("Error saving new contact:", error);
    alert("Failed to save the contact. Please try again.");
  }
}

async function deleteContact(id) {
  for (let i = 0; i < contactsList.length; i++) {
    if (contactsList[i].id === id) {
      currentContactIndex = i;
      break;
    }
  }

  let contactId = contactsList[currentContactIndex].id;
  try {
    await deleteData("contacts", { id: contactId });
    contactsList.splice(currentContactIndex, 1);
    document.getElementById("current-contact").innerHTML = "";

    renderContactList();
    await showPopupMessage("signup-popup-message", "Contact was deleted!");
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
  }
}

function clearForm() {
  let nameElement = document.getElementById("name");
  let emailElement = document.getElementById("email");
  let phoneElement = document.getElementById("phone");

  if (nameElement) nameElement.value = "";
  if (emailElement) emailElement.value = "";
  if (phoneElement) phoneElement.value = "";
}

/**
 * JS für Dialog Niko
 */

async function openDialog(type, id) {
  let boardDialogRef = document.getElementById("contactDialog");
  boardDialogRef.innerHTML = getTemplateDialog(type, await getContactById(id));
  boardDialogRef.showModal();
}

function closeDialog() {
  let boardDialogRef = document.getElementById("contactDialog");
  boardDialogRef.classList.add("hide");
  boardDialogRef.addEventListener(
    "webkitAnimationEnd",
    function () {
      boardDialogRef.classList.remove("hide");
      boardDialogRef.close();
      boardDialogRef.removeEventListener(
        "webkitAnimationEnd",
        arguments.callee,
        false
      );
    },
    false
  );
}

function toggleResponsiveView(mode) {
  let backBtn = document.querySelector(".back-btn");
  let contactListContainer = document.getElementById("contactListContainer");
  let contactDetailsContainer = document.getElementById(
    "contactDetailsContainer"
  );
  if (mode === "details" && window.innerWidth <= 635) {
    contactListContainer.style.display = "none";
    contactDetailsContainer.style.display = "block";
    if (backBtn) backBtn.classList.add("active");
  } else if (window.innerWidth <= 635) {
    contactListContainer.style.display = "block";
    contactDetailsContainer.style.display = "none";
    if (backBtn) backBtn.classList.remove("active");
  }
}

function backToContactList() {
  let contactListContainer = document.getElementById("contactListContainer");
  let contactDetailsContainer = document.getElementById(
    "contactDetailsContainer"
  );

  contactListContainer.style.display = "block";
  contactDetailsContainer.style.display = "none";
  toggleResponsiveView("list");
}

// function addCloseBtnToDialog() {
//   let closeAddBtn = document.getElementById("closeAddBtn");
//   let closeEditBtn = document.getElementById("closeEditBtn");

//   if (closeAddBtn && !closeAddBtn.dataset.listenerAdded) {
//     closeAddBtn.addEventListener("click", closeDialog);
//     closeAddBtn.dataset.listenerAdded = "true";
//   } else if (!closeAddBtn) {
//     console.error(
//       "Close-Button für Add-Dialog nicht gefunden oder Listener bereits hinzugefügt."
//     );
//   }

//   if (closeEditBtn && !closeEditBtn.dataset.listenerAdded) {
//     closeEditBtn.addEventListener("click", closeEditDialog);
//     closeEditBtn.dataset.listenerAdded = "true";
//   } else if (!closeEditBtn) {
//     console.error(
//       "Close-Button für Edit-Dialog nicht gefunden oder Listener bereits hinzugefügt."
//     );
//   }
// }

// function openAddContactDialog() {
//   let dialog = document.getElementById("addContactDialog");
//   if (dialog) {
//     dialog.classList.remove("slide-out-right");
//     dialog.classList.add("slide-in-right");
//     dialog.classList.add("show");
//     dialog.style.display = "flex";

//     addCloseBtnToDialog();
//   }
// }

/**
 * closes the dialog
 *
 */
// function closeDialog() {
//   let dialog = document.getElementById("addContactDialog");
//   if (dialog) {
//     dialog.classList.remove("slide-in-right");
//     dialog.classList.add("slide-out-right");

//     setTimeout(() => {
//       dialog.style.display = "none";
//       dialog.classList.remove("slide-out-right");
//     }, 300);

//     clearForm();
//   } else {
//     console.error("Element mit ID 'addContactDialog' nicht gefunden.");
//   }
// }

// function fillContactForm(contact) {
//   let nameElement = document.getElementById("error-contact-edit-name-input");
//   let emailElement = document.getElementById("error-contact-edit-email-input");
//   let phoneElement = document.getElementById("error-contact-edit-phone-input");

//   if (nameElement && emailElement && phoneElement) {
//     nameElement.value = contact.name;
//     emailElement.value = contact.email;
//     phoneElement.value = contact.phone;
//     return true;
//   }
// }

// function openEditContactDialog() {
//   let dialog = document.getElementById("editContactDialog");
//   if (dialog) {
//     dialog.classList.remove("slide-out-right");
//     dialog.classList.add("slide-in-right");
//     dialog.classList.add("show");
//     dialog.style.display = "flex";

//     addCloseBtnToDialog();
//   } else {
//     console.error("Dialog mit ID 'editContactDialog' nicht gefunden.");
//   }
// }

// function closeEditDialog() {
//   let dialog = document.getElementById("editContactDialog");
//   if (dialog) {
//     dialog.classList.remove("slide-in-right");
//     dialog.classList.add("slide-out-right");

//     setTimeout(() => {
//       dialog.style.display = "none";
//       dialog.classList.remove("slide-out-right");
//     }, 300);
//   } else {
//     console.error("Element mit ID 'editContactDialog' nicht gefunden.");
//   }
// }
