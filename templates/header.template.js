/**
 * Generates the HTML template for the header.
 * @returns {string} - The HTML template for the header.
 */
function getHeaderTemplate() {
  return /*html*/ `
        <div class="header-group">
            <div class="header-group-left">
                <div class="header-group-logo" onclick="window.open('./summaryUser.html','_self')"></div>
                <div class="header-headline-text">Kanban Project Management Tool</div>
            </div>
            <div class="header-group-right">
                <div class="help-icon-mobile"><a href="./help.html"><img class="header-help-icon" src="./assets/icons/help-icon.svg" alt="Help"></a></div>
                <div id="header_avatar" class="header-avatar" onclick="openUserMenu()">${setMonogram()}</div>
                <div class="popup-user" id="popup-user">
                    <div class="link-box" onclick="openHelp()">
                        <span>Help</span>
                    </div>
                    <div class="link-box" onclick="openLegalNotice()">
                        <span>Legal Notice</span>
                    </div>
                    <div class="link-box" onclick="openPrivacyPolicy()">
                        <span>Privacy Policy</span>
                    </div>
                    <div class="link-box" onclick="logout()">
                        <span>Log out</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generates the HTML template for the header without login-specific elements.
 * @returns {string} - The HTML template for the header without login-specific elements.
 */
function getHeaderNoLoginTemplate() {
  return /*html*/ `
    <div class="header-group-left">
        <div class="header-group-logo"></div>
        <div class="header-headline-text">Kanban Project Management Tool</div>
    </div>
    <div class="header-group">
        <div class="header-group-right"></div>
    </div>
    `;
}
