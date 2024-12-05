//generates the HTML for the contact list
function generateContactListHTML(groupedContacts) {
    let html = "";
    for (let initial in groupedContacts) {
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
        });
    }
    return html;
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