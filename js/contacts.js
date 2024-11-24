let databaseURL = "https://join-a8a87-default-rtdb.europe-west1.firebasedatabase.app/";
let contactsList = [];
let currentContactIndex = null;

async function fetchContactsData() {
    try {
        const contacts = await getData("contacts");
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
        const initial = contact.name.charAt(0).toUpperCase();
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
        html += `<h3>${initial}</h3>`;
        groupedContacts[initial].forEach((contact) => {
            const initials = getInitials(contact.name);
            const color = contact.color || getRandomColor();
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
    const contactListElement = document.getElementById("contactList");
    contactListElement.innerHTML = "";
    contactsList = await fetchContactsData();
    if (!contactsList.length) return;
    const sortedContacts = sortContactsByName(contactsList);
    const groupedContacts = groupContactsByInitial(sortedContacts);
    contactListElement.innerHTML = generateContactListHTML(groupedContacts);
}

function generateContactDetailsHTML(contact) {
    const initials = getInitials(contact.name);
    return `
        <div class="contact-header">
            <div class="contact-initials" style="background-color:${contact.color || getRandomColor()}">${initials}</div>
            <div class="contact-name-section">
                <div class="contact-name">
                    <h2>${contact.name}</h2>
                </div>
                <div class="contact-actions-container">
                    <div class="contact-actions">
                        <img onclick="editContact()" src="./assets/icons/edit.svg"><p>Edit</p>
                        <img onclick="deleteContact()" src="./assets/icons/delete.svg"><p>Delete</p>
                    </div>
                </div>
            </div>
        </div>
        <p>Contact Information</p>
        <div class="contact-infos">
            <p><b>Email</b> ${contact.email}</p>
            <p><b>Phone</b> ${contact.phone}</p>
        </div>
    `;
}

function showContactDetails(index) {
    currentContactIndex = index;
    const contact = contactsList[index];
    if (!contact) {
        console.error("Kontakt nicht gefunden.");
        return;
    }

    const contactDetailsHTML = generateContactDetailsHTML(contact);

    document.getElementById("current-contact").innerHTML = contactDetailsHTML;
    document.getElementById("contactDetailsContainer").classList.add("active");
}

function getInitials(name) {
    if (!name) return "";
    const parts = name.split(" ");
    const initials = parts.map((part) => part[0]).join("");
    return initials.toUpperCase();
}

function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#A633FF", "#33FFF5", "#FFBB33"];
    return colors[Math.floor(Math.random() * colors.length)];
}

async function addContact() {
    const newContact = {
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
    const dialog = document.getElementById("addContactDialog");
    if (dialog) {
        dialog.style.display = "flex";
    }
}

function closeDialog() {
    const dialog = document.getElementById("addContactDialog");
    if (dialog) {
        dialog.style.display = "none";
        clearDialogFields();
    }
}

function editContact(index) {
    currentContactIndex = index;
    const contact = contactsList[index];
    if (!contact) {
        console.error("Kontakt nicht gefunden.");
        return;
    }

    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");

    if (nameElement && emailElement && phoneElement) {
        nameElement.value = contact.name;
        emailElement.value = contact.email;
        phoneElement.value = contact.phone;
    } else {
        console.error("Ein oder mehrere Formularelemente fehlen.");
        return;
    }

    openAddContactDialog();
}

async function saveContact() {
    if (currentContactIndex === null || !contactsList[currentContactIndex]) return;
    const updatedContact = {
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

function clearDialogFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

async function saveNewContact() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
        alert("Please fill out all fields.");
        return;
    }

    const newContact = {
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
    const contactId = contactsList[currentContactIndex].id;
    try {
        await deleteData("contacts", { id: contactId });
        contactsList.splice(currentContactIndex, 1);
        renderContactList();
    } catch (error) {
        console.error("Fehler beim Löschen des Kontakts:", error);
    }
}

function clearForm() {
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");

    if (nameElement) nameElement.value = "";
    if (emailElement) emailElement.value = "";
    if (phoneElement) phoneElement.value = "";
}