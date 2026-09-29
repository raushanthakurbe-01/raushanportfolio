// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("show")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


// Close mobile menu after clicking link

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// ================================
// DARK / LIGHT MODE
// ================================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");

    }

});


// ================================
// LOAD SAVED THEME
// ================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    const icon = themeToggle.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}


// ================================
// ACTIVE NAVIGATION
// ================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ================================
// SCROLL TO TOP
// ================================

const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

});

scrollTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ================================
// CONTACT FORM
// ================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const emailJSConfig = {
    publicKey: "MjSLK9KzRDoqPU4DB",
    serviceId: "service_6gdydgp",
    templateId: "template_7tc9pfk"
};

function isEmailJsConfigured() {
    return !!window.emailjs &&
           emailJSConfig.publicKey !== "YOUR_PUBLIC_KEY" &&
           emailJSConfig.serviceId !== "YOUR_SERVICE_ID" &&
           emailJSConfig.templateId !== "YOUR_TEMPLATE_ID";
}

function showFormStatus(message, type) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = "form-status " + type;
}

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");
        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";
        showFormStatus("", "");

        try {
            if (!isEmailJsConfigured()) {
                throw new Error("EmailJS is not configured");
            }

            emailjs.init({ publicKey: emailJSConfig.publicKey });

            const templateParams = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };

            await emailjs.send(emailJSConfig.serviceId, emailJSConfig.templateId, templateParams);

            showFormStatus("Your details have been sent successfully. I will contact you soon.", "success");
            contactForm.reset();
        } catch (error) {
            showFormStatus("EmailJS is not configured yet. Add your EmailJS keys in raushan.js to enable email delivery.", "error");
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }

    });
}


// ================================
// CERTIFICATE MODAL
// ================================

const certificateData = {
    simplilearn: {
        brand: "Simplilearn",
        course: "Machine Learning Using Python",
        title: "Machine Learning Using Python",
        code: "10793076",
        date: "27th September 2026",
        label: "Certificate of Completion",
        instructor: "",
        details: "Certified for successful completion of the online course in Machine Learning Using Python.",
        badge: "Certificate of Completion",
        signature: "Krishna Kumar",
        role: "CEO, Simplilearn"
    },
    forage: {
        brand: "Forage",
        course: "GenAI Powered Data Analytics Job Simulation",
        title: "GenAI Powered Data Analytics Job Simulation",
        code: "",
        date: "September 25th, 2026",
        label: "Certificate of Completion",
        instructor: "",
        details: "Over the period of September 2026, Raushan Kumar has completed practical tasks in: <br> Exploratory data analysis and risk profiling <br> Predicting delinquency with AI <br> Business report and data storytelling for collections strategy <br> Implementing an AI-driven collections strategy",
        badge: "Certificate of Completion",
        signature: "Tom Brunskill",
        role: "Co-Founder of Forage"
    },
    udemy: {
        brand: "Udemy",
        course: "The Complete Prompt Engineering for AI Bootcamp (2026)",
        title: "The Complete Prompt Engineering for AI Bootcamp (2026)",
        code: "UC-061ec878-b2a9-4851-a3f6-4d79993063c0",
        date: "Sept. 16, 2026",
        label: "Certificate of Completion",
        instructor: "Mike Taylor, James Phoenix",
        details: "Length: 18 total hours",
        badge: "Certificate of Completion",
        signature: "",
        role: ""
    }
};

const certificateModal = document.getElementById("certificateModal");
const certificatePreview = document.getElementById("certificatePreview");
const closeCertificateModal = document.getElementById("closeCertificateModal");
const printCertificateBtn = document.getElementById("printCertificateBtn");

function renderCertificate(certKey) {
    const item = certificateData[certKey];

    if (!item) return;

    const extraMeta = item.code
        ? `<div>Certificate code: ${item.code}</div>`
        : ``;

    const instructor = item.instructor
        ? `<div class="preview-instructor"><strong>Instructors</strong> ${item.instructor}</div>`
        : ``;

    const signatureMarkup = item.signature
        ? `
            <div class="preview-signature">
                <div class="signature-line">✍</div>
                <span>${item.signature}</span>
                <small>${item.role}</small>
            </div>
        `
        : ``;

    certificatePreview.innerHTML = `
        <div class="preview-header">
            <div class="preview-brand"><span class="brand-mark"></span>${item.brand}</div>
            <div class="preview-meta">
                ${extraMeta}
                <div>Certificate date: ${item.date}</div>
            </div>
        </div>

        <div class="preview-title-block">
            <div class="preview-label">${item.label}</div>
            <h2 class="preview-title" id="certificateTitle">${item.title}</h2>
            ${instructor}
        </div>

        <div class="preview-name">Raushan Kumar</div>
        <div class="preview-details">
            ${item.details}
        </div>

        <div class="preview-bottom">
            <div class="preview-footer-note">
                <strong>${item.badge}</strong>
                <div>${item.date}</div>
            </div>
            ${signatureMarkup}
        </div>
    `;

    certificateModal.classList.add("show");
    certificateModal.setAttribute("aria-hidden", "false");
}

document.querySelectorAll(".certificate-card").forEach(card => {
    card.addEventListener("click", () => {
        renderCertificate(card.dataset.cert);
    });
});

closeCertificateModal.addEventListener("click", () => {
    certificateModal.classList.remove("show");
    certificateModal.setAttribute("aria-hidden", "true");
});

printCertificateBtn.addEventListener("click", () => {
    window.print();
});

certificateModal.addEventListener("click", (event) => {
    if (event.target.dataset.close === "certificate") {
        certificateModal.classList.remove("show");
        certificateModal.setAttribute("aria-hidden", "true");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && certificateModal.classList.contains("show")) {
        certificateModal.classList.remove("show");
        certificateModal.setAttribute("aria-hidden", "true");
    }
});

// ================================
// CURRENT YEAR
// ================================

document.getElementById("year").textContent =
    new Date().getFullYear();    const emailJSConfig = {
        publicKey: "YOUR_PUBLIC_KEY",
        serviceId: "YOUR_SERVICE_ID",
        templateId: "YOUR_TEMPLATE_ID"
    };