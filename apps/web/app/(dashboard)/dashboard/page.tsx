import { PageHeader } from "@/components/page-header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Dashboard" 
        description="Przegląd najważniejszych informacji"
      >
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Dodaj wydarzenie
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Uczniowie"
          value="1,248"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          description="od ostatniego miesiąca"
        />
        <StatsCard
          title="Nauczyciele"
          value="89"
          icon={GraduationCap}
          trend={{ value: 3, isPositive: true }}
          description="aktywnych nauczycieli"
        />
        <StatsCard
          title="Klasy"
          value="42"
          icon={BookOpen}
          description="we wszystkich poziomach"
        />
        <StatsCard
          title="Średnia frekwencja"
          value="94.5%"
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
          description="w tym miesiącu"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ostatnia aktywność</CardTitle>
            <CardDescription>
              Najnowsze wydarzenia w systemie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>{activity.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        {activity.user}
                      </p>
                      <Badge variant={activity.type === "grade" ? "default" : "secondary"} className="text-xs">
                        {activity.type === "grade" ? "Ocena" : activity.type === "attendance" ? "Obecność" : "Wydarzenie"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Nadchodzące wydarzenia</CardTitle>
            <CardDescription>
              Wydarzenia w tym tygodniu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {event.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                    {event.priority === "high" && (
                      <div className="flex items-center gap-1 text-xs text-orange-600">
                        <AlertCircle className="h-3 w-3" />
                        Wysoki priorytet
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Link href="/dashboard/calendar">
                <Button variant="ghost" className="w-full">
                  Zobacz wszystkie wydarzenia
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Szybkie akcje</CardTitle>
          <CardDescription>
            Najczęściej wykonywane operacje
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/students">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Users className="mr-2 h-5 w-5" />
              Zarządzaj uczniami
            </Button>
          </Link>
          <Link href="/dashboard/grades">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Wpisz oceny
            </Button>
          </Link>
          <Link href="/dashboard/attendance">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Clock className="mr-2 h-5 w-5" />
              Sprawdź frekwencję
            </Button>
          </Link>
          <Link href="/dashboard/calendar">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              Dodaj wydarzenie
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

// Mock data
const recentActivities = [
  {
    user: "Anna Kowalska",
    avatar: "/placeholder.jpg",
    type: "grade",
    description: "Otrzymała ocenę 5 z matematyki",
    time: "2 minuty temu"
  },
  {
    user: "Jan Nowak",
    avatar: "/placeholder.jpg",
    type: "attendance",
    description: "Odnotowano nieobecność usprawiedliwioną",
    time: "15 minut temu"
  },
  {
    user: "Maria Wiśniewska",
    avatar: "/placeholder.jpg",
    type: "grade",
    description: "Otrzymała ocenę 4 z języka polskiego",
    time: "1 godzinę temu"
  },
  {
    user: "Piotr Lewandowski",
    avatar: "/placeholder.jpg",
    type: "event",
    description: "Zapisał się na kółko matematyczne",
    time: "2 godziny temu"
  },
]

const upcomingEvents = [
  {
    title: "Wywiadówka - Klasa 3A",
    date: "Dzisiaj, 17:00",
    priority: "high"
  },
  {
    title: "Egzamin końcowy - Matematyka",
    date: "Jutro, 09:00",
    priority: "high"
  },
  {
    title: "Wycieczka szkolna",
    date: "Piątek, 08:00",
    priority: "normal"
  },
  {
    title: "Rada pedagogiczna",
    date: "Sobota, 10:00",
    priority: "normal"
  },
]

