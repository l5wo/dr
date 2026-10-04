/* =========================================================
   HS STUDIO — MODEL 2
   EMERALD × CHAMPAGNE
   CLIENT DATA & INTERACTIONS
========================================================= */


/* =========================================================
   CLIENT DATA
   عدّل بيانات الزبون من هنا فقط
========================================================= */

const clientData = {

    /* =========================
       BASIC INFORMATION
    ========================= */

    name: "Dr. Waad Saaed",

    job: "Skilled Nurse",

    bio: "مُمرض ماهر",

    location: "العراق / دهوك",

    phone: "+9647503534890",


    /* =========================
       TYPING TEXT
    ========================= */

    typingTexts: [
        "عيادة طبية",
        "مُمرض ماهر" 
    ],


    /* =========================
       SOCIAL LINKS
    ========================= */

    socials: {

        instagram: "https://instagram.com/waadsaeed556",
        tiktok: "https://tiktok.com/@waad67551",
        telegram: "https://t.me/Waads81",
        snapchat: "https://snapchat.com/add/user851678228
",
    },


    /* =========================
       IMAGES
    ========================= */

    profileImage: "profile.jpg",

    qrImage: "qr.png"

};


/* =========================================================
   GET ELEMENTS
========================================================= */

const profileName =
    document.getElementById("profileName");

const profileJob =
    document.getElementById("profileJob");

const profileBio =
    document.getElementById("profileBio");

const profileLocation =
    document.getElementById("profileLocation");

const profileImage =
    document.getElementById("profileImage");

const imagePlaceholder =
    document.getElementById("imagePlaceholder");

const qrImage =
    document.getElementById("qrImage");

const qrPlaceholder =
    document.getElementById("qrPlaceholder");

const phoneText =
    document.getElementById("phoneText");

const phoneButton =
    document.getElementById("phoneButton");

const copyButton =
    document.getElementById("copyButton");

const toast =
    document.getElementById("toast");

const typingText =
    document.getElementById("typingText");

const themeToggle =
    document.getElementById("themeToggle");

const year =
    document.getElementById("year");


/* =========================================================
   BASIC INFORMATION
========================================================= */

if (profileName) {

    profileName.textContent = clientData.name;

}


if (profileJob) {

    profileJob.textContent = clientData.job;

}


if (profileBio) {

    profileBio.textContent = clientData.bio;

}


if (profileLocation) {

    profileLocation.innerHTML =
        `<i class="fa-solid fa-location-dot"></i> ${clientData.location}`;

}


if (phoneText) {

    phoneText.textContent = clientData.phone;

}


/* =========================================================
   PROFILE IMAGE
========================================================= */

if (profileImage) {

    profileImage.src = clientData.profileImage;


    profileImage.addEventListener(
        "load",
        function () {

            if (imagePlaceholder) {

                imagePlaceholder.classList.add("hidden");

            }

        }
    );


    profileImage.addEventListener(
        "error",
        function () {

            profileImage.style.display = "none";


            if (imagePlaceholder) {

                imagePlaceholder.classList.remove("hidden");

            }

        }
    );

}


/* =========================================================
   AUTOMATIC QR CODE
   يولد QR تلقائياً من رابط الصفحة الحالية
========================================================= */

function generateQRCode() {

    if (!qrImage) {

        return;

    }


    /*
        الرابط الحالي للموقع

        مثال:
        https://example.com/profile/

        إذا كان الموقع على GitHub Pages
        راح يأخذ رابط GitHub Pages تلقائياً.
    */

    const currentURL =
        window.location.href;


    /*
        خدمة توليد QR Code

        يتم إرسال رابط الصفحة إليها
        وتحويله إلى QR Code.
    */

    const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/" +
        "?size=500x500" +
        "&margin=10" +
        "&data=" +
        encodeURIComponent(currentURL);


    /*
        إظهار QR
    */

    qrImage.style.display =
        "block";


    qrImage.src =
        qrURL;


    /*
        إذا نجح تحميل QR
    */

    qrImage.addEventListener(
        "load",
        function () {

            if (qrPlaceholder) {

                qrPlaceholder.style.display =
                    "none";

            }

        },
        { once: true }
    );


    /*
        إذا فشل إنشاء QR
    */

    qrImage.addEventListener(
        "error",
        function () {

            qrImage.style.display =
                "none";


            if (qrPlaceholder) {

                qrPlaceholder.style.display =
                    "flex";

            }

        },
        { once: true }
    );

}


/*
    تشغيل إنشاء QR
*/

generateQRCode();


/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks =
    document.querySelectorAll(".social-link");


socialLinks.forEach(
    function (link) {

        const socialName =
            link.dataset.social;

        const socialUrl =
            clientData.socials[socialName];


        if (
            socialUrl &&
            socialUrl.trim() !== ""
        ) {

            link.href = socialUrl;

            link.target = "_blank";

            link.rel =
                "noopener noreferrer";

            link.classList.remove("disabled");

        } else {

            link.href = "#";

            link.classList.add("disabled");

        }

    }
);


/* =========================================================
   SOCIAL CLICK
========================================================= */

socialLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const socialName =
                    link.dataset.social;

                const socialUrl =
                    clientData.socials[socialName];


                if (
                    !socialUrl ||
                    socialUrl.trim() === ""
                ) {

                    event.preventDefault();

                    showToast(
                        "أضف رابط الحساب أولاً"
                    );

                }

            }
        );

    }
);


/* =========================================================
   PHONE BUTTON
========================================================= */

if (phoneButton) {

    phoneButton.addEventListener(
        "click",
        function () {

            const phone =
                clientData.phone;


            if (
                !phone ||
                phone.includes("X")
            ) {

                showToast(
                    "أضف رقم الهاتف أولاً"
                );

                return;

            }


            const cleanPhone =
                phone.replace(
                    /[^0-9+]/g,
                    ""
                );


            window.location.href =
                `tel:${cleanPhone}`;

        }
    );

}


/* =========================================================
   COPY PHONE
========================================================= */

/**
 * نسخ رقم الهاتف
 */

if (copyButton) {

    copyButton.addEventListener(
        "click",
        async function () {

            const phone =
                clientData.phone;


            if (
                !phone ||
                phone.includes("X")
            ) {

                showToast(
                    "أضف رقم الهاتف أولاً"
                );

                return;

            }


            try {

                await navigator.clipboard.writeText(
                    phone
                );


                copyButton.classList.add(
                    "copied"
                );


                copyButton.innerHTML =
                    `<i class="fa-solid fa-check"></i>`;


                showToast(
                    "تم نسخ رقم الهاتف بنجاح"
                );


                setTimeout(
                    function () {

                        copyButton.classList.remove(
                            "copied"
                        );


                        copyButton.innerHTML =
                            `<i class="fa-regular fa-copy"></i>`;

                    },
                    1800
                );

            } catch (error) {

                showToast(
                    "تعذر نسخ الرقم"
                );

            }

        }
    );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


/**
 * إظهار رسالة صغيرة للمستخدم
 * @param {string} message
 */

function showToast(message) {

    if (!toast) {

        return;

    }


    const toastTitle =
        toast.querySelector("strong");

    const toastMessage =
        toast.querySelector("span");


    if (toastMessage) {

        toastMessage.textContent =
            message;

    }


    if (toastTitle) {

        if (
            message ===
            "تم نسخ رقم الهاتف بنجاح"
        ) {

            toastTitle.textContent =
                "تم النسخ";

        } else {

            toastTitle.textContent =
                "تنبيه";

        }

    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove("show");

            },
            2500
        );

}


/* =========================================================
   TYPING EFFECT
========================================================= */

let typingIndex = 0;

let characterIndex = 0;

let isDeleting = false;


/**
 * تأثير الكتابة
 */

function typeEffect() {

    if (
        !typingText ||
        !clientData.typingTexts ||
        clientData.typingTexts.length === 0
    ) {

        return;

    }


    const currentText =
        clientData.typingTexts[typingIndex];


    if (!isDeleting) {

        characterIndex++;


        typingText.textContent =
            currentText.substring(
                0,
                characterIndex
            );


        if (
            characterIndex >=
            currentText.length
        ) {

            isDeleting = true;


            setTimeout(
                typeEffect,
                1500
            );


            return;

        }


        setTimeout(
            typeEffect,
            80
        );


    } else {

        characterIndex--;


        typingText.textContent =
            currentText.substring(
                0,
                characterIndex
            );


        if (
            characterIndex <= 0
        ) {

            isDeleting = false;

            typingIndex++;


            if (
                typingIndex >=
                clientData.typingTexts.length
            ) {

                typingIndex = 0;

            }


            setTimeout(
                typeEffect,
                350
            );


            return;

        }


        setTimeout(
            typeEffect,
            45
        );

    }

}


typeEffect();


/* =========================================================
   THEME
========================================================= */

const savedTheme =
    localStorage.getItem(
        "hs-model-2-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );

}


/* =========================================================
   UPDATE THEME ICON
========================================================= */

function updateThemeIcon() {

    if (!themeToggle) {

        return;

    }


    const isLight =
        document.body.classList.contains(
            "light-mode"
        );


    if (isLight) {

        themeToggle.innerHTML =
            `<i class="fa-solid fa-sun"></i>`;


        themeToggle.setAttribute(
            "aria-label",
            "تفعيل الوضع الداكن"
        );

    } else {

        themeToggle.innerHTML =
            `<i class="fa-solid fa-moon"></i>`;


        themeToggle.setAttribute(
            "aria-label",
            "تفعيل الوضع الفاتح"
        );

    }

}


updateThemeIcon();


/* =========================================================
   THEME BUTTON
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-mode"
            );


            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            localStorage.setItem(
                "hs-model-2-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   IMAGE INITIAL CHECK
========================================================= */

if (
    profileImage &&
    imagePlaceholder &&
    profileImage.complete
) {

    if (
        profileImage.naturalWidth === 0
    ) {

        profileImage.style.display =
            "none";

        imagePlaceholder.classList.remove(
            "hidden"
        );

    } else {

        imagePlaceholder.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   QR INITIAL CHECK
========================================================= */

if (
    qrImage &&
    qrPlaceholder &&
    qrImage.complete
) {

    if (
        qrImage.naturalWidth === 0
    ) {

        qrImage.style.display =
            "none";

        qrPlaceholder.style.display =
            "flex";

    } else {

        qrPlaceholder.style.display =
            "none";

    }

}


/* =========================================================
   PAGE READY
========================================================= */

document.body.classList.add(
    "page-ready"
);
