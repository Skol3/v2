const mobileBtn = document.getElementById("mobileBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

mobileBtn.onclick = () => {

    mobileMenu.classList.add("show");

}

mobileClose.onclick = () => {

    mobileMenu.classList.remove("show");

}

document.querySelectorAll(".mobile-menu a").forEach(link=>{

    link.onclick=()=>{

        mobileMenu.classList.remove("show");

    }

});