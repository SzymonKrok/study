"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Download,
  Filter,
  Mail,
  Phone,
  Eye
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function StudentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Uczniowie" 
        description="Zarządzaj listą uczniów i ich danymi"
      >
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Eksportuj
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj ucznia
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Szukaj po imieniu, nazwisku lub ID..."
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Klasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie klasy</SelectItem>
                  <SelectItem value="1a">Klasa 1A</SelectItem>
                  <SelectItem value="1b">Klasa 1B</SelectItem>
                  <SelectItem value="2a">Klasa 2A</SelectItem>
                  <SelectItem value="2b">Klasa 2B</SelectItem>
                  <SelectItem value="3a">Klasa 3A</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="active">Aktywni</SelectItem>
                  <SelectItem value="inactive">Nieaktywni</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Uczeń</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Klasa</TableHead>
                  <TableHead>Kontakt</TableHead>
                  <TableHead>Średnia</TableHead>
                  <TableHead>Frekwencja</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>
                            {student.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Ur. {student.birthDate}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {student.id}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.class}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{student.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{student.average}</div>
                        <div className="h-2 w-16 rounded-full bg-muted">
                          <div 
                            className="h-full rounded-full bg-primary" 
                            style={{ width: `${(student.average / 6) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={
                        student.attendance >= 90 
                          ? "text-green-600 font-medium" 
                          : student.attendance >= 75 
                          ? "text-orange-600 font-medium" 
                          : "text-red-600 font-medium"
                      }>
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.status === "active" ? "default" : "secondary"}
                      >
                        {student.status === "active" ? "Aktywny" : "Nieaktywny"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Zobacz profil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Wyślij wiadomość
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edytuj</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Usuń
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Pokazuje 1-10 z 1,248 uczniów
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
const mockStudents = [
  {
    id: "STD001",
    name: "Anna Kowalska",
    avatar: "/placeholder.jpg",
    birthDate: "15.03.2010",
    class: "3A",
    email: "a.kowalska@szkola.pl",
    phone: "+48 123 456 789",
    average: 4.8,
    attendance: 96,
    status: "active"
  },
  {
    id: "STD002",
    name: "Jan Nowak",
    avatar: "/placeholder.jpg",
    birthDate: "22.05.2010",
    class: "3A",
    email: "j.nowak@szkola.pl",
    phone: "+48 123 456 790",
    average: 4.2,
    attendance: 89,
    status: "active"
  },
  {
    id: "STD003",
    name: "Maria Wiśniewska",
    avatar: "/placeholder.jpg",
    birthDate: "08.11.2010",
    class: "3B",
    email: "m.wisniewska@szkola.pl",
    phone: "+48 123 456 791",
    average: 5.2,
    attendance: 98,
    status: "active"
  },
  {
    id: "STD004",
    name: "Piotr Lewandowski",
    avatar: "/placeholder.jpg",
    birthDate: "30.01.2011",
    class: "2A",
    email: "p.lewandowski@szkola.pl",
    phone: "+48 123 456 792",
    average: 3.8,
    attendance: 85,
    status: "active"
  },
  {
    id: "STD005",
    name: "Katarzyna Zielińska",
    avatar: "/placeholder.jpg",
    birthDate: "17.07.2011",
    class: "2B",
    email: "k.zielinska@szkola.pl",
    phone: "+48 123 456 793",
    average: 4.6,
    attendance: 93,
    status: "active"
  },
  {
    id: "STD006",
    name: "Tomasz Dąbrowski",
    avatar: "/placeholder.jpg",
    birthDate: "25.09.2009",
    class: "4A",
    email: "t.dabrowski@szkola.pl",
    phone: "+48 123 456 794",
    average: 4.1,
    attendance: 78,
    status: "active"
  },
  {
    id: "STD007",
    name: "Agnieszka Kamińska",
    avatar: "/placeholder.jpg",
    birthDate: "12.04.2010",
    class: "3A",
    email: "a.kaminska@szkola.pl",
    phone: "+48 123 456 795",
    average: 5.0,
    attendance: 99,
    status: "active"
  },
  {
    id: "STD008",
    name: "Michał Wójcik",
    avatar: "/placeholder.jpg",
    birthDate: "05.12.2010",
    class: "3B",
    email: "m.wojcik@szkola.pl",
    phone: "+48 123 456 796",
    average: 3.5,
    attendance: 72,
    status: "inactive"
  },
]

