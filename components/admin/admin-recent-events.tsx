import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"

// Sample event data
const recentEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "Apr 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Main Campus Auditorium",
    category: "Technology",
    attendees: 120,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Annual Music Festival",
    date: "Apr 22, 2025",
    time: "5:00 PM - 11:00 PM",
    location: "University Amphitheater",
    category: "Music",
    attendees: 500,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Career Fair 2025",
    date: "May 5, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Student Center",
    category: "Career",
    attendees: 350,
    status: "upcoming",
  },
  {
    id: 10,
    title: "Spring Concert",
    date: "Mar 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "University Amphitheater",
    category: "Music",
    attendees: 450,
    status: "completed",
  },
]

export default function AdminRecentEvents() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Registrations</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <span>{event.attendees}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={event.status === "upcoming" ? "bg-green-500" : "bg-gray-500"}>
                  {event.status === "upcoming" ? "Upcoming" : "Completed"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 text-center">
        <Link href="/admin/events">
          <Button variant="outline" size="sm">
            View All Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

