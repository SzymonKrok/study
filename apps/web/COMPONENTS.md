# Dokumentacja Komponentów

## 🎨 Komponenty Niestandardowe

### PageHeader
Nagłówek strony z tytułem, opisem i akcjami.

```tsx
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

<PageHeader 
  title="Uczniowie" 
  description="Zarządzaj listą uczniów i ich danymi"
>
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Dodaj ucznia
  </Button>
</PageHeader>
```

**Props:**
- `title: string` - Tytuł strony (wymagany)
- `description?: string` - Opis strony (opcjonalny)
- `children?: React.ReactNode` - Akcje (przyciski) po prawej stronie (opcjonalne)
- `className?: string` - Dodatkowe klasy CSS (opcjonalne)

---

### StatsCard
Karta ze statystykami - liczby, trendy, ikony.

```tsx
import { StatsCard } from "@/components/stats-card"
import { Users } from "lucide-react"

<StatsCard
  title="Uczniowie"
  value="1,248"
  icon={Users}
  trend={{ value: 12, isPositive: true }}
  description="od ostatniego miesiąca"
/>
```

**Props:**
- `title: string` - Tytuł karty (wymagany)
- `value: string | number` - Wartość statystyki (wymagana)
- `description?: string` - Dodatkowy opis (opcjonalny)
- `icon?: LucideIcon` - Ikona z lucide-react (opcjonalna)
- `trend?: { value: number, isPositive: boolean }` - Trend procentowy (opcjonalny)
- `className?: string` - Dodatkowe klasy CSS (opcjonalne)

**Przykłady użycia:**

Prosta karta:
```tsx
<StatsCard
  title="Nauczyciele"
  value="89"
  description="aktywnych nauczycieli"
/>
```

Z ikoną i trendem:
```tsx
<StatsCard
  title="Średnia frekwencja"
  value="94.5%"
  icon={TrendingUp}
  trend={{ value: 2.1, isPositive: true }}
  description="w tym miesiącu"
/>
```

Z negatywnym trendem:
```tsx
<StatsCard
  title="Nieobecności"
  value="66"
  icon={XCircle}
  trend={{ value: -5, isPositive: false }}
  description="mniej niż wczoraj"
/>
```

---

## 🗂️ Komponenty Layoutu

### AppSidebar
Główny sidebar aplikacji z nawigacją.

**Lokalizacja:** `components/layout/app-sidebar.tsx`

**Funkcje:**
- Nawigacja do wszystkich sekcji aplikacji
- Automatyczne zaznaczanie aktywnej strony
- Collapsible - można zwijać do ikon
- Sekcje grupowe (Główne, Zarządzanie, Akademickie)
- Footer z profilem użytkownika i dropdown menu

**Struktura nawigacji:**
```typescript
const menuItems = [
  {
    title: "Główne",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Kalendarz", url: "/dashboard/calendar", icon: Calendar },
      { title: "Statystyki", url: "/dashboard/statistics", icon: BarChart3 },
    ],
  },
  // ...
]
```

**Jak dodać nowy element menu:**
1. Otwórz `components/layout/app-sidebar.tsx`
2. Dodaj nowy obiekt do odpowiedniej sekcji w `menuItems`
3. Zaimportuj ikonę z `lucide-react`

Przykład:
```typescript
{
  title: "Nowa Sekcja",
  url: "/dashboard/new-section",
  icon: Star, // z lucide-react
}
```

---

### AppHeader
Górny pasek aplikacji z wyszukiwarką i powiadomieniami.

**Lokalizacja:** `components/layout/app-header.tsx`

**Funkcje:**
- Trigger do otwierania/zamykania sidebar
- Globalna wyszukiwarka
- Ikona powiadomień z licznikiem
- Dropdown z powiadomieniami

**Customizacja wyszukiwarki:**
```tsx
// W app-header.tsx
<Input
  type="search"
  placeholder="Twój custom placeholder..."
  className="w-full rounded-lg bg-muted/50 pl-8"
/>
```

---

## 📋 Komponenty shadcn/ui

### Card
Podstawowy kontener dla treści.

```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Tytuł</CardTitle>
    <CardDescription>Opis</CardDescription>
  </CardHeader>
  <CardContent>
    Zawartość karty
  </CardContent>
</Card>
```

---

### Table
Tabela do wyświetlania danych.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Imię</TableHead>
      <TableHead>Nazwisko</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Jan</TableCell>
      <TableCell>Kowalski</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### Badge
Oznaczenia i statusy.

```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">Aktywny</Badge>
<Badge variant="secondary">Nieaktywny</Badge>
<Badge variant="destructive">Błąd</Badge>
<Badge variant="outline">Outline</Badge>
```

---

### Avatar
Awatar użytkownika.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/path/to/image.jpg" alt="Jan Kowalski" />
  <AvatarFallback>JK</AvatarFallback>
</Avatar>
```

---

### Button
Przycisk z wariantami.

```tsx
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

<Button variant="default">Domyślny</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destrukcyjny</Button>

// Z ikoną
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Dodaj
</Button>

// Size
<Button size="sm">Mały</Button>
<Button size="default">Domyślny</Button>
<Button size="lg">Duży</Button>
<Button size="icon">🔍</Button>
```

---

### Select
Dropdown do wyboru opcji.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select defaultValue="option1">
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Wybierz..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Opcja 1</SelectItem>
    <SelectItem value="option2">Opcja 2</SelectItem>
    <SelectItem value="option3">Opcja 3</SelectItem>
  </SelectContent>
</Select>
```

---

### Calendar
Kalendarz do wyboru dat.

```tsx
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>
```

---

### Input
Pole tekstowe.

```tsx
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Proste pole
<Input type="text" placeholder="Wprowadź tekst..." />

// Z ikoną
<div className="relative">
  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input
    type="search"
    placeholder="Szukaj..."
    className="pl-8"
  />
</div>
```

---

### Dialog
Modalne okno dialogowe.

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Otwórz dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Tytuł</DialogTitle>
      <DialogDescription>
        Opis dialogu
      </DialogDescription>
    </DialogHeader>
    <div>Zawartość</div>
  </DialogContent>
</Dialog>
```

---

### DropdownMenu
Menu rozwijane.

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profil</DropdownMenuItem>
    <DropdownMenuItem>Ustawienia</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Wyloguj</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 🎯 Best Practices

### 1. Używaj komponentów shadcn/ui
Zamiast tworzyć własne, korzystaj z gotowych komponentów:
```tsx
// ❌ Źle
<div className="rounded-lg border p-4">...</div>

// ✅ Dobrze
<Card>
  <CardContent>...</CardContent>
</Card>
```

### 2. Konsystentne spacing
```tsx
// Odstępy między sekcjami: gap-4
<div className="flex flex-col gap-4">
  <PageHeader />
  <StatsCards />
  <DataTable />
</div>
```

### 3. Responsywność
```tsx
// Mobile-first, potem breakpoints
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {/* 1 kolumna na mobile, 2 na tablet, 4 na desktop */}
</div>
```

### 4. Ikony
Zawsze dodawaj ikony z marginesem:
```tsx
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Dodaj
</Button>
```

### 5. Loading states
Używaj Skeleton dla lepszego UX:
```tsx
import { Skeleton } from "@/components/ui/skeleton"

{isLoading ? (
  <Skeleton className="h-12 w-full" />
) : (
  <div>Dane</div>
)}
```

---

## 📚 Dodatkowe zasoby

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Tailwind CSS](https://tailwindcss.com)

