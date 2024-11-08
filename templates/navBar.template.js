function getNavbarTemplate(mobile) {
    return /*html*/ `
        <div id="navbar_logo" class="navbar-logo">
            <img class="navbar-logo-img" src="./assets/icons/logo-white-small.svg" onclick="window.open('./summaryUser.html','_self')" alt="Join Logo">
        </div>
        <div class="navbar-main">
            <div class="navbar-menu">
                <div id="navbar-menu-${mobile}1" class="navbar-menu-item" onclick="window.open('./summaryUser.html','_self')">
                    <img class="navbar-menu-item-img" src="./assets/icons/summary-icon.svg" alt="Summary">
                    <span>Summary</span>
                </div>
                <div id="navbar-menu-${mobile}2" class="navbar-menu-item" onclick="window.open('./addTask.html','_self')">
                    <img class="navbar-menu-item-img" src="./assets/icons/add-task-icon.svg" alt="Add Task">
                    <span>Add Task</span>
                </div>
                <div id="navbar-menu-${mobile}3" class="navbar-menu-item" onclick="window.open('./board.html','_self')">
                    <img class="navbar-menu-item-img" src="./assets/icons/board-icon.svg" alt="Board">
                    <span>Board</span>
                </div>
                <div id="navbar-menu-${mobile}4" class="navbar-menu-item" onclick="window.open('./contacts.html','_self')">
                    <img class="navbar-menu-item-img" src="./assets/icons/contacts-icon.svg" alt="Contacts">
                    <span>Contacts</span>
                </div>
            </div>
            <div class="navbar-footer-link">
                <div id="navbar-menu-${mobile}5" class="navbar-menu-item">
                    <a class="a-link" href="./privacyPolicy.html">Privacy Policy</a>
                </div>
                <div id="navbar-menu-${mobile}6" class="navbar-menu-item">
                    <a class="a-link" href="./legalNotice.html">Legal notice</a>
                </div>              
            </div>
        </div>
    `;
}


function getNavbarNoLoginTemplate() {
    return /*html*/ `
        <div id="navbar_logo" class="navbar-logo">
            <img class="navbar-logo-img" src="./assets/icons/logo-white-small.svg" onclick="window.open('./summaryUser.html','_self')" alt="Join Logo">
        </div>
        <div class="navbar-main-nologin">
            <div class="navbar-footer-link">
            <div id="navbar-menu-5" class="navbar-menu-item">
                    <a class="a-link" href="./privacyPolicy.html">Privacy Policy</a>
                </div>
                <div id="navbar-menu-6" class="navbar-menu-item">
                    <a class="a-link" href="./legalNotice.html">Legal notice</a>
                </div>  
            </div>
        </div>
    `;
}