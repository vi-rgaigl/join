let contacts = [];
let currentContactIndex = null;
const databaseURL = 'https://join-a8a87-default-rtdb.europe-west1.firebasedatabase.app/';
const contactsRef = firebase.database().ref('contacts'); 
const usersRef = firebase.database().ref('users');

//updates the display of the contact list.
async function renderContactList() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    // Retrieve contacts from Firebase
    try {
        const snapshot = await firebase.firestore().collection('contacts').get();
        contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        for (let i = 0; i < contacts.length; i++) {
            contactList.innerHTML += `
                <div class="contact-item" onclick="showContactDetails(${i})">
                    <p>${contacts[i].firstName} ${contacts[i].lastName}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Kontakte:', error);
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

//creates a new contact and adds it to the contacts array
async function addContact() {
    const newContact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    try {
        const contactRef = await firebase.firestore().collection('contacts').add(newContact);
        newContact.id = contactRef.id;
        contacts.push(newContact);
        renderContactList();
        clearForm();
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Kontakts:', error);
    }
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

async function saveContact() {
    const contact = contacts[currentContactIndex];
    const formFields = ['firstName', 'lastName', 'email', 'phone'];
    
    for (let field of formFields) {
        contact[field] = document.getElementById(field).value;
    }

    try {
        // Update contact in Firebase
        await firebase.firestore().collection('contacts').doc(contact.id).update(contact);

        document.getElementById('saveButton').remove();
        renderContactList();
        showContactDetails(currentContactIndex);
    } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
    }
}

//this function deletes the current contact from the contacts array
async function deleteContact() {
    const contactId = contacts[currentContactIndex].id;
    // contact delete from Firebase
    try {
        await firebase.firestore().collection('contacts').doc(contactId).delete();
        
        contacts.splice(currentContactIndex, 1);
        document.getElementById('contactDetails').classList.add('hidden');
        renderContactList();
    } catch (error) {
        console.error('Fehler beim Löschen des Kontakts:', error);
    }
}

//resets all form fields to empty values
function clearForm() {
    const formFields = ['firstName', 'lastName', 'email', 'phone'];
    
    for (let field of formFields) {
        document.getElementById(field).value = '';
    }
}