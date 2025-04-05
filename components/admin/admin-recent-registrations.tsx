import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

// Sample registration data
const recentRegistrations = [
  {
    id: 1,
    studentName: "Alex Johnson",
    email: "alex.johnson@university.edu",
    eventTitle: "Tech Innovation Summit",
    registrationDate: "Mar 10, 2025",
    status: "confirmed",
  },
  {
    id: 2,
    studentName: "Samantha Lee",
    email: "samantha.lee@university.edu",
    eventTitle: "Annual Music Festival",
    registrationDate: "Mar 15, 2025",
    status: "confirmed",
  },
  {
    id: 4,
    studentName: "Jessica Williams",
    email: "jessica.williams@university.edu",
    eventTitle: "Science Symposium",
    registrationDate: "Mar 25, 2025",
    status: "pending",
  },
  {
    id: 10,
    studentName: "Sophia Anderson",
    email: "sophia.anderson@university.edu",
    eventTitle: "Tech Innovation Summit",
    registrationDate: "Apr 1, 2025",
    status: "waitlisted",
  },
]

export default function AdminRecentRegistrations() {
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
    <div className="space-y-4">
      {recentRegistrations.map((registration) => (
        <div key={registration.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>
                {registration.studentName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{registration.studentName}</p>
              <p className="text-xs text-muted-foreground">{registration.eventTitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">{getStatusBadge(registration.status)}</div>
        </div>
      ))}

      <div className="pt-2 text-center">
        <Link href="/admin/registrations">
          <Button variant="outline" size="sm">
            View All Registrations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

