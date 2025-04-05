import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export const metadata = {
  title: "Admin Dashboard - Eventsphere",
  description: "Manage events and registrations for Eventsphere",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  )
}

