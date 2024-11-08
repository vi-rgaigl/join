function init(page) {
    renderHeaderAndNavbar();
    setAktivItemBackground('', page);
    setAktivItemBackground('mobile', page);
}

function renderHeaderAndNavbar() {
    let headerContainer = document.getElementById('header-container');
    let navContainer = document.getElementById('navbar-container');
    let navContainerMobile = document.getElementById('navbar-container-mobile');
    headerContainer.innerHTML = getHeaderTemplate();
    navContainer.innerHTML = getNavbarTemplate('');
    navContainerMobile.innerHTML = getNavbarTemplate('mobile');
}

function renderHeaderAndNavbarNoLogin() {
    let headerContainer = document.getElementById('header-container');
    let navContainer = document.getElementById('navbar-container');
    headerContainer.innerHTML = getHeaderNoLoginTemplate();
    navContainer.innerHTML = getNavbarNoLoginTemplate();
}