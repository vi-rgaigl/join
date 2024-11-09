let contacts = [];
let currentContactIndex = null;

//creates a new contact and adds it to the contacts array
function addContact() {
    const newContact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    contacts.push(newContact);
    renderContactList();
    clearForm();
}

//updates the display of the contact list.
function renderContactList() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        contactList.innerHTML += `
            <div class="contact-item" onclick="showContactDetails(${i})">
                <p>${contacts[i].firstName} ${contacts[i].lastName}</p>
            </div>
        `;
    }
}

//shows the contact information
function showContactDetails(index) {
    currentContactIndex = index;
    const contact = contacts[index];
    
    const detailElements = {
        contactName: `${contact.firstName} ${contact.lastName}`,
        contactEmail: contact.email,
        contactPhone: contact.phone
    };
    
    for (let id in detailElements) {
        document.getElementById(id).innerText = detailElements[id];
    }

    document.getElementById('contactDetails').classList.remove('hidden');
}

//loads the data for the editing contact
function editContact() {
    const contact = contacts[currentContactIndex];

    const formFields = ['firstName', 'lastName', 'email', 'phone'];
    
    for (let field of formFields) {
        document.getElementById(field).value = contact[field];
    }

    const form = document.getElementById('contactForm');
    if (!document.getElementById('saveButton')) {
        form.innerHTML += `<button id="saveButton" onclick="saveContact()">Speichern</button>`;
    }
}

//saves the edited data of the current contact
function saveContact() {
    const contact = contacts[currentContactIndex];
    const formFields = ['firstName', 'lastName', 'email', 'phone'];
    
    for (let field of formFields) {
        contact[field] = document.getElementById(field).value;
    }

    document.getElementById('saveButton').remove();
    renderContactList();
    showContactDetails(currentContactIndex);
}

//this function deletes the current contact from the contacts array
function deleteContact() {
    contacts.splice(currentContactIndex, 1);
    document.getElementById('contactDetails').classList.add('hidden');
    renderContactList();
}

//resets all form fields to empty values
function clearForm() {
    const formFields = ['firstName', 'lastName', 'email', 'phone'];
    
    for (let field of formFields) {
        document.getElementById(field).value = '';
    }
}