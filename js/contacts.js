let contactsList = [];
let currentContactIndex = null;

/**
 * Fetch the data from the Firebase database
 * @returns List of all Contacts
 */
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

/**
 * Groups the contacts according to the first letter
 * @param {[]} contacts - List of all Contacts
 * @returns grouped list of all Contacts
 */
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

/**
 * Sort the list by Name
 * @param {[*]} contacts - List of all Contacts
 * @returns Sorted list
 */
function sortContactsByName(contacts) {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Creat the Initials from Name of Contact
 * @param {string} name - Name of Contact
 * @returns Initials of Contact
 */
function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/**
 * Generate a random RGB-Color
 * @returns RGB-Color
 */
function getRandomColor() {
  let r = Math.floor(Math.random() * 128) + 128;
  let g = Math.floor(Math.random() * 128) + 128;
  let b = Math.floor(Math.random() * 128) + 128;
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Rendered the Contact list
 */
async function renderContactList() {
  let contacts = await fetchContactsData();
  contactsList.push(...contacts);
  sortContactsByName(contacts);
  let groupedContacts = groupContactsByInitial(contacts);
  let html = generateContactListHTML(groupedContacts);
  document.getElementById("contactList").innerHTML = html;
}

/**
 * Redered the Details of Contact
 * @param {string} id - Id of contact
 */
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

/**
 * Find the Contact by Id
 * @param {string} id - Id of contact
 * @returns the Contact
 */
async function getContactById(id) {
  return contactsList.find((contact) => contact.id === id);
}

/**
 * Loads the contact data and opens the edit dialog
 * @param {string} id - Id of contact
 */
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
  openDialog("editContact", id);
}

/**
 * HandleSaveContact takes over the main logic for saving a contact and then updates the contact list
 * @param {{}} updatedContact - Contact to updated
 */
async function handleSaveContact(updatedContact) {
  try {
    await changeData("contacts", updatedContact);
    await showPopupMessage(
      "signup-popup-message",
      "Contact succesfully changed "
    );
    contactsList[currentContactIndex] = updatedContact;
    renderContactList();
    document.getElementById("current-contact").innerHTML = "";
    document
      .getElementById("contactDetailsContainer")
      .classList.remove("active");
  } catch (error) {
    console.error("Fehler beim Speichern des Kontakts:", error);
    alert("Failed to save the contact. Please try again.");
  }
}

/**
 * Checks the current contact index and then calls handleSaveContact to save the contact
 */
async function saveEditedContact() {
  if (currentContactIndex === null || currentContactIndex === -1) {
    return console.error("Aktueller Kontaktindex ist ungültig.");
  }
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let nameCorrect = checkName(name);
  let mailCorrect = checkEmailRegex(email);
  if (nameCorrect && mailCorrect) {
    let updatedContact = {
      name: name,
      email: email,
      phone: phone,
      color: contactsList[currentContactIndex].color,
      initials: getInitials(name),
    };
    handleSaveContact(updatedContact);
  }
}

/**
 * saves the data in the database
 */
async function saveNewContact() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let nameCorrect = checkName(name);
  let mailCorrect = checkEmailRegex(email);
  if (nameCorrect && mailCorrect) {
    let newContact = {
      name: name,
      email: email,
      phone: phone,
      color: getRandomColor(),
      initials: getInitials(name),
    };
    await pushToFirebase(newContact);
  }
}

/**
 * Checks if the email matches the required pattern.
 * @param {string} email - The email to check.
 * @returns {boolean} True if the email matches the pattern, false otherwise.
 */
function checkEmailRegex(email) {
  let emailRegex =
    /^(?!.*\.\.)[\-A-Za-z0-9_][\-A-Za-z0-9_\.]+[\-A-Za-z0-9]@[\-A-Za-z0-9][\-A-Za-z0-9_]+\.[A-Za-z]{2,4}/;
  if (emailRegex.test(email)) {
    clearErrorMessage("email");
    return true;
  }
  {
    setErrorMessage("email", "Please enter a valid email address.");
    return false;
  }
}

/**
 * Checks if the password matches the required pattern.
 * @param {string} password - The password to check.
 * @returns {boolean} True if the password matches the pattern (at least 8 char, 1 Uppercase, 1 digit, 1 special char), false otherwise.
 */
function checkName(name) {
  if (name != "") {
    clearErrorMessage("name");
    return true;
  }
  {
    setErrorMessage("name", "This field ist requiered.");
    return false;
  }
}

/**
 * Sets an error message for a specified element.
 * @param {string} elementId - The ID of the element where the error message will be displayed.
 * @param {string} message - The error message to display.
 */
function setErrorMessage(id, message) {
  let errorMessage = document.getElementById(`error-contact-${id}`);
  errorMessage.textContent = message;
  if ((errorBorder = document.getElementById(`${id}`))) {
    errorBorder.classList.add("inputError");
  }
}

/**
 * Clears the error message for a specified element.
 * @param {string} elementId - The ID of the element where the error message will be cleared.
 */
function clearErrorMessage(id) {
  document.getElementById(`error-contact-${id}`).textContent = "";
  if ((errorBorder = document.getElementById(`${id}`))) {
    errorBorder.classList.remove("inputError");
  }
}

/**
 * Push contact to Firebase
 * @param {{}} newContact - New Contact
 */
async function pushToFirebase(newContact) {
  try {
    await pushData("contacts", newContact);
    contactsList.push(newContact);
    renderContactList();
    await showPopupMessage(
      "signup-popup-message",
      "Contact succesfully created "
    );
    closeDialog();
  } catch (error) {
    console.error("Error saving new contact:", error);
    alert("Failed to save the contact. Please try again.");
  }
}

/**
 * Delete the Contact
 * @param {string} id - Id of Contact
 */
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
    await showPopupMessage("signup-popup-message", "Contact was deleted");
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
  }
}

/**
 * Clear the Form
 */
function clearForm() {
  let nameElement = document.getElementById("name");
  let emailElement = document.getElementById("email");
  let phoneElement = document.getElementById("phone");

  if (nameElement) nameElement.value = "";
  if (emailElement) emailElement.value = "";
  if (phoneElement) phoneElement.value = "";
}

/**
 * Open the Dialag
 * @param {string} type - Type of Dialog
 * @param {string} id - Id of Contact
 */
async function openDialog(type, id) {
  let boardDialogRef = document.getElementById("contactDialog");
  boardDialogRef.innerHTML = getTemplateDialog(type, await getContactById(id));
  boardDialogRef.showModal();
}

/**
 * Close the Dialog
 */
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

/**
 * Change the mode of View
 * @param {string} mode - Mode of View
 */
function toggleResponsiveView(mode) {
  let backBtn = document.querySelector(".back-btn");
  let contactListContainer = document.getElementById("contactListContainer");
  let contactDetailsContainer = document.getElementById(
    "contactDetailsContainer"
  );
  if (mode === "details" && window.innerWidth <= 635) {
    contactListContainer.classList.add("d_none");
    contactDetailsContainer.classList.add("d_block");
    if (backBtn) backBtn.classList.add("active");
  } else if (mode === "list" && window.innerWidth <= 635) {
    contactListContainer.classList.remove("d_none");
    contactDetailsContainer.classList.remove("d_block");
    if (backBtn) backBtn.classList.remove("active");
  }
}

/**
 * Eventlistener for resize site
 */
addEventListener("resize", (event) => {
  if (event.target.innerWidth > 635) {
    document.querySelector(".back-btn").classList.remove("active");
    document.getElementById("contactListContainer").classList.remove("d_none");
    document
      .getElementById("contactDetailsContainer")
      .classList.remove("d_block");
  }
});
