window.onload = function () {

    const mobileBtn = document.getElementById("mobileBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");

    if (mobileBtn && mobileMenu && mobileClose) {

        mobileBtn.addEventListener("click", function () {
            mobileMenu.classList.add("show");
        });

        mobileClose.addEventListener("click", function () {
            mobileMenu.classList.remove("show");
        });

        document.querySelectorAll(".mobile-menu a").forEach(function(link){
            link.addEventListener("click", function(){
                mobileMenu.classList.remove("show");
            });
        });

    }

};