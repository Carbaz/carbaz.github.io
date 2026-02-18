/* ---------------------------
   LOCALES LOADING
----------------------------*/
const langButtons = document.querySelectorAll(".lang-switch button");
const savedLang = localStorage.getItem("lang") || "en";

function loadLanguage(lang) {
    fetch(`assets/locales/${lang}.json`)
        .then(res => res.json())
        .then(dict => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                const parts = key.split(".");
                let value = dict;

                parts.forEach(p => value = value?.[p]);

                if (value) el.textContent = value;
            });
        });

    localStorage.setItem("lang", lang);

    langButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.lang === lang)
    );
}

loadLanguage(savedLang);

langButtons.forEach(btn => {
    btn.addEventListener("click", () => loadLanguage(btn.dataset.lang));
});