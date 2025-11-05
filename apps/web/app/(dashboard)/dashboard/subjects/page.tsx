"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus,
  BookOpen,
  Users,
  Clock,
  TrendingUp
} from "lucide-react"

export default function SubjectsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Przedmioty" 
        description="Zarządzaj przedmiotami nauczania"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj przedmiot
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockSubjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {subject.code}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Teachers */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Nauczyciele:</p>
                {subject.teachers.map((teacher, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      <AvatarFallback className="text-xs">
                        {teacher.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{teacher.name}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Uczniowie</span>
                  </div>
                  <span className="font-semibold">{subject.studentsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Godzin/tydzień</span>
                  </div>
                  <span className="font-semibold">{subject.hoursPerWeek}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>Średnia ocen</span>
                  </div>
                  <Badge variant={subject.averageGrade >= 4.5 ? "default" : "secondary"}>
                    {subject.averageGrade}
                  </Badge>
                </div>
              </div>

              {/* Action */}
              <Button variant="outline" className="w-full">
                Zarządzaj
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Mock data
const mockSubjects = [
  {
    id: "1",
    name: "Matematyka",
    code: "MAT-001",
    teachers: [
      { name: "Dr Anna Kowalska", avatar: "/placeholder.jpg" },
      { name: "Mgr Jan Kowal", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 245,
    hoursPerWeek: 4,
    averageGrade: 4.2
  },
  {
    id: "2",
    name: "Język polski",
    code: "POL-001",
    teachers: [
      { name: "Mgr Jan Nowak", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 248,
    hoursPerWeek: 5,
    averageGrade: 4.5
  },
  {
    id: "3",
    name: "Język angielski",
    code: "ENG-001",
    teachers: [
      { name: "Mgr Maria Wiśniewska", avatar: "/placeholder.jpg" },
      { name: "Mgr Ewa Mazur", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 248,
    hoursPerWeek: 3,
    averageGrade: 4.3
  },
  {
    id: "4",
    name: "Historia",
    code: "HIS-001",
    teachers: [
      { name: "Dr Michał Wójcik", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 248,
    hoursPerWeek: 2,
    averageGrade: 4.0
  },
  {
    id: "5",
    name: "Biologia",
    code: "BIO-001",
    teachers: [
      { name: "Dr Piotr Lewandowski", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 180,
    hoursPerWeek: 2,
    averageGrade: 4.1
  },
  {
    id: "6",
    name: "Chemia",
    code: "CHE-001",
    teachers: [
      { name: "Dr Piotr Lewandowski", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 156,
    hoursPerWeek: 2,
    averageGrade: 3.8
  },
  {
    id: "7",
    name: "Fizyka",
    code: "PHY-001",
    teachers: [
      { name: "Dr Anna Kowalska", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 156,
    hoursPerWeek: 2,
    averageGrade: 3.9
  },
  {
    id: "8",
    name: "Informatyka",
    code: "INF-001",
    teachers: [
      { name: "Mgr Tomasz Dąbrowski", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 165,
    hoursPerWeek: 2,
    averageGrade: 4.4
  },
  {
    id: "9",
    name: "Geografia",
    code: "GEO-001",
    teachers: [
      { name: "Mgr Agnieszka Kamińska", avatar: "/placeholder.jpg" }
    ],
    studentsCount: 248,
    hoursPerWeek: 1,
    averageGrade: 4.2
  },
]

