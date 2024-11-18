let databaseURL = "https://join-a8a87-default-rtdb.europe-west1.firebasedatabase.app/";
let contactsList = [];
let currentContactIndex = null;
const initials = getInitials;

async function renderContactList() {
    const contactListElement = document.getElementById("contactList");
    contactListElement.innerHTML = "";

    try {
        contactsList = await getData("contacts");
        if (!contactsList || contactsList.length === 0) {
            console.error("Die Kontaktliste ist leer.");
            return;
        }

        for (let i = 0; i < contactsList.length; i++) {
            const contact = contactsList[i];
            const initials = getInitials(contact.name);
            const color = contact.color || getRandomColor();

            contactListElement.innerHTML += `
                <div class="contact-item" onclick="showContactDetails(${i})">
                    <div class="contact-initials" style="background-color:${color}">${initials}</div>
                    <p>${contact.name}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Kontakte:", error);
    }
}

function showContactDetails(index) { 
    currentContactIndex = index;
    const contact = contactsList[index];
    const initials = getInitials(contact.name);

    document.getElementById("current-contact").innerHTML = `
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
    <div class="contact-infos">
        <p>Email: ${contact.email}</p>
        <p>Telefonnummer: ${contact.phone}</p>
    </div>
    `;

    document.getElementById("contactDetailsContainer").classList.add("active");
}

function getInitials(name) {
    if (!name) return "";
    const parts = name.split(" ");
    const initials = parts.map((part) => part[0]).join("");
    return initials.toUpperCase();
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

function clearDialogFields() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

async function saveNewContact() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!firstName || !lastName || !email || !phone) {
        alert("Please fill out all fields.");
        return;
    }

    const newContact = {
        name: `${firstName} ${lastName}`,
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

function editContact() {
    if (currentContactIndex === null || !contactsList[currentContactIndex])
        return;
    const contact = contactsList[currentContactIndex];

    const firstNameElement = document.getElementById("firstName");
    const lastNameElement = document.getElementById("lastName");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");

    if (firstNameElement && lastNameElement && emailElement && phoneElement) {
        firstNameElement.value = contact.name.split(" ")[0];
        lastNameElement.value = contact.name.split(" ")[1];
        emailElement.value = contact.email;
        phoneElement.value = contact.phone;

        if (!document.getElementById("saveButton")) {
            document.getElementById(
                "contactForm"
            ).innerHTML += `<button id="saveButton" onclick="saveContact()">Speichern</button>`;
        }
    } else {
        console.error("Ein oder mehrere Formularelemente fehlen.");
    }
}

async function saveContact() {
    if (currentContactIndex === null || !contactsList[currentContactIndex])
        return;
    const updatedContact = {
        id: contactsList[currentContactIndex].id,
        name:
            document.getElementById("firstName").value +
            " " +
            document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    };

    try {
        await changeData("contacts", updatedContact);
        await renderContactList();
        showContactDetails(currentContactIndex);
    } catch (error) {
        console.error("Fehler beim Speichern des Kontakts:", error);
    }
}

function toggleEditLayer(contactIndex) {
    const editLayer = document.getElementById("editLayer");
    if (editLayer) {
        editLayer.style.display = contactIndex !== null ? "block" : "none";
        if (contactIndex !== null) {
            const contact = contactsList[contactIndex];
            document.getElementById("firstName").value = contact.name.split(" ")[0];
            document.getElementById("lastName").value = contact.name.split(" ")[1];
            document.getElementById("email").value = contact.email;
            document.getElementById("phone").value = contact.phone;
        }
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
    const firstNameElement = document.getElementById("firstName");
    const lastNameElement = document.getElementById("lastName");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");

    if (firstNameElement) firstNameElement.value = "";
    if (lastNameElement) lastNameElement.value = "";
    if (emailElement) emailElement.value = "";
    if (phoneElement) phoneElement.value = "";
}