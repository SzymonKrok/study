"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  Users,
  GraduationCap,
  TrendingUp
} from "lucide-react"

export default function ClassesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Klasy" 
        description="Zarządzaj klasami i wychowawcami"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj klasę
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{classItem.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {classItem.level}
                  </p>
                </div>
                <Badge variant={classItem.average >= 4.5 ? "default" : "secondary"}>
                  Średnia: {classItem.average}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Class Teacher */}
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={classItem.teacher.avatar} alt={classItem.teacher.name} />
                  <AvatarFallback>
                    {classItem.teacher.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{classItem.teacher.name}</p>
                  <p className="text-xs text-muted-foreground">Wychowawca</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Uczniowie</span>
                  </div>
                  <span className="font-semibold">{classItem.studentsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>Przedmioty</span>
                  </div>
                  <span className="font-semibold">{classItem.subjectsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>Frekwencja</span>
                  </div>
                  <span className={`font-semibold ${
                    classItem.attendance >= 90 ? "text-green-600" : 
                    classItem.attendance >= 75 ? "text-orange-600" : 
                    "text-red-600"
                  }`}>
                    {classItem.attendance}%
                  </span>
                </div>
              </div>

              {/* Action */}
              <Button variant="outline" className="w-full mt-4">
                Zobacz szczegóły
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Mock data
const mockClasses = [
  {
    id: "1",
    name: "3A",
    level: "Klasa trzecia - profil matematyczny",
    studentsCount: 28,
    subjectsCount: 12,
    average: 4.8,
    attendance: 96,
    teacher: {
      name: "Dr Anna Kowalska",
      avatar: "/placeholder.jpg"
    }
  },
  {
    id: "2",
    name: "3B",
    level: "Klasa trzecia - profil humanistyczny",
    studentsCount: 26,
    subjectsCount: 12,
    average: 4.5,
    attendance: 94,
    teacher: {
      name: "Mgr Jan Nowak",
      avatar: "/placeholder.jpg"
    }
  },
  {
    id: "3",
    name: "2A",
    level: "Klasa druga",
    studentsCount: 30,
    subjectsCount: 14,
    average: 4.2,
    attendance: 89,
    teacher: {
      name: "Mgr Maria Wiśniewska",
      avatar: "/placeholder.jpg"
    }
  },
  {
    id: "4",
    name: "2B",
    level: "Klasa druga",
    studentsCount: 29,
    subjectsCount: 14,
    average: 4.0,
    attendance: 87,
    teacher: {
      name: "Dr Piotr Lewandowski",
      avatar: "/placeholder.jpg"
    }
  },
  {
    id: "5",
    name: "1A",
    level: "Klasa pierwsza",
    studentsCount: 32,
    subjectsCount: 15,
    average: 3.9,
    attendance: 92,
    teacher: {
      name: "Mgr Katarzyna Zielińska",
      avatar: "/placeholder.jpg"
    }
  },
  {
    id: "6",
    name: "1B",
    level: "Klasa pierwsza",
    studentsCount: 31,
    subjectsCount: 15,
    average: 3.8,
    attendance: 90,
    teacher: {
      name: "Mgr Tomasz Dąbrowski",
      avatar: "/placeholder.jpg"
    }
  },
]

