const menuButton = document.getElementById("menu-button");
const navigation = document.getElementById("main-navigation");
const menuIcon = menuButton.querySelector("i");

function closeMenu() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    menuIcon.className = "fa-solid fa-bars";
}

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

document.querySelectorAll("nav a").forEach((link) => link.addEventListener("click", closeMenu));

const projectTrack = document.getElementById("project-track");
document.getElementById("right-arrow").addEventListener("click", () => {
    projectTrack.scrollBy({ left: projectTrack.clientWidth * 0.9, behavior: "smooth" });
});
document.getElementById("left-arrow").addEventListener("click", () => {
    projectTrack.scrollBy({ left: -projectTrack.clientWidth * 0.9, behavior: "smooth" });
});

const cvModal = document.getElementById("cv-modal");
const openCvButton = document.getElementById("open-cv");
const closeCvButton = document.getElementById("close-cv");

function closeCv() {
    cvModal.classList.remove("open");
    cvModal.setAttribute("aria-hidden", "true");
    openCvButton.focus();
}

openCvButton.addEventListener("click", () => {
    cvModal.classList.add("open");
    cvModal.setAttribute("aria-hidden", "false");
    closeCvButton.focus();
});
closeCvButton.addEventListener("click", closeCv);
cvModal.addEventListener("click", (event) => {
    if (event.target === cvModal) closeCv();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cvModal.classList.contains("open")) closeCv();
});

function pause(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function typeText(element, text, speed) {
    element.textContent = "";
    for (const letter of text) {
        element.textContent += letter;
        await pause(speed);
    }
}

const headlineParts = Array.from(document.querySelectorAll("[data-type-delay]"), (element) => ({
    element,
    text: element.textContent,
    delay: Number(element.dataset.typeDelay)
}));

headlineParts.forEach(({ element }) => {
    element.textContent = "";
});

headlineParts.forEach(({ element, text, delay }) => {
    setTimeout(() => typeText(element, text, 65), delay);
});

const roleText = document.getElementById("role-text");
const roles = ["Software Developer", "Student", "Gamer", "Streamer"];
roleText.textContent = "";

async function cycleRoles() {
    await pause(2000);
    while (true) {
        for (const role of roles) {
            await typeText(roleText, role, 75);
            await pause(1700);
            while (roleText.textContent.length > 0) {
                roleText.textContent = roleText.textContent.slice(0, -1);
                await pause(35);
            }
            await pause(250);
        }
    }
}

cycleRoles();

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
    });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));
