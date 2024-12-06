/**
 * Generates the HTML for the contact list
 * @param {[*]} groupedContacts - List of all Contacts grouped
 * @returns HTML
 */
function generateContactListHTML(groupedContacts) {
  let html = "";
  for (let initial in groupedContacts) {
    html += `<hr><p class="alphabet-header">${initial}</p>`;
    groupedContacts[initial].forEach((contact) => {
      let initials = getInitials(contact.name);
      let color = contact.color || getRandomColor();
      html += `
                <div class="contact-item" onclick="showContactDetails('${contact.id}')">
                    <div class="contact-initials" style="background-color:${color}">${initials}</div>
                    <div class="contact-item-info">
                      <p>${contact.name}</p>
                      <p class="contact-list-mail">${contact.email}</p>
                    </div>
                </div>
            `;
    });
  }
  return html;
}

/**
 * Generates the HTML for the Overview
 * @param {[*]} contact - Contact for Overview
 * @returns HTML
 */
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
            <p><b>Email:</b><a class="link-mail" href="mailto:${contact.email}"> ${contact.email}</a></p>
            <p><b>Phone:</b> ${contact.phone}</p>
        </div>
        <div class="menü-button-mobile">
              <img
                id="addPerson"
                src="./assets/icons/more_vert.svg"
                class="icon"
              />
              <div class="card-menue">
                <div class="action-item-mobile" onclick="editContact('${contact.id}')">
                  <span>Edit</span>
                  <img src="./assets/icons/edit.svg" alt="Edit" />
                </div>
                <div class="action-item-mobile" onclick="deleteContact('${contact.id}')">
                  <span>Delete</span>
                  <img src="./assets/icons/delete.svg" alt="Delete" />
                </div>
              </div>
            </div>
    `;
}
