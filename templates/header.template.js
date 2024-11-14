function getHeaderTemplate(){
    return /*html*/ `
        <div class="header-group">
            <div class="header-group-left">
                <div class="header-group-logo"></div>
                <div class="header-headline-text">Kanban Project Management Tool</div>
            </div>
            <div class="header-group-right">
                <div class="help-icon-mobile"><a href="./help.html"><img src="./assets/icons/help-icon.svg" alt="Help"></a></div>
                <div id="header_avatar" class="header-avatar">${setMonogram()}</div>
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