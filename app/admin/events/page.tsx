"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, MoreHorizontal, Plus, Search, Filter, Trash, Pencil, Eye } from "lucide-react"

// Sample event data
const events = [
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
    id: 4,
    title: "Science Symposium",
    date: "May 12, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Science Building",
    category: "Academic",
    attendees: 200,
    status: "upcoming",
  },
  {
    id: 5,
    title: "Cultural Diversity Day",
    date: "May 20, 2025",
    time: "11:00 AM - 7:00 PM",
    location: "Campus Quad",
    category: "Cultural",
    attendees: 400,
    status: "upcoming",
  },
  {
    id: 6,
    title: "Entrepreneurship Workshop",
    date: "Jun 3, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Business School",
    category: "Business",
    attendees: 150,
    status: "upcoming",
  },
  {
    id: 7,
    title: "Sports Tournament",
    date: "Jun 10, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Sports Complex",
    category: "Sports",
    attendees: 300,
    status: "upcoming",
  },
  {
    id: 8,
    title: "Art Exhibition",
    date: "Jun 15, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Art Gallery",
    category: "Arts",
    attendees: 180,
    status: "upcoming",
  },
  {
    id: 9,
    title: "Hackathon 2025",
    date: "Jun 20-22, 2025",
    time: "48 Hours",
    location: "Engineering Building",
    category: "Technology",
    attendees: 250,
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

export default function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Manage your events and registrations</p>
        </div>
        <Link href="/admin/events/new">
          <Button className="glow">
            <Plus className="mr-2 h-4 w-4" />
            Add New Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Registrations</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{event.category}</Badge>
                </TableCell>
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
                <TableCell>{event.attendees}</TableCell>
                <TableCell>
                  <Badge className={event.status === "upcoming" ? "bg-green-500" : "bg-gray-500"}>
                    {event.status === "upcoming" ? "Upcoming" : "Completed"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/admin/events/${event.id}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

