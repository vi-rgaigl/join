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

    for (const initial in groupedContacts) {
        html += `<hr><p>${initial}</p>`;
        groupedContacts[initial].forEach((contact) => {
            let initials = getInitials(contact.name);
            let color = contact.color || getRandomColor();
            html += `
                <div class="contact-item" onclick="showContactDetails('${contact.id}')">
                    <div class="contact-initials" style="background-color:${color}">${initials}</div>
                    <p>${contact.name}</p>
                </div>
            `;
            overallIndex++;
        });
    }
    return html;
}

async function renderContactList() {
    let contacts = await fetchContactsData();
    if (!contacts.length) return;
    contactsList.length = 0;
    contactsList.push(...contacts);
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    let html = "";
    let lastInitial = "";
    contacts.forEach(contact => {
        let initial = contact.name.charAt(0).toUpperCase();
        if (initial !== lastInitial) {
            html += `<p>${initial}</p><hr>`;
            lastInitial = initial;
        }
        html += `
            <div class="contact-item" onclick="showContactDetails('${contact.id}')">
                <div class="contact-initials" style="background-color:${contact.color}">${contact.initials}</div>
                <p>${contact.name}</p>
            </div>
        `;
    });
    document.getElementById("contactList").innerHTML = html;
}

function generateContactDetailsHTML(contact) {
    return `
        <div class="contact-header">
            <div class="contact-initials" style="background-color:${contact.color}">${contact.initials}</div>
            <div class="contact-name-section">
                <div class="contact-name">
                    <h2>${contact.name}</h2>
                </div>
                <div class="contact-actions-container">
                    <div class="contact-actions">
                        <div class="action-item" onclick="editContact('${contact.id}')">
                            <img src="./assets/icons/edit.svg" alt="Edit"> <span>Edit</span>
                        </div>
                        <div class="action-item" onclick="deleteContact('${contact.id}')">
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

async function showContactDetails(id) {
    let contact = await getContactById(id);
    if (!contact) {
        console.error("Kontakt nicht gefunden.");
        return;
    }

    let contactDetailsHTML = generateContactDetailsHTML(contact);
    let contactDetailsContainer = document.getElementById("current-contact");
    if (contactDetailsContainer) {
        contactDetailsContainer.innerHTML = contactDetailsHTML;
        document.getElementById("contactDetailsContainer").classList.add("active");
    } else {
        console.error("Element mit ID 'current-contact' nicht gefunden.");
    }
}

//neue Suchfunktion in einer JSON Struktur
async function getContactById(id) {
    let contacts = await getData("contacts");
    return contacts.find(contact => contact.id === id);
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

function addCloseBtnToDialog() {
    let closeBtn = document.getElementById("closeBtn");
    if (closeBtn && !closeBtn.dataset.listenerAdded) {
        closeBtn.addEventListener("click", closeDialog);
        closeBtn.dataset.listenerAdded = "true";
    } else {
        console.error("Close-Button nicht gefunden oder Listener bereits hinzugefügt.");
    }
}

function openAddContactDialog() {
    let dialog = document.getElementById("addContactDialog");
    if (dialog) {
        dialog.classList.remove('slide-out-right');
        dialog.classList.add('slide-in-right');
        dialog.classList.add('show');
        dialog.style.display = "flex";

        addCloseBtnToDialog();
    }
}

/**
 * closes the dialog
 * 
 */
function closeDialog() {
    let dialog = document.getElementById("addContactDialog");
    if (dialog) {
        dialog.classList.remove('slide-in-right');
        dialog.classList.add('slide-out-right');

        setTimeout(() => {
            dialog.style.display = "none";
            dialog.classList.remove('slide-out-right');
        }, 500);

        clearForm();
    } else {
        console.error("Element mit ID 'addContactDialog' nicht gefunden.");
    }
}

function editContact(id) {
    let contact = findContactById(id);
    if (!contact) {
        console.error("Kontakt nicht gefunden.");
        return;
    }

    if (!fillContactForm(contact)) {
        console.error("Ein oder mehrere Formularelemente fehlen.");
        return;
    }

    openEditContactDialog();
}

function findContactById(id) {
    for (let i = 0; i < contactsList.length; i++) {
        if (contactsList[i].id === id) {
            currentContactIndex = i;
            return contactsList[i];
        }
    }
    return null;
}

function fillContactForm(contact) {
    let nameElement = document.getElementById("error-contact-edit-name-input");
    let emailElement = document.getElementById("error-contact-edit-email-input");
    let phoneElement = document.getElementById("error-contact-edit-phone-input");

    if (nameElement && emailElement && phoneElement) {
        nameElement.value = contact.name;
        emailElement.value = contact.email;
        phoneElement.value = contact.phone;
        initialsElement.textContent = getInitials(contact.name);
        return true;
    }
}

function openEditContactDialog() {
    let dialog = document.getElementById("editContactDialog");
    if (dialog) {
        dialog.style.display = "flex";
        let closeButton = document.getElementById("closeBtn");
        if (closeButton) {
            closeButton.addEventListener('click',closeEditDialog);
    } else {
        console.error("Dialog mit ID 'editContactDialog' nicht gefunden.");
    }}
}

function closeEditDialog() {
    let dialog = document.getElementById("editContactDialog");
    if (dialog) {
        dialog.style.display = "none";
    }
}

async function saveEditedContact() {
    if (currentContactIndex === null || !contactsList[currentContactIndex]) 
        return;
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
        initials: getInitials(name)
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