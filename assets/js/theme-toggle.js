/* ---------------------------
   THEME TOGGLE
----------------------------*/
const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

function updateIcon(theme) {
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

root.setAttribute("data-theme", initialTheme);
updateIcon(initialTheme);

toggleBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon(next);
});

/* ---------------------------
   SCROLL ANIMATIONS
----------------------------*/
const sections = document.querySelectorAll("section");

function handleScroll() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", handleScroll);
handleScroll();