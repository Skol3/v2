/*==================================
MOBILE MENU
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    const mobileBtn = document.getElementById("mobileBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");
    const menuOverlay = document.getElementById("menuOverlay");

    if (!mobileBtn || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.add("show");

        if (menuOverlay) {
            menuOverlay.classList.add("show");
        }

        mobileBtn.classList.add("active");
        mobileBtn.setAttribute("aria-expanded", "true");
        mobileMenu.setAttribute("aria-hidden", "false");

        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        mobileMenu.classList.remove("show");

        if (menuOverlay) {
            menuOverlay.classList.remove("show");
        }

        mobileBtn.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");

        document.body.classList.remove("menu-open");
    }

    function toggleMenu() {
        if (mobileMenu.classList.contains("show")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Нажатие на кнопку ☰ открывает или закрывает меню
    mobileBtn.addEventListener("click", toggleMenu);

    // Нажатие на крестик закрывает меню
    if (mobileClose) {
        mobileClose.addEventListener("click", closeMenu);
    }

    // Нажатие на затемнённую область закрывает меню
    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    // Выбор пункта меню закрывает меню
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Нажатие Escape закрывает меню
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // При переходе на десктопный размер закрываем мобильное меню
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Начальное состояние
    mobileBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

});


/*==================================
LIGHTBOX
==================================*/

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

if (
    galleryImages.length &&
    lightbox &&
    lightboxImg &&
    closeBtn &&
    prevBtn &&
    nextBtn
) {

    let currentImage = 0;

    function showImage(index) {

        currentImage = index;
        lightboxImg.src = galleryImages[index].src;

    }

    galleryImages.forEach((img, index) => {

        img.addEventListener("click", () => {

            lightbox.classList.add("show");
            showImage(index);

        });

    });

    nextBtn.addEventListener("click", () => {

        currentImage++;

        if (currentImage >= galleryImages.length) {

            currentImage = 0;

        }

        showImage(currentImage);

    });

    prevBtn.addEventListener("click", () => {

        currentImage--;

        if (currentImage < 0) {

            currentImage = galleryImages.length - 1;

        }

        showImage(currentImage);

    });

    closeBtn.addEventListener("click", () => {

        lightbox.classList.remove("show");

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.classList.remove("show");

        }

    });

    document.addEventListener("keydown", e => {

        if (!lightbox.classList.contains("show")) return;

        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") lightbox.classList.remove("show");

    });

}


/*==================================
SCROLL REVEAL
==================================*/

const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {

    const revealOnScroll = () => {

        reveals.forEach((item, index) => {

            const trigger = window.innerHeight * 0.88;

            if (item.getBoundingClientRect().top < trigger) {

                setTimeout(() => {

                    item.classList.add("show");

                }, index * 120);

            }

        });

    };

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

}

/*==================================*
*PLAYERS FILTER*
*==================================*/

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".player-filter");
    const playerCards = document.querySelectorAll(".player-card");

    if (!filterButtons.length || !playerCards.length) return;

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.filter;

            /* Active button */

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            /* Show / hide players */

            playerCards.forEach(card => {

                const playerCategory = card.dataset.category;

                if (
                    category === "all" ||
                    playerCategory === category
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

});

/*==================================*
*TRAINING FILTERS*
*==================================*/

document.addEventListener("DOMContentLoaded", () => {

    const typeButtons = document.querySelectorAll(
        ".training-type-filter button"
    );

    const ageButtons = document.querySelectorAll(
        ".training-age-filter button"
    );

    const trainingCards = document.querySelectorAll(
        ".training-card"
    );

    // Если это не training.html — ничего не делаем
    if (
        !typeButtons.length ||
        !ageButtons.length ||
        !trainingCards.length
    ) {
        return;
    }

    let selectedType = "All";
    let selectedAge = "All Ages";


    /*----------------------------------*
    * TYPE FILTER
    *----------------------------------*/

    typeButtons.forEach(button => {

        button.addEventListener("click", () => {

            typeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedType = button.textContent.trim();

            filterTraining();

        });

    });


    /*----------------------------------*
    * AGE FILTER
    *----------------------------------*/

    ageButtons.forEach(button => {

        button.addEventListener("click", () => {

            ageButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedAge = button.textContent.trim();

            filterTraining();

        });

    });


    /*----------------------------------*
    * FILTER FUNCTION
    *----------------------------------*/

    function filterTraining() {

        trainingCards.forEach(card => {

            const tag = card
                .querySelector(".training-tag")
                ?.textContent
                .trim();

            if (!tag) return;


            const typeMatch =
                selectedType === "All" ||
                tag.includes(selectedType);


            const ageMatch =
                selectedAge === "All Ages" ||
                tag.includes(selectedAge);


            if (typeMatch && ageMatch) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }

});