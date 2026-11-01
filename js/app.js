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

(function () {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("mainMenu");
    if (!hamburger || !menu) return;

    function closeMenu() {
        menu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Otwórz menu");
    }

    hamburger.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", String(isOpen));
        hamburger.setAttribute("aria-label", isOpen ? "Zamknij menu" : "Otwórz menu");
    });

    menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
})();

(function () {
    const button = document.getElementById("toTop");
    if (!button) return;

    window.addEventListener("scroll", () => {
        button.classList.toggle("visible", window.scrollY > 340);
    }, { passive: true });

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();

(function () {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window) || reducedMotion) {
        items.forEach((item) => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
})();

(function () {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
})();

(function () {
    const card = document.getElementById("flashcard");
    const categoryEl = document.getElementById("flashcardCategory");
    const questionEl = document.getElementById("flashcardQuestion");
    const answerEl = document.getElementById("flashcardAnswer");
    const counterEl = document.getElementById("flashcardCounter");
    const prevBtn = document.getElementById("flashcardPrev");
    const nextBtn = document.getElementById("flashcardNext");
    const shuffleBtn = document.getElementById("flashcardShuffle");
    const flipBtn = document.getElementById("flashcardFlip");

    if (!card || typeof FLASHCARDS === "undefined" || !FLASHCARDS.length) return;

    const CATEGORY_COLORS = {
        "Hasła": "var(--pastel-lavender)",
        "Bezpieczeństwo": "var(--pastel-blue)",
        "Kryptografia": "var(--pastel-mint)",
        "Historia": "var(--pastel-amber)"
    };

    const order = FLASHCARDS.map((_, i) => i);
    let position = 0;
    let flipped = false;

    function shuffleOrder() {
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
    }

    function show() {
        const current = FLASHCARDS[order[position]];
        categoryEl.textContent = current.category;
        questionEl.textContent = current.question;
        answerEl.textContent = current.answer;
        categoryEl.style.background = CATEGORY_COLORS[current.category] || "var(--pastel-pink)";
        counterEl.textContent = "Fiszka " + (position + 1) + " z " + order.length;
        flipped = false;
        card.classList.remove("flipped");
    }

    function move(step) {
        position = (position + step + order.length) % order.length;
        show();
    }

    function flip() {
        flipped = !flipped;
        card.classList.toggle("flipped", flipped);
    }

    card.addEventListener("click", flip);
    flipBtn.addEventListener("click", flip);
    nextBtn.addEventListener("click", () => move(1));
    prevBtn.addEventListener("click", () => move(-1));

    shuffleBtn.addEventListener("click", () => {
        shuffleOrder();
        position = 0;
        show();
    });

    shuffleOrder();
    show();
})();
