"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus, 
  TrendingUp,
  TrendingDown,
  BookOpen
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function GradesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Oceny" 
        description="Zarządzaj ocenami uczniów"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj ocenę
        </Button>
      </PageHeader>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Średnia szkoły
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">+0.3</span> od ostatniego semestru
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Najlepsza klasa
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3A</div>
            <p className="text-xs text-muted-foreground mt-1">
              Średnia: 4.8
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ocen w tym miesiącu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground mt-1">
              +18% od poprzedniego
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Średnia frekwencja
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">+2.1%</span> od ostatniego
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Grade Entry */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Przegląd ocen</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all-classes">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Klasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-classes">Wszystkie klasy</SelectItem>
                  <SelectItem value="1a">Klasa 1A</SelectItem>
                  <SelectItem value="1b">Klasa 1B</SelectItem>
                  <SelectItem value="2a">Klasa 2A</SelectItem>
                  <SelectItem value="3a">Klasa 3A</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-subjects">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Przedmiot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-subjects">Wszystkie przedmioty</SelectItem>
                  <SelectItem value="math">Matematyka</SelectItem>
                  <SelectItem value="polish">Język polski</SelectItem>
                  <SelectItem value="english">Język angielski</SelectItem>
                  <SelectItem value="history">Historia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Uczeń</TableHead>
                  <TableHead>Klasa</TableHead>
                  <TableHead>Przedmiot</TableHead>
                  <TableHead>Ostatnie oceny</TableHead>
                  <TableHead>Średnia</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={grade.avatar} alt={grade.studentName} />
                          <AvatarFallback>
                            {grade.studentName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{grade.studentName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{grade.class}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {grade.subject}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {grade.recentGrades.map((g, idx) => (
                          <Badge 
                            key={idx}
                            variant={
                              g >= 5 ? "default" : 
                              g >= 4 ? "secondary" : 
                              g >= 3 ? "outline" : 
                              "destructive"
                            }
                            className="w-8 h-8 flex items-center justify-center"
                          >
                            {g}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-lg">{grade.average}</span>
                    </TableCell>
                    <TableCell>
                      {grade.trend === "up" ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-medium">Wzrost</span>
                        </div>
                      ) : grade.trend === "down" ? (
                        <div className="flex items-center gap-1 text-red-600">
                          <TrendingDown className="h-4 w-4" />
                          <span className="text-sm font-medium">Spadek</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <span className="text-sm">Stabilny</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Szczegóły
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Najlepsze przedmioty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSubjects.map((subject, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{subject.average}</p>
                    <p className="text-xs text-muted-foreground">{subject.studentsCount} uczniów</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Przedmioty wymagające uwagi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectsNeedingAttention.map((subject, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 font-semibold">
                      !
                    </div>
                    <div>
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-orange-600">{subject.average}</p>
                    <p className="text-xs text-muted-foreground">{subject.failingCount} ocen niedost.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Mock data
const mockGrades = [
  {
    id: "1",
    studentName: "Anna Kowalska",
    avatar: "/placeholder.jpg",
    class: "3A",
    subject: "Matematyka",
    recentGrades: [5, 5, 4, 5],
    average: 4.8,
    trend: "up"
  },
  {
    id: "2",
    studentName: "Jan Nowak",
    avatar: "/placeholder.jpg",
    class: "3A",
    subject: "Język polski",
    recentGrades: [4, 4, 3, 4],
    average: 3.9,
    trend: "stable"
  },
  {
    id: "3",
    studentName: "Maria Wiśniewska",
    avatar: "/placeholder.jpg",
    class: "3B",
    subject: "Matematyka",
    recentGrades: [5, 5, 5, 5],
    average: 5.0,
    trend: "stable"
  },
  {
    id: "4",
    studentName: "Piotr Lewandowski",
    avatar: "/placeholder.jpg",
    class: "2A",
    subject: "Język angielski",
    recentGrades: [3, 3, 2, 3],
    average: 2.9,
    trend: "down"
  },
  {
    id: "5",
    studentName: "Katarzyna Zielińska",
    avatar: "/placeholder.jpg",
    class: "2B",
    subject: "Historia",
    recentGrades: [5, 4, 5, 5],
    average: 4.7,
    trend: "up"
  },
]

const topSubjects = [
  { name: "Matematyka", teacher: "Dr Anna Kowalska", average: 4.8, studentsCount: 156 },
  { name: "Język polski", teacher: "Mgr Jan Nowak", average: 4.6, studentsCount: 142 },
  { name: "Biologia", teacher: "Dr Piotr Lewandowski", average: 4.5, studentsCount: 98 },
]

const subjectsNeedingAttention = [
  { name: "Chemia", teacher: "Mgr Tomasz Kowal", average: 3.2, failingCount: 12 },
  { name: "Fizyka", teacher: "Dr Maria Nowak", average: 3.4, failingCount: 8 },
  { name: "Język niemiecki", teacher: "Mgr Ewa Mazur", average: 3.5, failingCount: 6 },
]

