let contacts = [];

/**
 * Inital load of all Data from Firebase
 */
async function initLoad() {
  try {
    contacts = await getData("contacts");
    renderDropdownAssinged();
    setButtenDisable();
  } catch (error) {
    console.warn(error);
  }
}
