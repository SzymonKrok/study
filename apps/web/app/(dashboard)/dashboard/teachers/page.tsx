"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  Mail,
  Phone,
  BookOpen,
  Users,
  Calendar
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TeachersPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Nauczyciele" 
        description="Zarządzaj kadrą pedagogiczną"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj nauczyciela
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Szukaj po imieniu, nazwisku..."
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Przedmiot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie przedmioty</SelectItem>
                  <SelectItem value="math">Matematyka</SelectItem>
                  <SelectItem value="polish">Język polski</SelectItem>
                  <SelectItem value="english">Język angielski</SelectItem>
                  <SelectItem value="history">Historia</SelectItem>
                  <SelectItem value="biology">Biologia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Teachers Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockTeachers.map((teacher) => (
              <Card key={teacher.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      <AvatarFallback className="text-lg">
                        {teacher.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-semibold text-lg mb-1">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{teacher.title}</p>
                    
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {teacher.subjects.map((subject, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="w-full space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Uczniowie</span>
                        </div>
                        <span className="font-medium">{teacher.studentsCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>Klasy</span>
                        </div>
                        <span className="font-medium">{teacher.classesCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Godziny/tydz.</span>
                        </div>
                        <span className="font-medium">{teacher.hoursPerWeek}</span>
                      </div>
                    </div>
                    
                    <div className="w-full pt-4 border-t space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{teacher.phone}</span>
                      </div>
                    </div>
                    
                    <div className="w-full flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        Profil
                      </Button>
                      <Button variant="default" size="sm" className="flex-1">
                        <Mail className="mr-1 h-3.5 w-3.5" />
                        Kontakt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Pokazuje 1-9 z 89 nauczycieli
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Poprzednia
              </Button>
              <Button variant="outline" size="sm">
                Następna
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mock data
const mockTeachers = [
  {
    id: "TCH001",
    name: "Dr Anna Kowalska",
    title: "Nauczyciel matematyki",
    avatar: "/placeholder.jpg",
    subjects: ["Matematyka", "Fizyka"],
    email: "a.kowalska@szkola.edu.pl",
    phone: "+48 123 456 789",
    studentsCount: 156,
    classesCount: 6,
    hoursPerWeek: 24
  },
  {
    id: "TCH002",
    name: "Mgr Jan Nowak",
    title: "Nauczyciel języka polskiego",
    avatar: "/placeholder.jpg",
    subjects: ["Język polski", "Historia"],
    email: "j.nowak@szkola.edu.pl",
    phone: "+48 123 456 790",
    studentsCount: 142,
    classesCount: 5,
    hoursPerWeek: 20
  },
  {
    id: "TCH003",
    name: "Mgr Maria Wiśniewska",
    title: "Nauczyciel języka angielskiego",
    avatar: "/placeholder.jpg",
    subjects: ["Język angielski"],
    email: "m.wisniewska@szkola.edu.pl",
    phone: "+48 123 456 791",
    studentsCount: 180,
    classesCount: 8,
    hoursPerWeek: 28
  },
  {
    id: "TCH004",
    name: "Dr Piotr Lewandowski",
    title: "Nauczyciel chemii",
    avatar: "/placeholder.jpg",
    subjects: ["Chemia", "Biologia"],
    email: "p.lewandowski@szkola.edu.pl",
    phone: "+48 123 456 792",
    studentsCount: 98,
    classesCount: 4,
    hoursPerWeek: 18
  },
  {
    id: "TCH005",
    name: "Mgr Katarzyna Zielińska",
    title: "Nauczyciel WF",
    avatar: "/placeholder.jpg",
    subjects: ["Wychowanie fizyczne"],
    email: "k.zielinska@szkola.edu.pl",
    phone: "+48 123 456 793",
    studentsCount: 210,
    classesCount: 10,
    hoursPerWeek: 30
  },
  {
    id: "TCH006",
    name: "Mgr Tomasz Dąbrowski",
    title: "Nauczyciel informatyki",
    avatar: "/placeholder.jpg",
    subjects: ["Informatyka", "Technologia"],
    email: "t.dabrowski@szkola.edu.pl",
    phone: "+48 123 456 794",
    studentsCount: 165,
    classesCount: 7,
    hoursPerWeek: 22
  },
  {
    id: "TCH007",
    name: "Mgr Agnieszka Kamińska",
    title: "Nauczyciel geografii",
    avatar: "/placeholder.jpg",
    subjects: ["Geografia"],
    email: "a.kaminska@szkola.edu.pl",
    phone: "+48 123 456 795",
    studentsCount: 134,
    classesCount: 5,
    hoursPerWeek: 20
  },
  {
    id: "TCH008",
    name: "Dr Michał Wójcik",
    title: "Nauczyciel historii",
    avatar: "/placeholder.jpg",
    subjects: ["Historia", "WOS"],
    email: "m.wojcik@szkola.edu.pl",
    phone: "+48 123 456 796",
    studentsCount: 145,
    classesCount: 6,
    hoursPerWeek: 24
  },
  {
    id: "TCH009",
    name: "Mgr Ewa Mazur",
    title: "Nauczyciel muzyki",
    avatar: "/placeholder.jpg",
    subjects: ["Muzyka"],
    email: "e.mazur@szkola.edu.pl",
    phone: "+48 123 456 797",
    studentsCount: 200,
    classesCount: 9,
    hoursPerWeek: 18
  },
]

