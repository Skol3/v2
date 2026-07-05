const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sideMenu = document.querySelector(".side-menu");

menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("active");
});