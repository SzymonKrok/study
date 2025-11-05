# 🎓 E-Dziennik API

Kompletny backend dla systemu e-dziennika szkolnego zbudowany w NestJS.

## 📋 Spis Treści

- [Technologie](#technologie)
- [Instalacja i Uruchomienie](#instalacja-i-uruchomienie)
- [Struktura Projektu](#struktura-projektu)
- [Moduły API](#moduły-api)
- [Autentykacja](#autentykacja)
- [Role i Uprawnienia](#role-i-uprawnienia)
- [Swagger Dokumentacja](#swagger-dokumentacja)
- [Zmienne Środowiskowe](#zmienne-środowiskowe)

## 🛠 Technologie

- **NestJS** - Framework Node.js
- **Prisma** - ORM
- **PostgreSQL** - Baza danych (via Supabase)
- **JWT** - Autentykacja
- **Passport** - Strategie autentykacji
- **Swagger** - Dokumentacja API
- **class-validator** - Walidacja DTO
- **bcrypt** - Hashowanie haseł
- **Multer** - Upload plików

## 🚀 Instalacja i Uruchomienie

### Wymagania

- Node.js >= 18
- pnpm
- PostgreSQL database (Supabase)

### Kroki instalacji

```bash
# 1. Przejdź do folderu API
cd apps/api

# 2. Zainstaluj zależności (jeśli jeszcze nie zainstalowane)
pnpm install

# 3. Skonfiguruj zmienne środowiskowe
# Skopiuj .env.example do .env i uzupełnij wartości
cp .env.example .env

# 4. Wygeneruj Prisma Client
pnpm prisma generate

# 5. Wypełnij bazę danymi testowymi (opcjonalnie)
cd ../../packages/database
pnpm db:seed

# 6. Wróć do API i uruchom serwer
cd ../../apps/api
pnpm dev
```

Serwer uruchomi się na `http://localhost:3001`

Swagger dokumentacja dostępna na: `http://localhost:3001/api/docs`

## 📁 Struktura Projektu

```
src/
├── auth/                    # Moduł autentykacji
│   ├── dto/                # DTOs (Login, Register, Refresh)
│   ├── strategies/         # Passport strategies (JWT)
│   ├── guards/             # Guards (JWT, Roles)
│   └── decorators/         # Custom decorators
├── students/               # Moduł uczniów
├── teachers/               # Moduł nauczycieli
├── classes/                # Moduł klas
├── grades/                 # Moduł ocen
├── attendance/             # Moduł frekwencji
├── schedule/               # Moduł planu lekcji
├── events/                 # Moduł wydarzeń
├── homework/               # Moduł zadań domowych
├── prisma/                 # Prisma service & module
├── common/                 # Współdzielone elementy
│   ├── filters/           # Exception filters
│   └── interceptors/      # Interceptory (Logging, Transform)
├── app.module.ts          # Root module
└── main.ts                # Entry point
```

## 🔌 Moduły API

### 1. **Auth Module** (`/auth`)

Zarządzanie autentykacją i autoryzacją.

**Endpointy:**
- `POST /auth/register` - Rejestracja nowego użytkownika
- `POST /auth/login` - Logowanie
- `POST /auth/refresh` - Odświeżanie tokenu
- `GET /auth/profile` - Profil zalogowanego użytkownika

### 2. **Students Module** (`/students`)

Zarządzanie uczniami.

**Endpointy:**
- `GET /students` - Lista uczniów (z paginacją i filtrowaniem)
- `GET /students/:id` - Szczegóły ucznia
- `POST /students` - Dodaj ucznia (ADMIN)
- `PATCH /students/:id` - Aktualizuj ucznia (ADMIN, TEACHER)
- `DELETE /students/:id` - Usuń ucznia - soft delete (ADMIN)
- `GET /students/:id/grades` - Oceny ucznia
- `GET /students/:id/attendance` - Frekwencja ucznia

**Role-Based Access:**
- **STUDENT** - widzi tylko swoje dane
- **PARENT** - widzi dane swoich dzieci
- **TEACHER** - widzi uczniów ze swoich klas
- **ADMIN** - pełny dostęp

### 3. **Teachers Module** (`/teachers`)

Zarządzanie nauczycielami.

**Endpointy:**
- `GET /teachers` - Lista nauczycieli
- `GET /teachers/:id` - Szczegóły nauczyciela
- `DELETE /teachers/:id` - Usuń nauczyciela (ADMIN)

### 4. **Classes Module** (`/classes`)

Zarządzanie klasami.

**Endpointy:**
- `GET /classes` - Lista klas
- `GET /classes/:id` - Szczegóły klasy z uczniami
- `GET /classes/:id/students` - Uczniowie klasy

### 5. **Grades Module** (`/grades`)

Zarządzanie ocenami.

**Endpointy:**
- `POST /grades` - Dodaj ocenę (ADMIN, TEACHER)
- `GET /grades` - Lista ocen (filtrowanie: studentId, subjectId)
- `DELETE /grades/:id` - Usuń ocenę (ADMIN, TEACHER - tylko własne)

**Funkcje:**
- Walidacja ocen (1-6)
- Wagi ocen
- Kategorie ocen
- Typy ocen (PARTIAL, SEMESTER, FINAL, BEHAVIOR)
- Role-based filtering

### 6. **Attendance Module** (`/attendance`)

Zarządzanie frekwencją.

**Endpointy:**
- `POST /attendance` - Dodaj obecność (ADMIN, TEACHER)
- `GET /attendance` - Lista obecności (filtrowanie: studentId, date)
- `GET /attendance/stats/:studentId` - Statystyki frekwencji ucznia

**Statusy obecności:**
- PRESENT - Obecny
- ABSENT_EXCUSED - Nieobecny usprawiedliwiony
- ABSENT_UNEXCUSED - Nieobecny nieusprawiedliwiony
- LATE - Spóźniony
- EXCUSED - Zwolniony

### 7. **Schedule Module** (`/schedule`)

Plan lekcji.

**Endpointy:**
- `GET /schedule` - Plan lekcji (role-based)
- `GET /schedule/class/:classId` - Plan lekcji dla klasy

**Funkcje:**
- Automatyczne filtrowanie na podstawie roli
- Student widzi plan swojej klasy
- Nauczyciel widzi swoje lekcje

### 8. **Events Module** (`/events`)

Wydarzenia szkolne.

**Endpointy:**
- `GET /events` - Lista wydarzeń (filtrowanie: type)
- `GET /events/upcoming` - Nadchodzące wydarzenia

**Typy wydarzeń:**
- SCHOOL_WIDE - Ogólnoszkolne (wszyscy)
- CLASS - Klasowe (konkretna klasa)
- INDIVIDUAL - Indywidualne (konkretny uczeń)

### 9. **Homework Module** (`/homework`)

Zadania domowe z obsługą plików.

**Endpointy:**
- `POST /homework` - Dodaj zadanie (ADMIN, TEACHER)
- `GET /homework` - Lista zadań (filtrowanie: classId)
- `GET /homework/:id` - Szczegóły zadania
- `POST /homework/:id/submit` - Wyślij rozwiązanie (STUDENT) + upload pliku
- `GET /homework/:id/submissions` - Lista rozwiązań (ADMIN, TEACHER)

**Funkcje:**
- Upload plików (Multer)
- Limit rozmiaru pliku: 10MB
- Przechowywanie w folderze `/uploads`

## 🔐 Autentykacja

### JWT Authentication

API używa JWT Bearer tokens do autentykacji.

**Flow:**
1. `POST /auth/login` - Otrzymasz `access_token` i `refresh_token`
2. Dołącz `access_token` do każdego requestu w headerze:
   ```
   Authorization: Bearer <access_token>
   ```
3. Gdy `access_token` wygaśnie, użyj `refresh_token`:
   ```
   POST /auth/refresh
   Body: { "refresh_token": "<refresh_token>" }
   ```

**Ważność tokenów:**
- Access Token: 1 godzina
- Refresh Token: 7 dni

## 👥 Role i Uprawnienia

System obsługuje 4 role użytkowników:

### ADMIN
- Pełny dostęp do wszystkich zasobów
- Może dodawać/edytować/usuwać użytkowników
- Zarządzanie całym systemem

### TEACHER
- Widzi uczniów ze swoich klas
- Może dodawać oceny i obecności
- Może dodawać zadania domowe
- Może przeglądać rozwiązania zadań

### STUDENT
- Widzi tylko swoje dane
- Może przeglądać swoje oceny, frekwencję, plan lekcji
- Może wysyłać rozwiązania zadań domowych

### PARENT
- Widzi dane swoich dzieci
- Dostęp tylko do informacji o swoich dzieciach

## 📚 Swagger Dokumentacja

Pełna interaktywna dokumentacja API dostępna pod:

```
http://localhost:3001/api/docs
```

**Funkcje:**
- Opis wszystkich endpointów
- Schematy request/response
- Try it out - testowanie API bezpośrednio z przeglądarki
- Autoryzacja JWT
- Tagowanie według modułów

**Jak używać:**
1. Zaloguj się przez endpoint `/auth/login`
2. Skopiuj `access_token` z odpowiedzi
3. Kliknij przycisk "Authorize" w prawym górnym rogu
4. Wklej token w formacie: `Bearer <token>`
5. Możesz teraz testować wszystkie chronione endpointy

## 🔧 Zmienne Środowiskowe

Utwórz plik `.env` w głównym katalogu projektu:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"

# Server
PORT=3001
NODE_ENV=development

# Frontend (dla CORS)
FRONTEND_URL="http://localhost:3000"
```

## 🛡️ Error Handling

API używa globalnych filtrów do obsługi błędów:

**Standardowy format błędu:**
```json
{
  "statusCode": 400,
  "timestamp": "2025-11-05T12:00:00.000Z",
  "message": ["Szczegółowy opis błędu"],
  "error": "BadRequestException"
}
```

**Typy błędów:**
- `400` - Bad Request (walidacja)
- `401` - Unauthorized (brak tokenu)
- `403` - Forbidden (brak uprawnień)
- `404` - Not Found
- `500` - Internal Server Error

## 📦 Response Format

Wszystkie odpowiedzi są transformowane do standardowego formatu:

**Sukces:**
```json
{
  "success": true,
  "data": { /* dane */ },
  "timestamp": "2025-11-05T12:00:00.000Z"
}
```

## 🔍 Logowanie

API automatycznie loguje wszystkie requesty:

```
→ GET /students 12:00:00
← GET /students 250ms
✖ POST /grades 400ms - Validation failed
```

## 📊 Paginacja

Endpointy listowe obsługują paginację:

**Query params:**
- `page` - numer strony (default: 1)
- `limit` - liczba wyników (default: 20)

**Response:**
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## 🔒 Soft Deletes

Wszystkie usunięcia są soft delete (logiczne):
- Rekordy nie są fizycznie usuwane
- Dodawane jest pole `deletedAt`
- Nie pojawiają się w zapytaniach

## 🚀 Deployment

### Build dla produkcji

```bash
pnpm build
```

### Uruchomienie w trybie produkcyjnym

```bash
pnpm start:prod
```

### Uwagi dla produkcji

1. **Zmień JWT secrets** w `.env`
2. **Skonfiguruj upload plików** - użyj AWS S3 / Cloudinary zamiast lokalnego storage
3. **Ustaw CORS** na właściwy URL frontenda
4. **Użyj reverse proxy** (nginx)
5. **Monitoruj logi** i błędy

## 🧪 Testowanie API

### Przez Swagger UI
Najłatwiejszy sposób - `http://localhost:3001/api/docs`

### Przez cURL

```bash
# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Pobierz uczniów
curl -X GET http://localhost:3001/students \
  -H "Authorization: Bearer <your_token>"
```

### Przez Postman/Insomnia
Importuj kolekcję ze Swagger JSON

## 📞 Wsparcie

W razie problemów:
1. Sprawdź logi serwera
2. Sprawdź dokumentację Swagger
3. Sprawdź konfigurację `.env`
4. Sprawdź połączenie z bazą danych

---

**Zbudowane z ❤️ przy użyciu NestJS**
