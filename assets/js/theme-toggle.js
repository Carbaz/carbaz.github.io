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
   SCROLL ANIMATIONS (Optimized)
----------------------------*/
const sections = document.querySelectorAll("section");

let scrollTimeout;

function handleScrollOptimized() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.classList.add("visible");
            }
        });
    }, 100); // Debounce scroll events to improve performance
}

window.addEventListener("scroll", handleScrollOptimized);
handleScrollOptimized();