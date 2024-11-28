//let databaseURL = "https://join-a8a87-default-rtdb.europe-west1.firebasedatabase.app/";
let contactsList = [];
let currentContactIndex = null;

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

function generateContactListHTML(groupedContacts) {
    let html = "";
    let overallIndex = 0;
    for (let initial in groupedContacts) {
        html += `<h3>${initial}</h3>`;
        groupedContacts[initial].forEach((contact) => {
            let initials = getInitials(contact.name);
            let color = contact.color || getRandomColor();
            html += `
                <div class="contact-item" onclick="showContactDetails(${overallIndex})">
                    <div class="contact-initials" style="background-color:${color}">${initials}</div>
                    <p>${contact.name}</p>
                </div>
            `;
            overallIndex++;
        });
        html += `<hr>`;
    }
    return html;
}

async function renderContactList() {
    let contactListElement = document.getElementById("contactList");
    contactListElement.innerHTML = "";
    contactsList = await fetchContactsData();
    if (!contactsList.length) return;
    let sortedContacts = sortContactsByName(contactsList);
    let groupedContacts = groupContactsByInitial(sortedContacts);
    contactListElement.innerHTML = generateContactListHTML(groupedContacts);
}

function generateContactDetailsHTML(contact) {
    let initials = getInitials(contact.name);
    return `
        <div class="contact-header">
            <div class="contact-initials" style="background-color:${contact.color || getRandomColor()}">${initials}</div>
            <div class="contact-name-section">
                <div class="contact-name">
                    <h2>${contact.name}</h2>
                </div>
                <div class="contact-actions-container">
                    <div class="contact-actions">
                        <div class="action-item" onclick="editContact(${currentContactIndex})">
                            <img src="./assets/icons/edit.svg" alt="Edit"> <span>Edit</span>
                        </div>
                        <div class="action-item" onclick="deleteContact(${currentContactIndex})">
                            <img src="./assets/icons/delete.svg" alt="Delete"> <span>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p>Contact Information</p>
        <div class="contact-infos">
            <p><b>Email:</b> ${contact.email}</p>
            <p><b>Phone:</b> ${contact.phone}</p>
        </div>
    `;
}

function showContactDetails(index) {
    currentContactIndex = index;
    let contact = contactsList[index];
    if (!contact) {
        console.error("Kontakt nicht gefunden.");
        return;
    }

    let contactDetailsHTML = generateContactDetailsHTML(contact);

    document.getElementById("current-contact").innerHTML = contactDetailsHTML;
    document.getElementById("contactDetailsContainer").classList.add("active");
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

function openAddContactDialog() {
    let dialog = document.getElementById("addContactDialog");
    if (dialog) {
        dialog.style.display = "flex";
    }
}

function closeDialog() {
    let dialog = document.getElementById("addContactDialog");
    if (dialog) {
        dialog.style.display = "none";
        clearDialogFields();
    }
}

function editContact(index) {
    currentContactIndex = index;
    let contact = contactsList[index];
    if (!contact) {
        console.error("Kontakt nicht gefunden.");
        return;
    }

    let nameElement = document.getElementById("edit-name");
    let emailElement = document.getElementById("edit-email");
    let phoneElement = document.getElementById("edit-phone");

    if (nameElement && emailElement && phoneElement) {
        nameElement.value = contact.name;
        emailElement.value = contact.email;
        phoneElement.value = contact.phone;
    } else {
        console.error("Ein oder mehrere Formularelemente fehlen.");
        return;
    }

    openEditContactDialog();
}

function openEditContactDialog() {
    let dialog = document.getElementById("editContactDialog");
    if (dialog) {
        dialog.style.display = "flex";
    }
}

function closeEditDialog() {
    let dialog = document.getElementById("editContactDialog");
    if (dialog) {
        dialog.style.display = "none";
        clearEditDialogFields();
    }
}

async function saveEditedContact() {
    if (currentContactIndex === null || !contactsList[currentContactIndex]) return;
    let updatedContact = {
        id: contactsList[currentContactIndex].id,
        name: document.getElementById("edit-name").value,
        email: document.getElementById("edit-email").value,
        phone: document.getElementById("edit-phone").value,
        color: contactsList[currentContactIndex].color
    };

    try {
        await changeData("contacts", updatedContact);
        await renderContactList();
        closeEditDialog();
        showContactDetails(currentContactIndex);
    } catch (error) {
        console.error("Fehler beim Speichern des Kontakts:", error);
    }
}

async function saveContact() {
    if (currentContactIndex === null || !contactsList[currentContactIndex]) return;
    let updatedContact = {
        id: contactsList[currentContactIndex].id,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        color: contactsList[currentContactIndex].color
    };

    try {
        await changeData("contacts", updatedContact);
        await renderContactList();
        closeDialog();
    } catch (error) {
        console.error("Fehler beim Speichern des Kontakts:", error);
    }
}

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

async function deleteContact() {
    if (currentContactIndex === null || !contactsList[currentContactIndex])
        return;
    let contactId = contactsList[currentContactIndex].id;
    try {
        await deleteData("contacts", { id: contactId });
        contactsList.splice(currentContactIndex, 1);
        renderContactList();
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