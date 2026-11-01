"use strict";

(function () {
    const button = document.getElementById("themeToggle");
    const STORAGE_KEY = "theme";

    function setTheme(theme) {
        const dark = theme === "dark";
        document.documentElement.dataset.theme = dark ? "dark" : "light";
        if (button) {
            button.setAttribute("aria-pressed", String(dark));
            button.setAttribute("aria-label", dark ? "Włącz tryb jasny" : "Włącz tryb ciemny");
        }
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // localStorage niedostępny, motyw zadziała tylko do końca sesji
        }
    }

    setTheme(document.documentElement.dataset.theme);

    if (button) {
        button.addEventListener("click", () => {
            setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
        });
    }
})();
