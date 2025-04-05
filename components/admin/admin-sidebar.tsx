"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, LayoutDashboard, Users, Settings, LogOut, Menu, X, BarChart3, MessageSquare } from "lucide-react"
import { useState } from "react"
import { signOut } from "next-auth/react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Registrations",
    href: "/admin/registrations",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={toggleSidebar}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/admin" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl glow-text">Eventsphere</span>
            </Link>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className={cn("w-full justify-start", pathname === item.href && "bg-muted")}>
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Button>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Exit Admin
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

