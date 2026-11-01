"use strict";

const FLASHCARDS = [
  {
    category: "Hasła",
    question: "Które hasło jest mocniejsze: „Kasia123!” czy „kot-rower-zupa-lampa-dom”?",
    answer: "Drugie. Im dłuższe hasło, tym trudniej je złamać, a kilka zwykłych słów łatwo zapamiętać."
  },
  {
    category: "Hasła",
    question: "Czy warto używać tego samego hasła w wielu serwisach?",
    answer: "Nie. Jeśli hasło z jednego serwisu wycieknie, ktoś może spróbować użyć tego samego na innych kontach. Każde konto powinno mieć własne hasło."
  },
  {
    category: "Hasła",
    question: "Do czego służy menedżer haseł?",
    answer: "Zapamiętuje hasła za ciebie. Musisz znać tylko jedno hasło główne, a resztę program generuje i przechowuje w zaszyfrowanej postaci."
  },
  {
    category: "Bezpieczeństwo",
    question: "Co to jest phishing?",
    answer: "Wyłudzanie danych przez podszywanie się pod kogoś zaufanego, np. bank albo firmę kurierską. Zwykle przychodzi jako e-mail lub SMS z linkiem do fałszywej strony."
  },
  {
    category: "Bezpieczeństwo",
    question: "Co to jest 2FA?",
    answer: "Logowanie dwuetapowe. Oprócz hasła potrzebny jest drugi element, np. kod z aplikacji, kod z SMS-a albo klucz sprzętowy."
  },
  {
    category: "Bezpieczeństwo",
    question: "Co robi ransomware?",
    answer: "Szyfruje pliki na komputerze i żąda okupu za ich odblokowanie. Chronią przed nim aktualizacje systemu i kopie zapasowe trzymane poza komputerem."
  },
  {
    category: "Bezpieczeństwo",
    question: "Co oznacza kłódka przy adresie strony?",
    answer: "Połączenie ze stroną jest szyfrowane (HTTPS). To nie znaczy, że strona jest uczciwa, bo fałszywe strony też mogą mieć kłódkę."
  },
  {
    category: "Bezpieczeństwo",
    question: "Co zrobić z podejrzanym SMS-em z linkiem?",
    answer: "Nie klikać. Jeśli wiadomość podaje się za bank lub urząd, wejdź na jego stronę samodzielnie, wpisując adres w przeglądarce."
  },
  {
    category: "Kryptografia",
    question: "Na czym polega szyfr Cezara?",
    answer: "Każdą literę przesuwa się o stałą liczbę miejsc w alfabecie. Przy przesunięciu o 3: A zmienia się w D, B w E, C w F."
  },
  {
    category: "Kryptografia",
    question: "Czym jest szyfrowanie?",
    answer: "Zamianą zwykłej wiadomości w nieczytelny ciąg znaków. Odczytać ją może tylko ten, kto ma właściwy klucz."
  },
  {
    category: "Historia",
    question: "Kto złamał szyfr Enigmy?",
    answer: "Polscy matematycy: Marian Rejewski, Jerzy Różycki i Henryk Zygalski. Pierwsze sukcesy mieli już w 1932 roku."
  },
  {
    category: "Historia",
    question: "Czym był wirus ILOVEYOU?",
    answer: "Robakiem z 2000 roku, który rozsyłał się e-mailem jako „list miłosny”. Po otwarciu załącznika zarażał komputer i wysyłał się dalej do kontaktów z książki adresowej."
  }
];

const QUIZ = [
  {
    question: "Czym jest phishing?",
    answers: [
      "Szyfrowaniem plików na dysku",
      "Wyłudzaniem danych przez podszywanie się pod zaufaną osobę lub firmę",
      "Tworzeniem kopii zapasowych",
      "Programem do sprawdzania haseł"
    ],
    correct: 1
  },
  {
    question: "Które hasło jest najmocniejsze?",
    answers: [
      "kasia1994",
      "123456",
      "kot-rower-zupa-lampa-dom",
      "qwerty"
    ],
    correct: 2
  },
  {
    question: "Co robi ransomware?",
    answers: [
      "Szyfruje pliki i żąda okupu za ich odblokowanie",
      "Chroni komputer przed wirusami",
      "Przyspiesza działanie systemu",
      "Blokuje reklamy w przeglądarce"
    ],
    correct: 0
  },
  {
    question: "Co oznacza kłódka przy adresie strony?",
    answers: [
      "Strona należy do banku",
      "Strona na pewno jest uczciwa",
      "Połączenie ze stroną jest szyfrowane",
      "Strona nie zbiera żadnych danych"
    ],
    correct: 2
  },
  {
    question: "Dostajesz SMS z linkiem: „Twoje konto bankowe zostało zablokowane”. Co robisz?",
    answers: [
      "Klikam od razu, żeby nie stracić dostępu",
      "Odpisuję na SMS-a",
      "Przesyłam wiadomość znajomym",
      "Nie klikam i sprawdzam konto, wpisując adres banku samodzielnie"
    ],
    correct: 3
  },
  {
    question: "Dlaczego warto używać różnych haseł do wszystkich kont?",
    answers: [
      "Bo każde konto wymaga hasła o innej długości",
      "Bo po wycieku hasła z jednego serwisu ktoś może spróbować go na innych kontach",
      "Bo serwisy sprawdzają, czy używasz tego samego hasła w innym miejscu",
      "Bo używanie różnych haseł przyspiesza logowanie"
    ],
    correct: 1
  },
  {
    question: "Jak szyfr Cezara z przesunięciem o 3 zaszyfruje literę A?",
    answers: [
      "B",
      "C",
      "D",
      "Z"
    ],
    correct: 2
  },
  {
    question: "Kto jako pierwszy złamał szyfr Enigmy?",
    answers: [
      "Polscy matematycy",
      "Włoscy inżynierowie",
      "Amerykańscy programiści",
      "Japońscy wojskowi"
    ],
    correct: 0
  },
  {
    question: "Co to jest 2FA?",
    answers: [
      "Hasło składające się z dwóch znaków",
      "Dwa konta w jednym serwisie",
      "Kopia zapasowa na dwóch dyskach",
      "Logowanie z drugim elementem, np. kodem z aplikacji"
    ],
    correct: 3
  },
  {
    question: "Do czego służy menedżer haseł?",
    answers: [
      "Do przyspieszania internetu",
      "Do bezpiecznego przechowywania i generowania haseł",
      "Do usuwania wirusów",
      "Do blokowania reklam"
    ],
    correct: 1
  },
  {
    question: "Co najlepiej chroni przed skutkami ransomware?",
    answers: [
      "Regularne kopie zapasowe trzymane poza komputerem",
      "Szybkie zapłacenie okupu",
      "Usunięcie wszystkich plików",
      "Używanie jednego hasła wszędzie"
    ],
    correct: 0
  },
  {
    question: "Co jest największym zagrożeniem w otwartej, publicznej sieci Wi-Fi?",
    answers: [
      "Internet może działać wolniej",
      "Ktoś może podsłuchiwać przesyłane dane",
      "Telefon szybciej się rozładuje",
      "Przeglądarka usunie zapisane hasła"
    ],
    correct: 1
  }
];
