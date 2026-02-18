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
   SCROLL ANIMATIONS (Optimized with IntersectionObserver)
----------------------------*/
const sections = document.querySelectorAll("section");

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -100px 0px",
            threshold: 0
        };

        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        sections.forEach(section => observer.observe(section));
    } else {
        // Fallback for browsers without IntersectionObserver support.
        let ticking = false;

        function handleScroll() {
            if (ticking) {
                return;
            }
            ticking = true;
            window.requestAnimationFrame(() => {
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 100) {
                        section.classList.add("visible");
                    }
                });
                ticking = false;
            });
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
    }
} else {
    // If user prefers reduced motion, make all sections visible immediately
    sections.forEach(section => section.classList.add("visible"));
}