"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Filter, MoreHorizontal, Eye, Mail, Download, CheckCircle, XCircle } from "lucide-react"

// Sample registration data
const registrations = [
  {
    id: 1,
    studentName: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "(555) 123-4567",
    eventTitle: "Tech Innovation Summit",
    eventDate: "Apr 15, 2025",
    registrationDate: "Mar 10, 2025",
    status: "confirmed",
  },
  {
    id: 2,
    studentName: "Samantha Lee",
    email: "samantha.lee@university.edu",
    phone: "(555) 234-5678",
    eventTitle: "Annual Music Festival",
    eventDate: "Apr 22, 2025",
    registrationDate: "Mar 15, 2025",
    status: "confirmed",
  },
  {
    id: 3,
    studentName: "Michael Chen",
    email: "michael.chen@university.edu",
    phone: "(555) 345-6789",
    eventTitle: "Career Fair 2025",
    eventDate: "May 5, 2025",
    registrationDate: "Mar 20, 2025",
    status: "confirmed",
  },
  {
    id: 4,
    studentName: "Jessica Williams",
    email: "jessica.williams@university.edu",
    phone: "(555) 456-7890",
    eventTitle: "Science Symposium",
    eventDate: "May 12, 2025",
    registrationDate: "Mar 25, 2025",
    status: "pending",
  },
  {
    id: 5,
    studentName: "David Brown",
    email: "david.brown@university.edu",
    phone: "(555) 567-8901",
    eventTitle: "Cultural Diversity Day",
    eventDate: "May 20, 2025",
    registrationDate: "Mar 30, 2025",
    status: "confirmed",
  },
  {
    id: 6,
    studentName: "Emily Davis",
    email: "emily.davis@university.edu",
    phone: "(555) 678-9012",
    eventTitle: "Entrepreneurship Workshop",
    eventDate: "Jun 3, 2025",
    registrationDate: "Apr 5, 2025",
    status: "cancelled",
  },
  {
    id: 7,
    studentName: "James Wilson",
    email: "james.wilson@university.edu",
    phone: "(555) 789-0123",
    eventTitle: "Sports Tournament",
    eventDate: "Jun 10, 2025",
    registrationDate: "Apr 10, 2025",
    status: "confirmed",
  },
  {
    id: 8,
    studentName: "Olivia Martinez",
    email: "olivia.martinez@university.edu",
    phone: "(555) 890-1234",
    eventTitle: "Art Exhibition",
    eventDate: "Jun 15, 2025",
    registrationDate: "Apr 15, 2025",
    status: "pending",
  },
  {
    id: 9,
    studentName: "Ethan Taylor",
    email: "ethan.taylor@university.edu",
    phone: "(555) 901-2345",
    eventTitle: "Hackathon 2025",
    eventDate: "Jun 20-22, 2025",
    registrationDate: "Apr 20, 2025",
    status: "confirmed",
  },
  {
    id: 10,
    studentName: "Sophia Anderson",
    email: "sophia.anderson@university.edu",
    phone: "(555) 012-3456",
    eventTitle: "Tech Innovation Summit",
    eventDate: "Apr 15, 2025",
    registrationDate: "Apr 1, 2025",
    status: "waitlisted",
  },
]

export default function AdminRegistrationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      case "waitlisted":
        return <Badge className="bg-blue-500">Waitlisted</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrations</h1>
        <p className="text-muted-foreground">Manage student registrations for your events</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or event..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.map((registration) => (
              <TableRow key={registration.id}>
                <TableCell>
                  <div className="font-medium">{registration.studentName}</div>
                  <div className="text-sm text-muted-foreground">{registration.email}</div>
                </TableCell>
                <TableCell>
                  <div>{registration.eventTitle}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3 text-primary" />
                    <span>{registration.eventDate}</span>
                  </div>
                </TableCell>
                <TableCell>{registration.registrationDate}</TableCell>
                <TableCell>{getStatusBadge(registration.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/admin/registrations/${registration.id}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email Student</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Confirm</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Cancel</span>
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

