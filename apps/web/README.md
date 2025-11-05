# E-Dziennik - Aplikacja Webowa

Nowoczesny system zarządzania szkołą z czystym, minimalistycznym designem.

## 🚀 Uruchomienie

```bash
# Instalacja zależności
pnpm install

# Uruchomienie serwera deweloperskiego
pnpm dev

# Build produkcyjny
pnpm build

# Uruchomienie produkcyjne
pnpm start
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

## 📁 Struktura

```
apps/web/
├── app/
│   ├── (dashboard)/          # Grupa tras dla dashboard
│   │   ├── layout.tsx         # Layout z sidebar i header
│   │   └── dashboard/         # Strony aplikacji
│   │       ├── page.tsx       # Główny dashboard
│   │       ├── students/      # Zarządzanie uczniami
│   │       ├── teachers/      # Zarządzanie nauczycielami
│   │       ├── grades/        # System ocen
│   │       ├── calendar/      # Kalendarz wydarzeń
│   │       ├── classes/       # Zarządzanie klasami
│   │       ├── subjects/      # Zarządzanie przedmiotami
│   │       ├── attendance/    # Frekwencja
│   │       └── statistics/    # Statystyki i raporty
│   ├── globals.css            # Style globalne
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Strona główna (redirect)
├── components/
│   ├── ui/                    # Komponenty shadcn/ui
│   ├── layout/                # Komponenty layoutu
│   │   ├── app-sidebar.tsx    # Główny sidebar
│   │   └── app-header.tsx     # Header z wyszukiwarką
│   ├── page-header.tsx        # Nagłówek strony
│   └── stats-card.tsx         # Karta statystyk
└── lib/
    └── utils.ts               # Utility functions
```

## 🎨 Design System

### Kolory
- **Primary**: Fioletowy (#8B5CF6) - główny akcent aplikacji
- **Background**: Jasny szary (#FAFAFA) - czyste, minimalistyczne tło
- **Card**: Białe (#FFFFFF) - karty z subtelnym cieniem
- **Border**: Jasny szary (#E5E7EB) - delikatne separatory

### Komponenty
Aplikacja używa **shadcn/ui** - wysokiej jakości, dostępne komponenty React:
- **Sidebar**: Collapsible sidebar z nawigacją
- **Cards**: Dla sekcji z danymi
- **Tables**: Dla list uczniów, nauczycieli, ocen
- **Calendar**: Dla wydarzeń szkolnych
- **Badges**: Do statusów i kategorii
- **Avatars**: Dla profili użytkowników

### Responsywność
- **Mobile-first**: Wszystkie komponenty są w pełni responsywne
- **Sidebar**: Automatycznie collapsuje na urządzeniach mobilnych
- **Grid Layout**: Dostosowuje się do rozmiaru ekranu (1-4 kolumny)
- **Touch-friendly**: Zwiększone obszary klikalne na mobile

## 🌟 Funkcjonalności

### Dashboard
- Przegląd najważniejszych statystyk
- Ostatnia aktywność w systemie
- Nadchodzące wydarzenia
- Szybkie akcje

### Uczniowie
- Lista wszystkich uczniów z tabelą
- Filtrowanie po klasie i statusie
- Wyszukiwanie po imieniu/nazwisku
- Szczegółowe informacje kontaktowe
- Średnia ocen i frekwencja

### Nauczyciele
- Grid z kartami nauczycieli
- Informacje o przedmiotach
- Statystyki (liczba uczniów, klas, godzin)
- Kontakt

### Oceny
- Przegląd ocen wszystkich uczniów
- Filtrowanie po klasie i przedmiocie
- Trendy (wzrost/spadek)
- Najlepsze przedmioty
- Przedmioty wymagające uwagi

### Kalendarz
- Interaktywny kalendarz
- Lista wydarzeń
- Filtrowanie po dacie
- Różne typy wydarzeń (egzaminy, spotkania, wydarzenia)

### Klasy
- Grid z kartami klas
- Informacje o wychowawcy
- Statystyki klasy (średnia, frekwencja)
- Liczba uczniów i przedmiotów

### Przedmioty
- Lista wszystkich przedmiotów
- Nauczyciele prowadzący
- Statystyki (uczniowie, godziny, średnia)

### Frekwencja
- Przegląd obecności
- Kalendarz do wyboru daty
- Lista obecności na dany dzień
- Klasy wymagające uwagi
- Statystyki spóźnień i nieobecności

### Statystyki
- Kompleksowe raporty
- Wyniki według poziomów
- Najlepsi uczniowie i nauczyciele
- Ranking przedmiotów
- Trendy miesięczne

## 🛠️ Technologie

- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Komponenty UI
- **Lucide Icons** - Ikony
- **React 19** - Library UI

## 📝 Dalszy rozwój

Możliwe rozszerzenia:
- [ ] Autentykacja i autoryzacja (różne role)
- [ ] Integracja z API (backend NestJS)
- [ ] System komunikacji (wiadomości, powiadomienia)
- [ ] Eksport danych do PDF/Excel
- [ ] Wykresy i diagramy (Chart.js, Recharts)
- [ ] Dark mode
- [ ] Wielojęzyczność (i18n)
- [ ] Progressive Web App (PWA)

## 👨‍💻 Autor

Projekt stworzony jako część systemu e-dziennika.
