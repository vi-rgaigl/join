/**
 * Switch wiche dialog needed
 * @param {string} type - Type of Dialog
 * @param {{}} contact - Contact for Edit
 * @returns HTML
 */
function getTemplateDialog(type, contact) {
  switch (type) {
    case "newContact":
      return getNewContact();

    case "editContact":
      return getEditContact(contact);
  }
}

/**
 * Generats the Dialog for add new Contact
 * @returns HTML
 */
function getNewContact() {
  return `<div class="dialog">
        <div class="contact-add-form-area">
          <img
            class="img-logo-add-contact"
            src="./assets/icons/logo-white-welcome.svg"
          />
          <h1>Add contact</h1>
          <p>Tasks are better with a team!</p>
          <div class="blue-underline"></div>
        </div>
${getInputs()}
            <div class="btn-add-contact">
              <button class="button-white" onclick="closeDialog()">Cancel</button>
              <button class="button-blue" onclick="saveNewContact()">Create contact
              <img
              class="img-btn"
              src="./assets/icons/checkWithoutCircle.svg"
            /></button>
            </div>
          </div>
        </div>
      </div>`;
}

/**
 * Generats the Dialog for Edit Contact
 * @param {{}} contact - Contact for Edit
 * @returns HTML
 */
function getEditContact(contact) {
  return `<div class="dialog">
          <div class="contact-add-form-area">
            <img
              class="img-logo-add-contact"
              src="./assets/icons/logo-white-welcome.svg"
            />
            <h1>Edit contact</h1>
            <div class="blue-underline"></div>
          </div>
  ${getInputs(
    contact.name,
    contact.email,
    contact.phone,
    contact.color,
    contact.initials
  )}
              <div class="btn-add-contact">
                <button class="button-white">Delete</button>
                <button class="button-blue" onclick="saveEditedContact()">Save
                <img
              class="img-btn"
              src="./assets/icons/checkWithoutCircle.svg"
            />
            </button>
              </div>
            </div>
          </div>
        </div>`;
}

/**
 * Generats the Input for Form with or without Value
 * @param {string} name - Name of Contact
 * @param {string} email - Email of Contact
 * @param {string} phone - Tel. Nr. of Contact
 * @param {string} color - Color of Contact
 * @param {string} initials - Initials of Contact
 * @returns HTML
 */
function getInputs(
  name = "",
  email = "",
  phone = "",
  color = "",
  initials = ""
) {
  return `        <div class="form-content-add-contact">
          <img
            id="closeAddBtn"
            class="close-btn"
            src="./assets/icons/close.svg"
            alt="Close"
            onclick="closeDialog()"
          />
          ${getAvatar(color, initials)}
          <div id="contactForm">
            <input
              id="name"
              class="input width-100"
              type="name"
              placeholder="Name"
              value="${name}"
            />
            <div id="error-contact-name" class="errorMassage"></div>
            <input
              id="email"
              class="input width-100"
              type="email"
              placeholder="Email"
              value="${email}"
            />
            <div id="error-contact-email" class="errorMassage"></div>
            <input
              id="phone"
              class="input width-100"
              type="call"
              placeholder="Phone"
              value="${phone}"
            />
            <div id="error-contact-phone" class="errorMassage"></div>`;
}

/**
 *  Generates the HTML for Avatar
 * @param {string} color - Color of Contact
 * @param {string} initials - Initials of Contact
 * @returns HTML
 */
function getAvatar(color, initials) {
  if (initials === "") {
    return `<img
            class="img-add-contact"
            src="./assets/icons/avatar.svg"
            alt="Avatar"
          />`;
  } else {
    return `<div class="edit-initials" style="background-color:${color}">${initials}</div>`;
  }
}
