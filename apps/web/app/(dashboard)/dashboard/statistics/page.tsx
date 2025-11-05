"use client"

import { PageHeader } from "@/components/page-header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  GraduationCap, 
  TrendingUp,
  BookOpen,
  Calendar,
  Award,
  Target,
  BarChart3
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function StatisticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Statystyki" 
        description="Analiza danych i trendów szkolnych"
      >
        <Select defaultValue="current-year">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Okres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-year">Rok szkolny 2024/25</SelectItem>
            <SelectItem value="last-year">Rok szkolny 2023/24</SelectItem>
            <SelectItem value="current-semester">Obecny semestr</SelectItem>
            <SelectItem value="last-semester">Poprzedni semestr</SelectItem>
          </SelectContent>
        </Select>
      </PageHeader>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Wszyscy uczniowie"
          value="1,248"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          description="od zeszłego roku"
        />
        <StatsCard
          title="Kadra nauczycielska"
          value="89"
          icon={GraduationCap}
          trend={{ value: 3, isPositive: true }}
          description="aktywnych nauczycieli"
        />
        <StatsCard
          title="Średnia ocen"
          value="4.2"
          icon={Award}
          trend={{ value: 0.3, isPositive: true }}
          description="w całej szkole"
        />
        <StatsCard
          title="Frekwencja"
          value="94.5%"
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
          description="średnia miesięczna"
        />
      </div>

      {/* Performance by Grade */}
      <Card>
        <CardHeader>
          <CardTitle>Wyniki według poziomów</CardTitle>
          <CardDescription>
            Porównanie średnich ocen i frekwencji
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceByGrade.map((grade) => (
              <div key={grade.level} className="flex items-center gap-4">
                <div className="w-20 font-semibold">{grade.level}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Średnia ocen</span>
                    <span className="font-semibold">{grade.averageGrade}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `${(grade.averageGrade / 6) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Frekwencja</span>
                    <span className="font-semibold">{grade.attendance}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-green-500" 
                      style={{ width: `${grade.attendance}%` }}
                    />
                  </div>
                </div>
                <Badge variant={grade.trend === "up" ? "default" : grade.trend === "down" ? "destructive" : "secondary"}>
                  {grade.trend === "up" ? "↑" : grade.trend === "down" ? "↓" : "→"} {grade.trendValue}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Performing Students */}
        <Card>
          <CardHeader>
            <CardTitle>Najlepsi uczniowie</CardTitle>
            <CardDescription>
              Top 5 według średniej ocen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{student.average}</p>
                    <p className="text-xs text-muted-foreground">{student.attendance}% frekw.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Teachers */}
        <Card>
          <CardHeader>
            <CardTitle>Najlepsi nauczyciele</CardTitle>
            <CardDescription>
              Według średniej ocen uczniów
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTeachers.map((teacher, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{teacher.average}</p>
                    <p className="text-xs text-muted-foreground">{teacher.studentsCount} uczniów</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Wyniki według przedmiotów</CardTitle>
          <CardDescription>
            Ranking przedmiotów według średniej ocen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {subjectPerformance.map((subject) => (
              <div 
                key={subject.name}
                className="flex flex-col gap-2 rounded-lg border p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">{subject.name}</h4>
                  </div>
                  <Badge variant={subject.average >= 4.5 ? "default" : subject.average >= 4.0 ? "secondary" : "outline"}>
                    {subject.average}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Uczniowie:</span>
                    <span className="font-medium text-foreground">{subject.studentsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nauczyciele:</span>
                    <span className="font-medium text-foreground">{subject.teachersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ocen w miesiącu:</span>
                    <span className="font-medium text-foreground">{subject.gradesThisMonth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Trendy miesięczne</CardTitle>
          <CardDescription>
            Porównanie kluczowych wskaźników
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {monthlyTrends.map((trend) => (
              <div key={trend.metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <trend.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{trend.metric}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">{trend.current}</span>
                    <Badge 
                      variant={trend.change >= 0 ? "default" : "destructive"}
                      className="gap-1"
                    >
                      {trend.change >= 0 ? "+" : ""}{trend.change}%
                    </Badge>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-primary" 
                    style={{ width: `${trend.percentage}%` }}
                  />
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
const performanceByGrade = [
  { level: "Klasa 1", averageGrade: 3.9, attendance: 92, trend: "up", trendValue: 1.2 },
  { level: "Klasa 2", averageGrade: 4.1, attendance: 89, trend: "down", trendValue: 0.8 },
  { level: "Klasa 3", averageGrade: 4.6, attendance: 96, trend: "up", trendValue: 2.3 },
]

const topStudents = [
  { name: "Maria Wiśniewska", class: "3B", average: 5.2, attendance: 98 },
  { name: "Anna Kowalska", class: "3A", average: 4.9, attendance: 96 },
  { name: "Agnieszka Kamińska", class: "3A", average: 4.8, attendance: 99 },
  { name: "Katarzyna Zielińska", class: "2B", average: 4.7, attendance: 93 },
  { name: "Jan Nowak", class: "3A", average: 4.5, attendance: 89 },
]

const topTeachers = [
  { name: "Dr Anna Kowalska", subject: "Matematyka", average: 4.8, studentsCount: 156 },
  { name: "Mgr Jan Nowak", subject: "Język polski", average: 4.6, studentsCount: 142 },
  { name: "Dr Piotr Lewandowski", subject: "Biologia", average: 4.5, studentsCount: 98 },
  { name: "Mgr Tomasz Dąbrowski", subject: "Informatyka", average: 4.4, studentsCount: 165 },
  { name: "Mgr Maria Wiśniewska", subject: "Język angielski", average: 4.3, studentsCount: 180 },
]

const subjectPerformance = [
  { name: "Matematyka", average: 4.8, studentsCount: 245, teachersCount: 2, gradesThisMonth: 342 },
  { name: "Język polski", average: 4.6, studentsCount: 248, teachersCount: 1, gradesThisMonth: 398 },
  { name: "Biologia", average: 4.5, studentsCount: 180, teachersCount: 1, gradesThisMonth: 156 },
  { name: "Informatyka", average: 4.4, studentsCount: 165, teachersCount: 1, gradesThisMonth: 198 },
  { name: "Język angielski", average: 4.3, studentsCount: 248, teachersCount: 2, gradesThisMonth: 412 },
  { name: "Geografia", average: 4.2, studentsCount: 248, teachersCount: 1, gradesThisMonth: 289 },
]

const monthlyTrends = [
  { metric: "Średnia ocen", current: "4.2", change: 3.5, percentage: 70, icon: Award },
  { metric: "Frekwencja", current: "94.5%", change: 2.1, percentage: 94.5, icon: TrendingUp },
  { metric: "Liczba uczniów", current: "1,248", change: 12.3, percentage: 85, icon: Users },
  { metric: "Liczba ocen", current: "1,284", change: 18.2, percentage: 92, icon: BookOpen },
]

