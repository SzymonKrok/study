# 📊 Dokumentacja Bazy Danych E-Dziennika

## 🎯 Architektura

Baza danych została zaprojektowana zgodnie z najlepszymi praktykami:
- **PostgreSQL** - relacyjna baza danych
- **Prisma ORM** - type-safe database access
- **Soft deletes** - dane nie są usuwane fizycznie
- **Proper indexing** - dla wydajności
- **Cascade operations** - automatyczne zarządzanie relacjami

---

## 📋 Modele i Relacje

### 🔐 Authentication & Users

#### **User** (Wspólny model dla wszystkich ról)
```typescript
{
  id: string (cuid)
  username: string (unique) // Login: "jkowalski", "teacher001"
  email: string (unique)
  password: string // Zahashowane (bcrypt)
  role: Role // ADMIN | DIRECTOR | TEACHER | STUDENT | PARENT
  isActive: boolean
  lastLogin: DateTime?
  deletedAt: DateTime? // Soft delete
}
```

**Relacje:**
- One-to-one z `Student`, `Teacher`, `Parent`, lub `Admin` (zależnie od roli)

**Use case:**
- Logowanie do systemu
- Sprawdzanie uprawnień
- Śledzenie aktywności użytkownika

---

### 👥 People Models

#### **Student** (Uczeń)
```typescript
{
  id: string
  userId: string (FK -> User)
  
  // Dane osobowe
  firstName: string
  lastName: string
  pesel: string? (unique)
  dateOfBirth: DateTime
  placeOfBirth: string?
  
  // Kontakt
  phone: string?
  address: string?
  city: string?
  postalCode: string?
  
  // Szkolne
  classId: string? (FK -> Class)
  studentNumber: string (unique) // Numer w dzienniku
  enrollmentDate: DateTime
}
```

**Relacje:**
- Belongs to `User`
- Belongs to `Class`
- Has many `StudentParent` (rodzice)
- Has many `Grade` (oceny)
- Has many `Attendance` (obecności)
- Has many `Event` (indywidualne wydarzenia)
- Has many `HomeworkSubmission` (oddane prace)

**Use case:**
- Profil ucznia
- Wyświetlanie danych w tabelach
- Przypisywanie do klas
- Generowanie raportów

---

#### **Teacher** (Nauczyciel)
```typescript
{
  id: string
  userId: string (FK -> User)
  
  // Dane osobowe
  firstName: string
  lastName: string
  title: string? // "mgr", "dr", "prof."
  pesel: string? (unique)
  dateOfBirth: DateTime?
  
  // Kontakt
  phone: string
  email: string (unique)
  address: string?
  
  // Zawodowe
  employmentDate: DateTime
}
```

**Relacje:**
- Belongs to `User`
- Has many `TeacherSubject` (przedmioty które uczy)
- Has many `Class` as classTeacher (wychowawca)
- Has many `Grade` (wystawione oceny)
- Has many `Attendance` (notowane obecności)
- Has many `Schedule` (lekcje w planie)
- Has many `Homework` (zadane prace domowe)

**Use case:**
- Profil nauczyciela
- Przypisywanie do przedmiotów
- Wychowawstwo klasy
- Wystawianie ocen

---

#### **Parent** (Rodzic/Opiekun)
```typescript
{
  id: string
  userId: string (FK -> User)
  
  firstName: string
  lastName: string
  pesel: string? (unique)
  phone: string
  email: string (unique)
  address: string?
}
```

**Relacje:**
- Belongs to `User`
- Has many `StudentParent` (dzieci)

**Use case:**
- Dostęp do danych dzieci
- Kontakt ze szkołą
- Usprawiedliwianie nieobecności

---

#### **Admin** (Administrator)
```typescript
{
  id: string
  userId: string (FK -> User)
  
  firstName: string
  lastName: string
  phone: string?
  email: string (unique)
}
```

**Relacje:**
- Belongs to `User`

**Use case:**
- Zarządzanie systemem
- Pełny dostęp do danych

---

### 🏫 School Structure

#### **Class** (Klasa)
```typescript
{
  id: string
  name: string (unique) // "3A", "2B"
  level: int // 1, 2, 3
  profile: string? // "matematyczny", "humanistyczny"
  classTeacherId: string? (FK -> Teacher)
  schoolYear: string // "2024/2025"
}
```

**Relacje:**
- Has many `Student` (uczniowie w klasie)
- Belongs to `Teacher` as classTeacher (wychowawca)
- Has many `ClassSubject` (przedmioty klasy)
- Has many `Schedule` (plan lekcji)
- Has many `Event` (wydarzenia klasowe)
- Has many `Homework` (zadania dla klasy)

**Use case:**
- Organizacja uczniów
- Przypisywanie wychowawcy
- Plan lekcji dla klasy

---

#### **Subject** (Przedmiot)
```typescript
{
  id: string
  name: string (unique) // "Matematyka"
  code: string (unique) // "MAT"
  description: string?
}
```

**Relacje:**
- Has many `TeacherSubject` (nauczyciele uczący)
- Has many `ClassSubject` (klasy uczące się)
- Has many `Grade` (oceny z przedmiotu)
- Has many `Schedule` (lekcje przedmiotu)
- Has many `Homework` (zadania z przedmiotu)

**Use case:**
- Organizacja przedmiotów
- Przypisywanie nauczycieli
- Statystyki przedmiotów

---

#### **Classroom** (Sala)
```typescript
{
  id: string
  number: string (unique) // "101", "Sala gimnastyczna"
  building: string? // "Budynek A"
  capacity: int? // Liczba miejsc
}
```

**Relacje:**
- Has many `Schedule` (lekcje w sali)

**Use case:**
- Zarządzanie salami
- Rezerwacje
- Plan lekcji

---

### 📚 Academic

#### **GradeCategory** (Kategoria oceny)
```typescript
{
  id: string
  name: string (unique) // "Sprawdzian", "Kartkówka"
  code: string (unique) // "SPR", "KART"
  defaultWeight: float // 3.0 dla sprawdzianów, 1.0 dla kartkówek
  color: string? // "#FF0000" dla UI
}
```

**Relacje:**
- Has many `Grade` (oceny w kategorii)

**Use case:**
- Kategoryzacja ocen
- Automatyczne wagi
- Kolorowanie w UI

---

#### **Grade** (Ocena)
```typescript
{
  id: string
  value: float // 1.0 - 6.0 (możliwe 4.5)
  type: GradeType // PARTIAL | SEMESTER | FINAL | BEHAVIOR
  weight: float // 1.0 - 5.0
  
  studentId: string (FK)
  teacherId: string (FK)
  subjectId: string (FK)
  categoryId: string? (FK)
  
  description: string? // "Klasówka z trygonometrii"
  comment: string? // Komentarz nauczyciela
  date: DateTime
  semester: int // 1 lub 2
}
```

**Relacje:**
- Belongs to `Student`
- Belongs to `Teacher`
- Belongs to `Subject`
- Belongs to `GradeCategory`

**Use case:**
- Wystawianie ocen
- Obliczanie średnich
- Raporty i statystyki
- Historia ocen

---

#### **Schedule** (Plan lekcji)
```typescript
{
  id: string
  dayOfWeek: DayOfWeek // MONDAY - SUNDAY
  startTime: string // "08:00"
  endTime: string // "08:45"
  lessonNumber: int // 1, 2, 3...
  
  classId: string (FK)
  subjectId: string (FK)
  teacherId: string (FK)
  classroomId: string? (FK)
  
  schoolYear: string // "2024/2025"
}
```

**Unique constraint:** `[classId, dayOfWeek, lessonNumber, schoolYear]`

**Relacje:**
- Belongs to `Class`
- Belongs to `Subject`
- Belongs to `Teacher`
- Belongs to `Classroom`
- Has many `Attendance` (obecności na lekcji)

**Use case:**
- Generowanie planu lekcji
- Wyświetlanie planu dla ucznia/nauczyciela
- Notowanie obecności

---

#### **Attendance** (Obecność)
```typescript
{
  id: string
  status: AttendanceStatus
  // PRESENT | ABSENT_EXCUSED | ABSENT_UNEXCUSED | LATE | EXCUSED
  
  studentId: string (FK)
  scheduleId: string (FK)
  teacherId: string (FK)
  
  date: DateTime
  comment: string? // Powód nieobecności
  excusedBy: string? // Kto usprawiedliwił
  excusedAt: DateTime? // Kiedy
}
```

**Unique constraint:** `[studentId, scheduleId, date]`

**Relacje:**
- Belongs to `Student`
- Belongs to `Schedule` (konkretna lekcja)
- Belongs to `Teacher` (kto notował)

**Use case:**
- Notowanie obecności na każdej lekcji
- Usprawiedliwianie nieobecności
- Obliczanie frekwencji
- Raporty

---

#### **Homework** (Zadanie domowe)
```typescript
{
  id: string
  title: string
  description: string
  
  subjectId: string (FK)
  teacherId: string (FK)
  classId: string (FK)
  
  assignedDate: DateTime
  dueDate: DateTime
  attachmentUrl: string? // Link do pliku
  maxPoints: int? // Maksymalna liczba punktów
}
```

**Relacje:**
- Belongs to `Subject`
- Belongs to `Teacher`
- Belongs to `Class`
- Has many `HomeworkSubmission` (oddane prace)

**Use case:**
- Zadawanie prac domowych
- Załączanie plików (PDF, DOC)
- Określanie terminów
- Punktacja

---

#### **HomeworkSubmission** (Oddana praca)
```typescript
{
  id: string
  
  homeworkId: string (FK)
  studentId: string (FK)
  
  submittedAt: DateTime?
  content: string? // Treść (jeśli tekstowa)
  attachmentUrl: string? // Link do pliku
  
  grade: float? // Ocena
  points: int? // Punkty
  feedback: string? // Feedback od nauczyciela
  gradedAt: DateTime?
  
  isLate: boolean // Czy spóźniona
}
```

**Unique constraint:** `[homeworkId, studentId]`

**Relacje:**
- Belongs to `Homework`
- Belongs to `Student`

**Use case:**
- Oddawanie prac przez uczniów
- Ocenianie przez nauczycieli
- Śledzenie spóźnień
- Feedback

---

#### **Event** (Wydarzenie)
```typescript
{
  id: string
  title: string
  description: string?
  type: EventType // SCHOOL_WIDE | CLASS | INDIVIDUAL
  
  startDate: DateTime
  endDate: DateTime
  isAllDay: boolean
  location: string?
  
  classId: string? (FK) // Jeśli type = CLASS
  studentId: string? (FK) // Jeśli type = INDIVIDUAL
}
```

**Relacje:**
- Belongs to `Class` (opcjonalnie)
- Belongs to `Student` (opcjonalnie)

**Use case:**
- Wydarzenia szkolne (dzień otwarty)
- Wydarzenia klasowe (wycieczka)
- Indywidualne (spotkanie z pedagogiem)
- Kalendarz

---

### 🔗 Junction Tables (Many-to-Many)

#### **StudentParent** (Rodzic ↔ Uczeń)
```typescript
{
  id: string
  studentId: string (FK)
  parentId: string (FK)
  relationship: string? // "matka", "ojciec", "opiekun"
}
```

**Unique constraint:** `[studentId, parentId]`

#### **TeacherSubject** (Nauczyciel ↔ Przedmiot)
```typescript
{
  id: string
  teacherId: string (FK)
  subjectId: string (FK)
}
```

**Unique constraint:** `[teacherId, subjectId]`

#### **ClassSubject** (Klasa ↔ Przedmiot)
```typescript
{
  id: string
  classId: string (FK)
  subjectId: string (FK)
  teacherId: string? (FK) // Kto uczy w tej klasie
  hoursPerWeek: int // Liczba godzin tygodniowo
  schoolYear: string
}
```

**Unique constraint:** `[classId, subjectId, schoolYear]`

---

## 🔍 Indexy (dla wydajności)

Wszystkie często wyszukiwane pola mają indexy:
- `User`: username, email, role
- `Student`: classId, lastName+firstName, studentNumber
- `Teacher`: lastName+firstName, email
- `Grade`: studentId, teacherId, subjectId, date, semester
- `Attendance`: studentId, scheduleId, date, status
- `Schedule`: classId, teacherId, dayOfWeek
- I wiele innych...

---

## 🗑️ Soft Deletes

**Wszystkie modele** mają pole `deletedAt: DateTime?`

Dane nie są usuwane fizycznie z bazy. Zamiast tego ustawiamy `deletedAt = now()`.

**W queries:**
```typescript
// Pobierz tylko aktywnych (nie usuniętych)
prisma.student.findMany({
  where: { deletedAt: null }
})

// Pobierz także usuniętych
prisma.student.findMany({
  where: { deletedAt: { not: null } }
})

// "Usuń" (soft delete)
prisma.student.update({
  where: { id },
  data: { deletedAt: new Date() }
})

// Przywróć
prisma.student.update({
  where: { id },
  data: { deletedAt: null }
})
```

---

## 🔐 Bezpieczeństwo

### Hasła
- **Nigdy** nie przechowujemy plaintext passwords
- Używamy **bcrypt** do hashowania (w NestJS)
- Salt rounds: 10-12

```typescript
// Przy rejestracji (NestJS)
import * as bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(plainPassword, 10);

await prisma.user.create({
  data: {
    username,
    email,
    password: hashedPassword, // Zahashowane!
    role
  }
})

// Przy logowaniu
const isValid = await bcrypt.compare(plainPassword, user.password);
```

### Unique Constraints
- `username` - nie może być duplikatów
- `email` - nie może być duplikatów
- `pesel` - nie może być duplikatów (jeśli podany)
- `studentNumber` - unikalny numer ucznia

---

## 📈 Przykładowe Queries

### Pobierz ucznia z klasą, rodzicami i ocenami
```typescript
const student = await prisma.student.findUnique({
  where: { id: studentId },
  include: {
    user: true,
    class: {
      include: {
        classTeacher: {
          include: { user: true }
        }
      }
    },
    parents: {
      include: {
        parent: {
          include: { user: true }
        }
      }
    },
    grades: {
      where: { deletedAt: null },
      include: {
        subject: true,
        teacher: true,
        category: true
      },
      orderBy: { date: 'desc' }
    }
  }
})
```

### Oblicz średnią ucznia z przedmiotu
```typescript
const grades = await prisma.grade.findMany({
  where: {
    studentId,
    subjectId,
    semester: 1,
    type: 'PARTIAL',
    deletedAt: null
  }
})

const weightedSum = grades.reduce((sum, grade) => 
  sum + (grade.value * grade.weight), 0
)
const totalWeight = grades.reduce((sum, grade) => 
  sum + grade.weight, 0
)

const average = weightedSum / totalWeight
```

### Frekwencja ucznia w miesiącu
```typescript
const startDate = new Date('2024-11-01')
const endDate = new Date('2024-11-30')

const attendances = await prisma.attendance.findMany({
  where: {
    studentId,
    date: {
      gte: startDate,
      lte: endDate
    },
    deletedAt: null
  }
})

const present = attendances.filter(a => 
  a.status === 'PRESENT'
).length

const total = attendances.length
const percentage = (present / total) * 100
```

---

## 🚀 Migracje

### Utworzenie pierwszej migracji
```bash
cd packages/database
pnpm prisma migrate dev --name init
```

### Aktualizacja bazy po zmianie schematu
```bash
pnpm prisma migrate dev --name opis_zmian
```

### Generowanie Prisma Client
```bash
pnpm prisma generate
```

### Reset bazy (UWAGA: usuwa wszystkie dane!)
```bash
pnpm prisma migrate reset
```

---

## 📊 Seed Data (opcjonalnie)

Możesz stworzyć plik `prisma/seed.ts` z przykładowymi danymi:

```typescript
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Hasło: "password123"
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  // Admin
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@szkola.pl',
      password: hashedPassword,
      role: 'ADMIN',
      admin: {
        create: {
          firstName: 'Jan',
          lastName: 'Kowalski',
          email: 'admin@szkola.pl'
        }
      }
    }
  })
  
  // Przedmioty
  const math = await prisma.subject.create({
    data: {
      name: 'Matematyka',
      code: 'MAT'
    }
  })
  
  // Kategorie ocen
  await prisma.gradeCategory.createMany({
    data: [
      { name: 'Sprawdzian', code: 'SPR', defaultWeight: 3 },
      { name: 'Kartkówka', code: 'KART', defaultWeight: 1 },
      { name: 'Odpowiedź ustna', code: 'UST', defaultWeight: 1 }
    ]
  })
  
  console.log('✅ Seed completed')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Dodaj do `package.json`:
```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Uruchom:
```bash
pnpm prisma db seed
```

---

## 🎓 Best Practices

1. **Zawsze używaj soft deletes** - `deletedAt: null` w queries
2. **Używaj transactions** dla operacji multi-step
3. **Proper error handling** - złap i obsłuż błędy Prisma
4. **Select tylko potrzebne pola** - nie `select: *` zawsze
5. **Pagination** - zawsze dla dużych list
6. **Caching** - dla często używanych danych (Redis)
7. **Monitoring** - loguj slow queries

---

To wszystko! Masz teraz solidną, profesjonalną bazę danych gotową do użycia! 🚀

