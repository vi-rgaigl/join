function getHeaderTemplate(){
    return /*html*/ `
        <div class="header-group">
            <div class="header-group-left">
                <div class="header-group-logo"></div>
                <div class="header-headline-text">Kanban Project Management Tool</div>
            </div>
            <div class="header-group-right">
                <div class="help-icon-mobile"><a href="./help.html"><img src="./assets/icons/help-icon.svg" alt="Help"></a></div>
                <div id="header_avatar" class="header-avatar" onclick="openUserMenu()">${setMonogram()}</div>
                <div class="popup-user" id="popup-user">
                    <div class="link-box">
                        <a href="./help.html">Help</a>
                    </div>
                    <div class="link-box">
                        <a href='./legalNotice.html'>Legal Notice</a>
                    </div>
                    <div class="link-box">
                        <a  href='./privacyPolicy.html'>Privacy Policy</a>
                    </div>
                    <div class="link-box">
                        <a onclick="logOut()" href="./index.html">Log out</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getHeaderNoLoginTemplate(){
    return /*html*/ `
        <div class="header-group">
            <div>Kanban Project Management Tool</div>
            <div class="header-group-right"></div>
        </div>
    `;
}