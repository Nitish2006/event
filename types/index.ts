export interface Speaker {
  _id: string
  name: string
  title: string
  bio: string
  avatar?: string
}

export interface ScheduleItem {
  _id: string
  time: string
  activity: string
  description?: string
}

export interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  organizer: string
  capacity: number
  attendees: number
  status: "upcoming" | "completed" | "cancelled"
  image?: string
  price?: number // Added price field
  speakers: Speaker[]
  schedule: ScheduleItem[]
  registrationStart: string
  registrationEnd: string
  registrationNotes?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Registration {
  _id: string
  eventId: string
  userId: string
  studentName: string
  email: string
  phone: string
  status: "confirmed" | "pending" | "cancelled" | "waitlisted"
  registrationDate: string
  paymentMethod?: string // Added payment method
  paymentStatus?: string // Added payment status
  transactionId?: string // Added transaction ID
  paymentProofUrl?: string // Added payment proof URL
  notes?: string
}

