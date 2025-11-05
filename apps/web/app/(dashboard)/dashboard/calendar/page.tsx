"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users
} from "lucide-react"
import { useState } from "react"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-4">
      <PageHeader 
        title="Kalendarz" 
        description="Zarządzaj wydarzeniami i terminami szkolnymi"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj wydarzenie
        </Button>
      </PageHeader>

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

        {/* Events for selected date */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              Wydarzenia: {date?.toLocaleDateString('pl-PL', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEventsForToday.map((event) => (
                <div 
                  key={event.id} 
                  className="flex gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center rounded-md bg-primary px-3 py-2 text-white">
                    <span className="text-2xl font-bold">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs uppercase">
                      {new Date(event.date).toLocaleDateString('pl-PL', { month: 'short' })}
                    </span>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <Badge 
                        variant={
                          event.type === "exam" ? "destructive" : 
                          event.type === "meeting" ? "default" : 
                          "secondary"
                        }
                      >
                        {event.type === "exam" ? "Egzamin" : 
                         event.type === "meeting" ? "Spotkanie" : 
                         event.type === "event" ? "Wydarzenie" : 
                         "Inne"}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.participants && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>{event.participants}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Nadchodzące wydarzenia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {event.date}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={
                    event.type === "exam" ? "destructive" : 
                    event.type === "meeting" ? "default" : 
                    "secondary"
                  }
                >
                  {event.type === "exam" ? "Egzamin" : 
                   event.type === "meeting" ? "Spotkanie" : 
                   "Wydarzenie"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mock data
const mockEventsForToday = [
  {
    id: "1",
    title: "Wywiadówka - Klasa 3A",
    description: "Spotkanie z rodzicami uczniów klasy 3A",
    date: new Date().toISOString(),
    time: "17:00 - 19:00",
    location: "Sala 12",
    participants: "25 osób",
    type: "meeting"
  },
  {
    id: "2",
    title: "Egzamin z matematyki",
    description: "Sprawdzian końcowy dla klas maturalnych",
    date: new Date().toISOString(),
    time: "09:00 - 11:00",
    location: "Sala 5, 6, 7",
    participants: "Klasy 3A, 3B, 3C",
    type: "exam"
  },
  {
    id: "3",
    title: "Trening piłki nożnej",
    description: "Zajęcia dodatkowe dla chętnych",
    date: new Date().toISOString(),
    time: "15:00 - 16:30",
    location: "Boisko szkolne",
    participants: "15 uczniów",
    type: "event"
  },
]

const upcomingEvents = [
  {
    id: "4",
    title: "Wycieczka do muzeum",
    date: "Jutro, 08:00",
    location: "Muzeum Narodowe",
    type: "event"
  },
  {
    id: "5",
    title: "Rada pedagogiczna",
    date: "Piątek, 14:00",
    location: "Sala konferencyjna",
    type: "meeting"
  },
  {
    id: "6",
    title: "Egzamin próbny - język angielski",
    date: "Poniedziałek, 10:00",
    location: "Sale 8-12",
    type: "exam"
  },
  {
    id: "7",
    title: "Dzień otwarty szkoły",
    date: "Sobota, 10:00",
    location: "Cała szkoła",
    type: "event"
  },
  {
    id: "8",
    title: "Konkurs wiedzy",
    date: "Środa, 12:00",
    location: "Aula",
    type: "event"
  },
]

