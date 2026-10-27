// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("show");

    var _chat = document.getElementById("portfolioChat");
    if (navbar.classList.contains("show") && _chat && _chat.classList.contains("is-open")) {
        setChatOpen(false);
    }

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
// DYNAMIC HERO DEVELOPER TITLE  (typewriter effect)
// ================================

const dynamicTitleElement = document.getElementById("dynamicTitle");

if (dynamicTitleElement) {
    const developerRoles = [
        "Full Stack Web Developer",
        "Python Developer",
        "AI/ML Enthusiast",
        "Java Developer",
        "Frontend Developer",
        "Backend Developer"
    ];

    const TYPE_SPEED        = 75;   // ms per character while typing
    const ERASE_SPEED       = 40;   // ms per character while erasing
    const PAUSE_AFTER_TYPE  = 1800; // ms to hold after fully typed
    const PAUSE_AFTER_ERASE = 300;  // ms to wait before typing next

    const titleContainer = dynamicTitleElement.closest(".dynamic-title-container")
                        || dynamicTitleElement.parentElement;

    let roleIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    let timerId   = null;
    let isPaused  = false;

    function updateAriaLabel(text) {
        if (titleContainer) {
            titleContainer.setAttribute("aria-label", "Role: " + text);
        }
    }

    function typewriterTick() {
        if (isPaused) return;

        const currentRole = developerRoles[roleIndex];

        if (!isErasing) {
            charIndex++;
            dynamicTitleElement.textContent = currentRole.slice(0, charIndex);

            if (charIndex === currentRole.length) {
                updateAriaLabel(currentRole);
                timerId = setTimeout(function() {
                    isErasing = true;
                    typewriterTick();
                }, PAUSE_AFTER_TYPE);
                return;
            }
        } else {
            charIndex--;
            dynamicTitleElement.textContent = currentRole.slice(0, charIndex);

            if (charIndex === 0) {
                isErasing = false;
                roleIndex = (roleIndex + 1) % developerRoles.length;
                timerId = setTimeout(typewriterTick, PAUSE_AFTER_ERASE);
                return;
            }
        }

        timerId = setTimeout(typewriterTick, isErasing ? ERASE_SPEED : TYPE_SPEED);
    }

    function startTypewriter() {
        isPaused = false;
        if (!timerId) {
            timerId = setTimeout(typewriterTick, TYPE_SPEED);
        }
    }

    function stopTypewriter() {
        isPaused = true;
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
    }

    // Pause when tab is hidden to save resources
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            stopTypewriter();
        } else {
            startTypewriter();
        }
    });

    var reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
        // No animation: just show full first title
        dynamicTitleElement.textContent = developerRoles[0];
        updateAriaLabel(developerRoles[0]);
    } else {
        // Start typewriter with a small initial delay
        dynamicTitleElement.textContent = "";
        timerId = setTimeout(typewriterTick, 600);

        if (typeof reducedMotionQuery.addEventListener === "function") {
            reducedMotionQuery.addEventListener("change", function(e) {
                if (e.matches) {
                    stopTypewriter();
                    dynamicTitleElement.textContent = developerRoles[roleIndex];
                    updateAriaLabel(developerRoles[roleIndex]);
                } else {
                    startTypewriter();
                }
            });
        }
    }
}


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

            const formData = new FormData(contactForm);
            const templateParams = {
                name: formData.get("name"),
                email: formData.get("email"),
                subject: formData.get("subject"),
                message: formData.get("message")
            };

            await emailjs.send(emailJSConfig.serviceId, emailJSConfig.templateId, templateParams);

            showFormStatus("Your details have been sent successfully. I will contact you soon.", "success");
            contactForm.reset();
        } catch (error) {
            const errorMessage = error?.text || error?.message || "Unable to send your message. Please try again later.";
            showFormStatus(errorMessage, "error");
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
    new Date().getFullYear();


// ================================
// PORTFOLIO CHAT AND CONTACT MENU
// ================================

const contactLauncher = document.getElementById("contactLauncher");
const contactMenu = document.getElementById("contactMenu");
const portfolioChat = document.getElementById("portfolioChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatForm = document.getElementById("chatForm");
const sendChat = document.getElementById("sendChat");
const newConversationButton = document.getElementById("newConversation");
const chatStatus = document.getElementById("chatStatus");
const chatSuggestions = document.getElementById("chatSuggestions");
const chatLauncherBadge = document.getElementById("chatLauncherBadge");
const initialChatMessage = chatMessages.querySelector(".assistant-message").cloneNode(true);

const portfolioGreeting = {
    text: "Hi! 👋 I'm Raushan’s AI Assistant. How can I help you explore his portfolio today? Ask a question or choose a topic below.",
    actions: [
        { label: "View Projects", href: "#projects", icon: "fas fa-folder-open" },
        { label: "My Skills", href: "#skills", icon: "fas fa-code" },
        { label: "Contact", href: "#contact", icon: "fas fa-envelope" }
    ],
    followUps: ["Tell me about Raushan", "What are his technical skills?", "Show me his projects", "How can I contact him?"]
};

const setupGreeting = {
    text: "AI replies are running in fast verified mode. I can answer all questions about Raushan's portfolio, skills, projects, and contact info!",
    actions: [
        { label: "Projects", href: "#projects", icon: "fas fa-briefcase" },
        { label: "Contact", href: "#contact", icon: "fas fa-envelope" }
    ],
    followUps: ["Tell me about Raushan", "What are his technical skills?", "Show me his projects", "How can I contact him?"]
};

let chatIsConfigured = false;
let chatIsSending = false;
let lastFailedMessage = "";

const portfolioAnswers = {
    greeting: {
        text: "Hello! 👋 I'm Raushan's Portfolio AI Assistant. I can help you explore his projects, technical skills, education, and credentials.",
        actions: [
            { label: "View Projects", href: "#projects", icon: "fas fa-folder-open" },
            { label: "Skills Overview", href: "#skills", icon: "fas fa-code" }
        ],
        followUps: ["Tell me about Raushan", "What are his technical skills?", "Show me his projects", "How can I contact him?"]
    },
    about: {
        text: "Raushan Kumar is a Full Stack Web Developer & MCA student. He specializes in Java, Spring Boot, React, and Python, focusing on scalable digital solutions, clean architecture, and modern user experiences.",
        actions: [
            { label: "About Section", href: "#about", icon: "fas fa-user" },
            { label: "LinkedIn Profile", href: "https://www.linkedin.com/in/raushan-kumar-5b362a270/", icon: "fab fa-linkedin", external: true }
        ],
        followUps: ["What are his technical skills?", "Show me his projects", "What is his education?"]
    },
    skills: {
        text: "Here are Raushan's core technical skills:\n\n• Backend: Java, Spring Boot, Python, Node.js, Express.js\n• Frontend: React, JavaScript (ES6+), HTML5, CSS3\n• Databases: MySQL, MongoDB, SQL Optimization\n• Core & Tools: Git, GitHub, REST APIs, OOPs, Data Structures",
        actions: [
            { label: "Explore Skills Grid", href: "#skills", icon: "fas fa-laptop-code" }
        ],
        followUps: ["Show me his projects", "What certificates does he have?", "How can I contact him?"]
    },
    projects: {
        text: "Here are Raushan's featured projects:\n\n1. Manbhawan Steel – Full-stack e-commerce & service management platform built with Java, Spring Boot, React & MySQL.\n2. E-Commerce Website – Responsive online shopping app with cart & product catalog.\n3. Database Management – Relational schema design, complex SQL queries & optimization.",
        actions: [
            { label: "View Projects", href: "#projects", icon: "fas fa-briefcase" },
            { label: "GitHub Profile", href: "https://github.com/raushanthakurbe-01", icon: "fab fa-github", external: true }
        ],
        followUps: ["What are his technical skills?", "What is his education?", "How can I contact him?"]
    },
    education: {
        text: "Raushan's Academic Background:\n\n• MCA (Master of Computer Applications) – Dev Bhoomi Uttarakhand University (Ongoing)\n• BCA (Bachelor of Computer Applications) – BRABU\n• Intermediate (12th PCM) – G A Inter School, Hajipur (BSEB, 69%)",
        actions: [
            { label: "View Education Timeline", href: "#education", icon: "fas fa-graduation-cap" }
        ],
        followUps: ["What certificates does he have?", "Show me his projects", "What are his technical skills?"]
    },
    certificates: {
        text: "Raushan has earned verified credentials in:\n\n• Machine Learning Using Python – Simplilearn\n• GenAI Powered Data Analytics – Forage\n• The Complete Prompt Engineering for AI Bootcamp – Udemy",
        actions: [
            { label: "View Certificates", href: "#certification", icon: "fas fa-certificate" }
        ],
        followUps: ["Show me his projects", "What are his technical skills?", "How can I contact him?"]
    },
    contact: {
        text: "You can reach out to Raushan directly via:\n\n💬 WhatsApp: +91 9905552535\n📧 Email: raushanthakur.be@gmail.com\n📸 Instagram: @raushann_10\n💼 LinkedIn: raushan-kumar-5b362a270\n🐙 GitHub: raushanthakurbe-01\n\nOr use the interactive contact form on this website!",
        actions: [
            { label: "WhatsApp", href: "https://wa.me/919905552535?text=Hi%20Raushan%2C%20I%20saw%20your%20portfolio!", icon: "fab fa-whatsapp", external: true },
            { label: "Instagram", href: "https://www.instagram.com/raushann_10?srtk=cHNjYnY3djRpaGY%3D&utm_source=qr", icon: "fab fa-instagram", external: true },
            { label: "Send Email", href: "mailto:raushanthakur.be@gmail.com", icon: "fas fa-paper-plane" }
        ],
        followUps: ["Tell me about Raushan", "Show me his projects", "What are his technical skills?"]
    },
    services: {
        text: "Raushan offers professional development services in:\n\n• Full Stack Web Applications (React + Spring Boot)\n• High-performance Backend & REST APIs\n• Database Architecture & SQL Optimization (MySQL, MongoDB)\n• AI/ML Feature Integration & Data Analytics (Python)",
        actions: [
            { label: "View Services", href: "#services", icon: "fas fa-layer-group" },
            { label: "Contact Raushan", href: "#contact", icon: "fas fa-envelope" }
        ],
        followUps: ["Show me his projects", "What are his technical skills?", "How can I contact him?"]
    },
    resume: {
        text: "Raushan is actively seeking Full Stack Web Developer and Software Engineer opportunities. You can review all his projects, education, and credentials here, or contact him directly.",
        actions: [
            { label: "Contact Raushan", href: "#contact", icon: "fas fa-envelope" },
            { label: "View Projects", href: "#projects", icon: "fas fa-briefcase" }
        ],
        followUps: ["What are his technical skills?", "What is his education?", "How can I contact him?"]
    },
    fallback: {
        text: "I can help you explore everything about Raushan's portfolio! Feel free to ask about his technical skills, projects, education, certificates, or how to contact him.",
        actions: [
            { label: "Projects", href: "#projects", icon: "fas fa-folder" },
            { label: "Contact", href: "#contact", icon: "fas fa-envelope" }
        ],
        followUps: ["Tell me about Raushan", "What are his technical skills?", "Show me his projects", "How can I contact him?"]
    }
};

function updateLauncherIcons(isOpen) {
    if (!contactLauncher) return;
    const chatIcon = contactLauncher.querySelector(".launcher-icon-chat");
    const closeIcon = contactLauncher.querySelector(".launcher-icon-close");
    if (chatIcon && closeIcon) {
        chatIcon.style.display = isOpen ? "none" : "inline-block";
        closeIcon.style.display = isOpen ? "inline-block" : "none";
    }
    if (chatLauncherBadge) {
        if (isOpen) {
            chatLauncherBadge.style.opacity = "0";
            chatLauncherBadge.style.pointerEvents = "none";
        } else {
            chatLauncherBadge.style.opacity = "1";
            chatLauncherBadge.style.pointerEvents = "auto";
        }
    }
}

function setChatMenuOpen(isOpen) {
    contactMenu.classList.toggle("is-open", isOpen);
    contactMenu.setAttribute("aria-hidden", String(!isOpen));
    contactLauncher.setAttribute("aria-expanded", String(isOpen));
    contactLauncher.setAttribute("aria-label", isOpen ? "Close contact options" : "Open contact options");
    updateLauncherIcons(isOpen || portfolioChat.classList.contains("is-open"));
}

function setChatOpen(isOpen, focusInput = false) {
    if (isOpen && focusInput) contactLauncher.focus();
    if (!isOpen && focusInput) contactLauncher.focus();

    if (isOpen && navbar.classList.contains("show")) {
        navbar.classList.remove("show");
        const menuIcon = menuBtn.querySelector("i");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }

    portfolioChat.classList.toggle("is-open", isOpen);
    portfolioChat.setAttribute("aria-hidden", String(!isOpen));
    portfolioChat.inert = !isOpen;
    updateLauncherIcons(isOpen);

    if (isOpen) {
        setChatMenuOpen(false);
        if (focusInput) window.requestAnimationFrame(() => chatInput.focus());
    }
}

function formatChatTime() {
    return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date());
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function streamTextToElement(element, text, onComplete) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        element.textContent = text;
        if (onComplete) onComplete();
        return;
    }

    const words = text.split(" ");
    let index = 0;
    element.textContent = "";

    function step() {
        if (index < words.length) {
            element.textContent += (index > 0 ? " " : "") + words[index];
            index++;
            scrollChatToBottom();
            setTimeout(step, 18);
        } else {
            if (onComplete) onComplete();
        }
    }
    step();
}

function appendMessage(payload, sender, options = {}) {
    const message = document.createElement("div");
    message.className = `chat-message ${sender}-message`;
    message.setAttribute("aria-label", sender === "visitor" ? "Your message" : "Assistant response");

    const paragraph = document.createElement("p");
    message.append(paragraph);

    const time = document.createElement("time");
    time.dateTime = new Date().toISOString();
    time.textContent = formatChatTime();

    let textContent = "";
    let actions = [];
    let followUps = [];

    if (typeof payload === "string") {
        textContent = payload;
    } else if (payload && typeof payload === "object") {
        textContent = payload.text || "";
        actions = payload.actions || [];
        followUps = payload.followUps || [];
    }

    chatMessages.append(message);

    function finalizeAssistantMessage() {
        if (actions && actions.length > 0) {
            const actionsContainer = document.createElement("div");
            actionsContainer.className = "chat-action-links";
            actions.forEach(act => {
                const link = document.createElement("a");
                link.className = "chat-action-btn";
                link.href = act.href;
                if (act.external) {
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                } else {
                    link.addEventListener("click", () => {
                        window.requestAnimationFrame(() => setChatOpen(false, true));
                    });
                }
                if (act.icon) {
                    const iconEl = document.createElement("i");
                    iconEl.className = act.icon;
                    link.append(iconEl);
                }
                link.append(document.createTextNode(act.label));
                actionsContainer.append(link);
            });
            message.append(actionsContainer);
        }

        if (followUps && followUps.length > 0) {
            const followUpsContainer = document.createElement("div");
            followUpsContainer.className = "chat-followups";
            followUps.forEach(chipText => {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "chat-followup-chip";
                chip.textContent = chipText;
                chip.addEventListener("click", () => submitChatMessage(chipText));
                followUpsContainer.append(chip);
            });
            message.append(followUpsContainer);
        }

        if (options.retry) {
            const retry = document.createElement("button");
            retry.type = "button";
            retry.className = "chat-retry";
            retry.textContent = "Try again";
            retry.addEventListener("click", () => submitChatMessage(options.retry, true));
            message.append(retry);
        }

        message.append(time);
        scrollChatToBottom();
    }

    if (sender === "assistant" && !options.instant) {
        streamTextToElement(paragraph, textContent, finalizeAssistantMessage);
    } else {
        paragraph.textContent = textContent;
        finalizeAssistantMessage();
    }

    scrollChatToBottom();
    return message;
}

function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "chat-message assistant-message typing-message";
    indicator.setAttribute("role", "status");
    indicator.setAttribute("aria-label", "Assistant is preparing a response");
    indicator.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.append(indicator);
    scrollChatToBottom();
    return indicator;
}

function getOfflineAnswer(message) {
    const text = message.toLowerCase().trim();
    if (/(hi|hello|hey|namaste|hlo|hii|helo|kaise ho|kya hal)/i.test(text)) {
        return portfolioAnswers.greeting;
    }
    if (/(service|services|offer|what can you do|kya kar sakte|freelance)/i.test(text)) {
        return portfolioAnswers.services;
    }
    if (/(resume|cv|biodata|hire|job|internship)/i.test(text)) {
        return portfolioAnswers.resume;
    }
    if (/(skill|technolog|technical|tech|languages|frameworks|tools|stack|kya aata)/i.test(text)) {
        return portfolioAnswers.skills;
    }
    if (/(project|work|built|app|application|portfolio|kaam|banaya)/i.test(text)) {
        return portfolioAnswers.projects;
    }
    if (/(education|degree|study|college|university|mca|bca|school|padhai)/i.test(text)) {
        return portfolioAnswers.education;
    }
    if (/(certificat|course|bootcamp|achievement|license)/i.test(text)) {
        return portfolioAnswers.certificates;
    }
    if (/(contact|email|reach|whatsapp|instagram|linkedin|phone|call|message|sampark|baat)/i.test(text)) {
        return portfolioAnswers.contact;
    }
    if (/(about|who|raushan|him|intro|kon hai|kaun hai|profile)/i.test(text)) {
        return portfolioAnswers.about;
    }
    return portfolioAnswers.fallback;
}

function setChatBusy(isBusy) {
    chatIsSending = isBusy;
    sendChat.disabled = isBusy;
    newConversationButton.disabled = isBusy;
    chatInput.disabled = isBusy;
    sendChat.setAttribute("aria-busy", String(isBusy));
}

async function submitChatMessage(rawMessage, isRetry = false) {
    const message = rawMessage.trim();
    if (!message || chatIsSending) return;
    if (!isRetry) {
        appendMessage(message, "visitor", { instant: true });
        chatInput.value = "";
    }

    lastFailedMessage = message;
    setChatBusy(true);
    const typing = showTypingIndicator();

    try {
        if (!chatIsConfigured) {
            await new Promise(resolve => window.setTimeout(resolve, 320));
            typing.remove();
            appendMessage(getOfflineAnswer(message), "assistant");
            return;
        }

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });
        const result = await response.json().catch(() => ({}));
        typing.remove();

        if (!response.ok) {
            const error = new Error(result.error || "The assistant could not respond right now.");
            error.code = result.code;
            throw error;
        }

        lastFailedMessage = "";
        appendMessage(result.reply, "assistant");
    } catch (error) {
        typing.remove();
        const errorMessage = error.code === "AI_NOT_CONFIGURED"
            ? "AI responses are currently running in verified portfolio mode. Choose a topic below or explore via shortcuts."
            : `${error.message || "The assistant could not respond right now."} Your message is still here if you want to retry.`;
        appendMessage(errorMessage, "assistant", { retry: lastFailedMessage });
    } finally {
        setChatBusy(false);
    }
}

function makeWhatsAppUrl(phone, message) {
    const query = message ? `?text=${encodeURIComponent(message)}` : "";
    return `https://wa.me/${phone}${query}`;
}

function setOptionalContactLink(element, url) {
    if (url) {
        element.href = url;
        element.hidden = false;
    }
}

function initDefaultContactLinks() {
    const waUrl = "https://wa.me/919905552535?text=Hi%20Raushan%2C%20I%20saw%20your%20portfolio!";
    setOptionalContactLink(document.getElementById("whatsappAction"), waUrl);
    setOptionalContactLink(document.getElementById("contactWhatsApp"), waUrl);

    const igUrl = "https://www.instagram.com/raushann_10?srtk=cHNjYnY3djRpaGY%3D&utm_source=qr";
    setOptionalContactLink(document.getElementById("instagramAction"), igUrl);
    setOptionalContactLink(document.getElementById("contactInstagram"), igUrl);
}

function setChatSetupState(isConfigured) {
    chatStatus.textContent = isConfigured ? "AI Assistant · Online" : "AI Assistant · Active";
}

async function loadPublicContactConfig() {
    try {
        const response = await fetch("/api/config", { headers: { Accept: "application/json" } });
        if (!response.ok) {
            setChatSetupState(false);
            return;
        }
        const config = await response.json();
        chatIsConfigured = config.aiConfigured === true;
        setChatSetupState(chatIsConfigured);

        if (config.whatsappPhone) {
            const url = makeWhatsAppUrl(config.whatsappPhone, config.whatsappMessage || "");
            setOptionalContactLink(document.getElementById("whatsappAction"), url);
            setOptionalContactLink(document.getElementById("contactWhatsApp"), url);
        }
        if (config.instagramUrl) {
            setOptionalContactLink(document.getElementById("instagramAction"), config.instagramUrl);
            setOptionalContactLink(document.getElementById("contactInstagram"), config.instagramUrl);
        }
    } catch {
        setChatSetupState(false);
    }
}

function resetConversation() {
    chatMessages.replaceChildren();
    appendMessage(portfolioGreeting, "assistant", { instant: true });
    chatSuggestions.hidden = false;
    lastFailedMessage = "";
    chatInput.value = "";
    chatInput.focus();
}

// Initial welcome message with interactive chips
chatMessages.replaceChildren();
appendMessage(portfolioGreeting, "assistant", { instant: true });

if (contactLauncher) {
    contactLauncher.addEventListener("click", () => {
        if (portfolioChat.classList.contains("is-open")) {
            setChatOpen(false, true);
        } else if (contactMenu.classList.contains("is-open")) {
            setChatMenuOpen(false);
        } else {
            const hasOptionalLinks = !document.getElementById("whatsappAction").hidden || !document.getElementById("instagramAction").hidden;
            if (hasOptionalLinks) {
                setChatMenuOpen(true);
            } else {
                setChatOpen(true, true);
            }
        }
    });
}

if (chatLauncherBadge) {
    chatLauncherBadge.addEventListener("click", () => setChatOpen(true, true));
    chatLauncherBadge.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setChatOpen(true, true);
        }
    });
}

document.getElementById("openChatAction").addEventListener("click", () => setChatOpen(true, true));
document.getElementById("closeChat").addEventListener("click", () => setChatOpen(false, true));
newConversationButton.addEventListener("click", resetConversation);

chatForm.addEventListener("submit", event => {
    event.preventDefault();
    submitChatMessage(chatInput.value);
});

chatSuggestions.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => submitChatMessage(button.textContent));
});

document.querySelectorAll(".chat-shortcuts a").forEach(link => {
    link.addEventListener("click", () => window.requestAnimationFrame(() => setChatOpen(false, true)));
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        if (portfolioChat.classList.contains("is-open")) setChatOpen(false, true);
        else if (contactMenu.classList.contains("is-open")) {
            setChatMenuOpen(false);
            contactLauncher.focus();
        }
    }
});

initDefaultContactLinks();
loadPublicContactConfig();


// ================================
// TOAST NOTIFICATIONS & EMAIL COPY
// ================================

let toastTimeout = null;

function showToast(message, duration = 3000) {
    let toast = document.getElementById("portfolioToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "portfolioToast";
        toast.className = "portfolio-toast";
        toast.setAttribute("role", "status");
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}

// 1-Click Email Copy on all mailto links
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener("click", () => {
        const email = link.getAttribute("href").replace("mailto:", "").trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied: ${email} 📋`, 3200);
            }).catch(() => {});
        }
    });
});

// Download CV button feedback
const downloadCvBtn = document.getElementById("downloadCvBtn");
if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", () => {
        showToast("Resume requested! You can also reach Raushan via WhatsApp. 📄", 3500);
    });
}
