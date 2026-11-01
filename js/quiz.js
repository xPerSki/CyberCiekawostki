"use strict";

(function () {
  const panel = document.getElementById("quizPanel");
  const QUESTION_COUNT = 5;
  if (!panel || typeof QUIZ === "undefined" || QUIZ.length < QUESTION_COUNT) return;

  const SVG_NS = "http://www.w3.org/2000/svg";
  const CIRCLE_LENGTH = 326.7; // obwód koła o promieniu 52

  let picked = [];
  let current = 0;
  let score = 0;
  let summary = [];

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function create(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function createSvg(tag, className) {
    const el = document.createElementNS(SVG_NS, tag);
    if (className) el.setAttribute("class", className);
    return el;
  }

  function render(screen) {
    panel.textContent = "";
    panel.appendChild(screen);
  }

  function showStart() {
    const screen = create("div", "screen quiz-start");
    screen.appendChild(create("h3", "", "Sprawdź, co udało ci się zapamiętać"));
    screen.appendChild(create("p", "quiz-desc", "Quiz ma pięć losowych pytań z puli dwunastu. Przy każdym wybierasz jedną odpowiedź, a na końcu zobaczysz wynik."));

    const startBtn = create("button", "btn btn-big", "Zacznij quiz");
    startBtn.type = "button";
    startBtn.id = "quizStart";
    startBtn.addEventListener("click", startQuiz);
    screen.appendChild(startBtn);

    // screen.appendChild(create("p", "quiz-note", "Za błędne odpowiedzi nie ma kar."));
    render(screen);
  }

  function startQuiz() {
    picked = shuffle(QUIZ.map((_, i) => i)).slice(0, QUESTION_COUNT);
    current = 0;
    score = 0;
    summary = [];
    showQuestion();
  }

  function createDots() {
    const dots = create("div", "dots");
    dots.setAttribute("aria-hidden", "true");
    for (let i = 0; i < QUESTION_COUNT; i++) {
      const dot = create("span", "dot");
      if (i < current) dot.classList.add("done");
      if (i === current) dot.classList.add("active");
      dots.appendChild(dot);
    }
    return dots;
  }

  function showQuestion() {
    const item = QUIZ[picked[current]];

    const progress = create("div", "quiz-progress");
    progress.appendChild(create("p", "label", "Pytanie " + (current + 1) + " z " + QUESTION_COUNT));
    progress.appendChild(createDots());

    const title = create("h3", "quiz-question", item.question);

    const form = create("form", "quiz-options");
    form.setAttribute("aria-label", "Odpowiedzi do pytania");
    item.answers.forEach((answerText, index) => {
      const label = create("label", "option");
      const input = create("input");
      input.type = "radio";
      input.name = "answer";
      input.value = String(index);
      label.appendChild(input);
      label.appendChild(create("span", "", answerText));
      form.appendChild(label);
    });

    const footer = create("div", "quiz-footer");
    const hint = create("p", "quiz-hint", "Wybierz odpowiedź, żeby przejść dalej.");
    const isLast = current === QUESTION_COUNT - 1;
    const nextBtn = create("button", "btn", isLast ? "Pokaż wynik" : "Następne pytanie");
    nextBtn.type = "button";
    nextBtn.id = "quizNext";
    nextBtn.disabled = true;

    form.addEventListener("change", () => {
      nextBtn.disabled = false;
      hint.classList.remove("error");
      hint.textContent = "Możesz jeszcze zmienić odpowiedź.";
    });

    nextBtn.addEventListener("click", () => {
      const selected = form.querySelector("input[name='answer']:checked");
      if (!selected) {
        hint.classList.add("error");
        hint.textContent = "Najpierw zaznacz jedną odpowiedź.";
        return;
      }
      const isCorrect = Number(selected.value) === item.correct;
      if (isCorrect) score += 1;
      summary.push({ text: item.question, correct: isCorrect });
      current += 1;
      if (current < QUESTION_COUNT) showQuestion(); else showResult();
    });

    footer.appendChild(hint);
    footer.appendChild(nextBtn);

    const screen = create("div", "screen");
    screen.appendChild(progress);
    screen.appendChild(title);
    screen.appendChild(form);
    screen.appendChild(footer);
    render(screen);
  }

  function getMessage(points) {
    if (points === QUESTION_COUNT) return "Świetnie, wszystkie odpowiedzi są poprawne.";
    if (points === QUESTION_COUNT - 1) return "Bardzo dobrze, zabrakło tylko jednej odpowiedzi.";
    if (points >= 3) return "Całkiem dobrze. Powtórz fiszki i spróbuj jeszcze raz.";
    if (points >= 1) return "Na początek nieźle. Zajrzyj do fiszek i spróbuj ponownie.";
    return "Tym razem się nie udało. Przejrzyj fiszki i spróbuj jeszcze raz.";
  }

  function showResult() {
    const screen = create("div", "screen result-screen");

    const wrap = create("div", "circle-wrap");
    const svg = createSvg("svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Wynik: " + score + " z " + QUESTION_COUNT);

    const background = createSvg("circle", "circle-bg");
    const value = createSvg("circle", "circle-value");
    [background, value].forEach((circle) => {
      circle.setAttribute("cx", "60");
      circle.setAttribute("cy", "60");
      circle.setAttribute("r", "52");
      svg.appendChild(circle);
    });

    wrap.appendChild(svg);
    wrap.appendChild(create("div", "circle-text", score + "/" + QUESTION_COUNT));

    screen.appendChild(wrap);
    screen.appendChild(create("p", "result-msg", getMessage(score)));

    const list = create("ul", "summary");
    list.setAttribute("aria-label", "Podsumowanie odpowiedzi");
    summary.forEach((entry) => {
      const row = create("li", entry.correct ? "correct" : "wrong");
      row.appendChild(create("span", "result-mark", entry.correct ? "Dobrze:" : "Źle:"));
      row.appendChild(create("span", "", entry.text));
      list.appendChild(row);
    });
    screen.appendChild(list);

    const again = create("button", "btn btn-big btn-secondary", "Zagraj ponownie");
    again.type = "button";
    again.addEventListener("click", startQuiz);
    screen.appendChild(again);

    render(screen);

    requestAnimationFrame(() => {
      value.style.strokeDashoffset = String(CIRCLE_LENGTH * (1 - score / QUESTION_COUNT));
    });
  }

  showStart();
})();
