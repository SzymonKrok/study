# 🚀 Backend E-Dziennik - Kompletny Przewodnik

## ✅ Co zostało zaimplementowane

### 1. **Autentykacja i Autoryzacja** ✨
- ✅ JWT Authentication (Access + Refresh tokens)
- ✅ Passport.js strategy
- ✅ Role-Based Access Control (RBAC)
- ✅ Password hashing (bcrypt)
- ✅ Guards i Decorators

**Role:**
- `ADMIN` - pełny dostęp
- `TEACHER` - zarządzanie ocenami, obecnościami, zadaniami
- `STUDENT` - dostęp do swoich danych
- `PARENT` - dostęp do danych swoich dzieci

### 2. **Moduły Funkcjonalne** 📦

#### Students Module
- ✅ CRUD operations z role-based access
- ✅ Paginacja i filtrowanie
- ✅ Endpoint dla ocen ucznia
- ✅ Endpoint dla frekwencji ucznia
- ✅ Automatyczne generowanie numeru studenta

#### Teachers Module
- ✅ Lista nauczycieli z przedmiotami
- ✅ Szczegóły nauczyciela z klasami
- ✅ Wsparcie dla dyrektora (isDirector flag)

#### Classes Module
- ✅ Lista klas z licznikiem uczniów
- ✅ Szczegóły klasy z uczniami i przedmiotami
- ✅ Endpoint dla uczniów klasy

#### Grades Module
- ✅ Dodawanie ocen (TEACHER, ADMIN)
- ✅ Kategorie ocen (z wagami)
- ✅ Typy ocen (PARTIAL, SEMESTER, FINAL, BEHAVIOR)
- ✅ Filtrowanie po uczniu i przedmiocie
- ✅ Role-based filtering

#### Attendance Module
- ✅ Dodawanie obecności (TEACHER, ADMIN)
- ✅ 5 statusów (PRESENT, ABSENT_EXCUSED, ABSENT_UNEXCUSED, LATE, EXCUSED)
- ✅ Statystyki frekwencji ucznia
- ✅ Filtrowanie po dacie i uczniu

#### Schedule Module
- ✅ Plan lekcji dla klas
- ✅ Plan lekcji dla nauczycieli
- ✅ Automatyczne filtrowanie na podstawie roli
- ✅ Dni tygodnia i godziny

#### Events Module
- ✅ Wydarzenia ogólnoszkolne, klasowe i indywidualne
- ✅ Nadchodzące wydarzenia
- ✅ Role-based visibility

#### Homework Module
- ✅ Dodawanie zadań domowych (TEACHER, ADMIN)
- ✅ **Upload plików** (Multer, 10MB limit)
- ✅ Wysyłanie rozwiązań przez uczniów
- ✅ Lista rozwiązań dla nauczycieli
- ✅ Termin wykonania zadania

### 3. **Infrastruktura** 🔧

#### Error Handling
- ✅ Global Exception Filter
- ✅ Standardowy format błędów
- ✅ HTTP status codes
- ✅ Prisma error handling

#### Logging
- ✅ Request/Response logging interceptor
- ✅ Czas wykonania requestów
- ✅ Error logging

#### Response Transformation
- ✅ Standardowy format odpowiedzi
- ✅ `{ success, data, timestamp }`

#### Validation
- ✅ class-validator DTOs
- ✅ Automatyczna walidacja wszystkich inputów
- ✅ Type transformation

#### Swagger Documentation
- ✅ Pełna interaktywna dokumentacja
- ✅ Wszystkie endpointy udokumentowane
- ✅ Bearer Auth support
- ✅ Try it out functionality
- ✅ Dostępna pod `/api/docs`

### 4. **Baza Danych** 🗄️
- ✅ Prisma ORM
- ✅ PostgreSQL (Supabase)
- ✅ 20 modeli
- ✅ Relacje (1:1, 1:N, N:M)
- ✅ Soft deletes
- ✅ Indexes dla wydajności
- ✅ Seed data (testowe dane)

### 5. **Security** 🔒
- ✅ JWT secret configuration
- ✅ Password hashing
- ✅ CORS configuration
- ✅ Role guards
- ✅ Request validation

---

## 📊 Statystyki

- **Liczba modułów:** 9 (Auth + 8 funkcjonalnych)
- **Liczba endpointów:** ~50+
- **Liczba modeli w bazie:** 20
- **Wspierane role:** 4
- **Typy ocen:** 4
- **Statusy obecności:** 5
- **Typy wydarzeń:** 3

---

## 🚀 Szybki Start

### 1. Instalacja

```bash
# Z głównego katalogu projektu
pnpm install

# Lub tylko dla API
cd apps/api
pnpm install
```

### 2. Konfiguracja

Utwórz plik `.env` w głównym katalogu projektu:

```env
# Database (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database"

# JWT Secrets (ZMIEŃ W PRODUKCJI!)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-chars"

# Server
PORT=3001
NODE_ENV=development

# Frontend (CORS)
FRONTEND_URL="http://localhost:3000"
```

### 3. Migracja bazy danych

```bash
cd packages/database

# Zastosuj schemat (development)
pnpm db:push

# Lub stwórz migrację (production)
pnpm db:migrate

# Wypełnij danymi testowymi
pnpm db:seed
```

### 4. Uruchomienie

```bash
cd apps/api

# Development
pnpm dev

# Production build
pnpm build
pnpm start:prod
```

**Backend dostępny na:** `http://localhost:3001`  
**Swagger dokumentacja:** `http://localhost:3001/api/docs`

---

## 📚 Dokumentacja

- **`README.md`** - Główna dokumentacja backendu
- **`ENDPOINTS.md`** - Szczegółowe przykłady użycia API
- **`packages/database/DATABASE.md`** - Dokumentacja bazy danych
- **Swagger UI** - Interaktywna dokumentacja (http://localhost:3001/api/docs)

---

## 🧪 Testowanie

### Przez Swagger UI (Zalecane)
1. Otwórz `http://localhost:3001/api/docs`
2. Użyj `/auth/login` z danymi z seed:
   - Admin: `admin` / `admin123`
   - Nauczyciel: `anna.nowak` / `password123`
   - Uczeń: `jan.kowalski` / `password123`
3. Skopiuj `access_token`
4. Kliknij "Authorize" i wklej token
5. Testuj endpointy

### Przez cURL

```bash
# 1. Login
TOKEN=$(curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  | jq -r '.data.access_token')

# 2. Użyj tokenu
curl -X GET http://localhost:3001/students \
  -H "Authorization: Bearer $TOKEN"
```

### Przykładowe dane testowe (z seed)

**Admin:**
- Username: `admin`
- Password: `admin123`

**Nauczyciele:**
- Username: `anna.nowak`, `piotr.wisniewski`, `katarzyna.kowalska`
- Password: `password123`

**Uczniowie:**
- Username: `jan.kowalski`, `maria.nowak`, `tomasz.zielinski`, itd.
- Password: `password123`

**Rodzice:**
- Username: `maria.kowalska`, `andrzej.kowalski`, itd.
- Password: `password123`

---

## 🔐 Przykładowy Flow

### 1. Zaloguj się jako Admin
```bash
POST /auth/login
{
  "username": "admin",
  "password": "admin123"
}
```

### 2. Pobierz listę uczniów
```bash
GET /students?page=1&limit=20
Authorization: Bearer <token>
```

### 3. Dodaj ocenę (jako nauczyciel)
```bash
POST /grades
Authorization: Bearer <teacher_token>
{
  "value": 5,
  "weight": 3,
  "semester": 1,
  "type": "PARTIAL",
  "studentId": "xxx",
  "subjectId": "xxx",
  "description": "Sprawdzian"
}
```

### 4. Sprawdź frekwencję ucznia
```bash
GET /attendance/stats/:studentId
Authorization: Bearer <token>
```

---

## 📂 Struktura Projektu

```
apps/api/
├── src/
│   ├── auth/                 # Autentykacja i autoryzacja
│   │   ├── dto/             # Login, Register DTOs
│   │   ├── strategies/      # JWT Strategy
│   │   ├── guards/          # JwtAuthGuard, RolesGuard
│   │   └── decorators/      # @CurrentUser, @Roles, @Public
│   ├── students/            # Moduł uczniów
│   ├── teachers/            # Moduł nauczycieli
│   ├── classes/             # Moduł klas
│   ├── grades/              # Moduł ocen
│   ├── attendance/          # Moduł frekwencji
│   ├── schedule/            # Moduł planu lekcji
│   ├── events/              # Moduł wydarzeń
│   ├── homework/            # Moduł zadań domowych + upload plików
│   ├── prisma/              # Prisma Service & Module
│   ├── common/              # Współdzielone
│   │   ├── filters/        # Exception filters
│   │   └── interceptors/   # Logging, Transform
│   ├── app.module.ts       # Root module
│   └── main.ts             # Entry point + Swagger
├── dist/                    # Compiled files
├── uploads/                 # Uploaded files (homework)
├── README.md               # Główna dokumentacja
├── ENDPOINTS.md            # Przykłady użycia API
└── package.json
```

---

## 🌟 Najlepsze Praktyki Zastosowane

✅ **Clean Architecture** - separacja warstw  
✅ **DTOs** - walidacja inputów  
✅ **Dependency Injection** - NestJS DI  
✅ **Error Handling** - globalne filtry  
✅ **Logging** - interceptory  
✅ **Security** - JWT, RBAC, password hashing  
✅ **Documentation** - Swagger  
✅ **Type Safety** - TypeScript + Prisma  
✅ **Soft Deletes** - data retention  
✅ **Indexing** - database performance  

---

## 🎯 Gotowe do Produkcji?

### Checklist przed deploymentem:

- [ ] Zmień JWT secrets na silne losowe klucze
- [ ] Ustaw `NODE_ENV=production`
- [ ] Skonfiguruj upload plików na S3/Cloudinary
- [ ] Ustaw właściwy FRONTEND_URL dla CORS
- [ ] Skonfiguruj reverse proxy (nginx)
- [ ] Dodaj rate limiting
- [ ] Skonfiguruj monitoring (Sentry, LogRocket)
- [ ] Backup bazy danych
- [ ] SSL/TLS dla HTTPS
- [ ] Environment variables z zewnętrznego źródła (nie .env)

---

## 🆘 Częste Problemy

### 1. "Unauthorized" przy każdym requeście
✅ Sprawdź czy token jest w headerze: `Authorization: Bearer <token>`  
✅ Sprawdź czy token nie wygasł (1h ważności)

### 2. "Forbidden - Insufficient permissions"
✅ Sprawdź swoją rolę w tokenie  
✅ Niektóre endpointy wymagają ADMIN lub TEACHER

### 3. "Student not found"
✅ Użyj poprawnego ID z bazy (cuid format)  
✅ Sprawdź czy rekord nie został soft deleted

### 4. Build errors
✅ Uruchom `pnpm prisma generate` po zmianach w schema  
✅ Sprawdź czy wszystkie dependencies są zainstalowane

---

## 📞 Kontakt i Wsparcie

- 📖 Dokumentacja Swagger: `http://localhost:3001/api/docs`
- 📄 README: `/apps/api/README.md`
- 📋 Endpoints: `/apps/api/ENDPOINTS.md`
- 🗄️ Database docs: `/packages/database/DATABASE.md`

---

**Backend jest w pełni gotowy i funkcjonalny! 🎉**

Możesz teraz:
1. ✅ Testować wszystkie endpointy przez Swagger
2. ✅ Integrować z frontendem (Next.js)
3. ✅ Rozwijać dalej według potrzeb
4. ✅ Deployować na serwer produkcyjny

**Happy Coding! 🚀**

