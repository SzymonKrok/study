"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
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
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react"
import { useState } from "react"

export default function AttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Frekwencja" 
        description="Monitoruj obecność uczniów"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj obecność
        </Button>
      </PageHeader>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Frekwencja ogólna
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">+2.1%</span> od ostatniego miesiąca
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Obecni dzisiaj
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,182</div>
            <p className="text-xs text-muted-foreground mt-1">
              z 1,248 uczniów
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Nieobecni
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">66</div>
            <p className="text-xs text-muted-foreground mt-1">
              45 usprawiedliwionych
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Spóźnienia
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-orange-600 font-medium">-3</span> od wczoraj
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Calendar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Wybierz datę</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        {/* Attendance List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-lg">
                Frekwencja: {date?.toLocaleDateString('pl-PL')}
              </CardTitle>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Klasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="3a">Klasa 3A</SelectItem>
                  <SelectItem value="3b">Klasa 3B</SelectItem>
                  <SelectItem value="2a">Klasa 2A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAttendance.map((record) => (
                <div 
                  key={record.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={record.avatar} alt={record.studentName} />
                      <AvatarFallback>
                        {record.studentName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{record.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        Klasa {record.class}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {record.attendanceRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        frekwencja
                      </p>
                    </div>
                    <Badge 
                      variant={
                        record.status === "present" ? "default" : 
                        record.status === "absent-excused" ? "secondary" : 
                        record.status === "late" ? "outline" :
                        "destructive"
                      }
                    >
                      {record.status === "present" ? "Obecny" : 
                       record.status === "absent-excused" ? "Nieob. uspr." : 
                       record.status === "late" ? "Spóźniony" :
                       "Nieobecny"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes with Lowest Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Klasy wymagające uwagi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {classesNeedingAttention.map((classItem) => (
              <div 
                key={classItem.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h4 className="font-semibold text-lg">{classItem.name}</h4>
                  <p className="text-sm text-muted-foreground">{classItem.students} uczniów</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    classItem.attendance >= 90 ? "text-green-600" : 
                    classItem.attendance >= 75 ? "text-orange-600" : 
                    "text-red-600"
                  }`}>
                    {classItem.attendance}%
                  </p>
                  <div className="flex items-center gap-1 text-xs text-red-600">
                    <TrendingDown className="h-3 w-3" />
                    {classItem.trend}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mock data
const mockAttendance = [
  {
    id: "1",
    studentName: "Anna Kowalska",
    avatar: "/placeholder.jpg",
    class: "3A",
    status: "present",
    attendanceRate: 98
  },
  {
    id: "2",
    studentName: "Jan Nowak",
    avatar: "/placeholder.jpg",
    class: "3A",
    status: "late",
    attendanceRate: 89
  },
  {
    id: "3",
    studentName: "Maria Wiśniewska",
    avatar: "/placeholder.jpg",
    class: "3B",
    status: "present",
    attendanceRate: 96
  },
  {
    id: "4",
    studentName: "Piotr Lewandowski",
    avatar: "/placeholder.jpg",
    class: "2A",
    status: "absent-excused",
    attendanceRate: 85
  },
  {
    id: "5",
    studentName: "Katarzyna Zielińska",
    avatar: "/placeholder.jpg",
    class: "2B",
    status: "present",
    attendanceRate: 93
  },
  {
    id: "6",
    studentName: "Tomasz Dąbrowski",
    avatar: "/placeholder.jpg",
    class: "3A",
    status: "absent",
    attendanceRate: 72
  },
]

const classesNeedingAttention = [
  { id: "1", name: "2B", students: 29, attendance: 87, trend: -3.2 },
  { id: "2", name: "1B", students: 31, attendance: 90, trend: -2.1 },
  { id: "3", name: "2A", students: 30, attendance: 89, trend: -1.8 },
]

