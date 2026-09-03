document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuBtn.classList.toggle("active");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    function updateActiveNav() {
        let current = "home";

        sections.forEach(section => {
            const sectionTop =
                section.getBoundingClientRect().top +
                window.scrollY;

            if (window.scrollY >= sectionTop - 220) {
                current = section.id;
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       TYPING ANIMATION
    ===================================================== */

    const typingText = document.getElementById("typing-text");

    if (typingText) {

        const roles = [
            "CSE Student",
            "Aspiring Full Stack Developer",
            "Problem Solver",
            "Collaborative Teammate"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typingSpeed = 90;
        const deletingSpeed = 55;
        const pauseAfterTyping = 1500;
        const pauseAfterDeleting = 500;

        function typeRole() {

            const currentRole = roles[roleIndex];

            if (!isDeleting) {

                typingText.textContent =
                    currentRole.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentRole.length) {

                    isDeleting = true;

                    setTimeout(
                        typeRole,
                        pauseAfterTyping
                    );

                    return;
                }

                setTimeout(
                    typeRole,
                    typingSpeed
                );

            } else {

                typingText.textContent =
                    currentRole.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    isDeleting = false;

                    roleIndex =
                        (roleIndex + 1) % roles.length;

                    setTimeout(
                        typeRole,
                        pauseAfterDeleting
                    );

                    return;
                }

                setTimeout(
                    typeRole,
                    deletingSpeed
                );
            }
        }

        typeRole();
    }


    /* =====================================================
       CERTIFICATE MODAL
    ===================================================== */

    const certificateCards =
        document.querySelectorAll(".certificate-card");

    const certificateModal =
        document.getElementById("certificate-modal");

    const certificateModalImage =
        document.getElementById("certificate-modal-image");

    const certificateClose =
        document.querySelector(".certificate-close");

    const certificateBackdrop =
        document.querySelector(".certificate-modal-backdrop");


    const certificateFiles = {

        "certificate-1":
            "certificates/ComputerNetwork.png",

        "certificate-2":
            "certificates/IntroductiontoArtificialIntelligence.png",

        "certificate-3":
            "certificates/CS205BuildingWithArtificialIntelligence.jpeg",

        "certificate-4":
            "certificates/ChatGPTforDataAnalytics.png",

        "certificate-5":
            "certificates/BasicOfPython.jpeg"

    };


    function openCertificate(card) {

        const certificateId =
            card.getAttribute("data-certificate");

        const imagePath =
            certificateFiles[certificateId];

        if (!imagePath) {

            console.error(
                "Certificate path not found:",
                certificateId
            );

            return;
        }

        if (!certificateModal ||
            !certificateModalImage) {
            return;
        }

        certificateModalImage.src = imagePath;

        certificateModalImage.alt =
            card.querySelector("h3")?.textContent ||
            "Certificate";

        certificateModal.classList.add("active");

        certificateModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );
    }


    function closeCertificate() {

        if (!certificateModal) return;

        certificateModal.classList.remove("active");

        certificateModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        setTimeout(() => {

            if (certificateModalImage) {
                certificateModalImage.src = "";
            }

        }, 300);
    }


    certificateCards.forEach(card => {

        card.addEventListener("click", () => {
            openCertificate(card);
        });

    });


    if (certificateClose) {

        certificateClose.addEventListener(
            "click",
            closeCertificate
        );

    }


    if (certificateBackdrop) {

        certificateBackdrop.addEventListener(
            "click",
            closeCertificate
        );

    }


    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {
            closeCertificate();
        }

    });


    /* =====================================================
       PROJECT LINKS
    ===================================================== */

    document.querySelectorAll(
        ".project-link, .project-github"
    ).forEach(link => {

        link.addEventListener("click", () => {

            console.log(
                "Opening:",
                link.href
            );

        });

    });


    /* =====================================================
       SOCIAL LINKS
    ===================================================== */

    document.querySelectorAll(
        ".social-link"
    ).forEach(link => {

        link.addEventListener("click", () => {

            console.log(
                "Social link:",
                link.href
            );

        });

    });


    /* =====================================================
       WHATSAPP
    ===================================================== */

    document.querySelectorAll(
        ".whatsapp-link"
    ).forEach(link => {

        link.addEventListener("click", () => {

            console.log(
                "Opening WhatsApp"
            );

        });

    });


    /* =====================================================
       THEME / SETTINGS BUTTON
    ===================================================== */

    const themeBtn =
        document.getElementById("theme-btn");

    if (themeBtn) {

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            );

        if (savedTheme === "light") {

            document.body.classList.add(
                "light-mode"
            );

        }

        themeBtn.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-mode"
                );

                const isLight =
                    document.body.classList.contains(
                        "light-mode"
                    );

                localStorage.setItem(
                    "portfolio-theme",
                    isLight
                        ? "light"
                        : "dark"
                );

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PROJECT CARD MOUSE EFFECT
    ===================================================== */

    document.querySelectorAll(
        ".project-card"
    ).forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.removeProperty(
                    "--mouse-x"
                );

                card.style.removeProperty(
                    "--mouse-y"
                );

            }
        );

    });


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c VIRAT BHARDWAJ ",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "Developer Portfolio Loaded Successfully 🚀"
    );

});