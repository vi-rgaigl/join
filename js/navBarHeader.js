function setAktivItemBackground(mobile, index) {
    document.getElementById(`navbar-menu-${mobile}${index}`).classList.add('navbar-menu-item-aktiv');
    for (let i = 1; i <= 6; i++) {
        if (i != index) {
            document.getElementById(`navbar-menu-${mobile}${i}`).classList.remove('navbar-menu-item-aktiv');
        }
    }
}

function getInitials(name) {
    return name.split(' ').map(word => word.charAt(0)).join('');
}

function setMonogram() {
    let user = getFromLocalStorage('join');
    return user ? getInitials(user.user) : '';
}