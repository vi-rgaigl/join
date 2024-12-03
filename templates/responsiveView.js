function toggleResponsiveView(mode) {
    let contactListContainer = document.getElementById("contactListContainer");
    let contactDetailsContainer = document.getElementById("contactDetailsContainer");
    let backBtn = document.querySelector(".back-btn");

    if (mode === "details" && window.innerWidth <= 635) {
        contactListContainer.style.display = "none";
        contactDetailsContainer.style.display = "block";

        if (backBtn) {
            backBtn.classList.add("active");
        }
    } else {
        contactListContainer.style.display = "block";
        contactDetailsContainer.style.display = "block";

        if (backBtn) {
            backBtn.classList.remove("active");
        }
    }
}

function backToContactList() {
    let contactListContainer = document.getElementById("contactListContainer");
    let contactDetailsContainer = document.getElementById("contactDetailsContainer");

    contactListContainer.style.display = "block";
    contactDetailsContainer.style.display = "none";
    toggleResponsiveView("list");
}