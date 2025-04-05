"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, ArrowLeft, Upload, Plus, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Category options
const categories = ["Technology", "Music", "Career", "Academic", "Cultural", "Business", "Sports", "Arts"]

export default function NewEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scheduleItems, setScheduleItems] = useState([{ time: "", activity: "" }])
  const [speakers, setSpeakers] = useState([{ name: "", role: "" }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin/events")
    }, 1500)
  }

  const addScheduleItem = () => {
    setScheduleItems([...scheduleItems, { time: "", activity: "" }])
  }

  const removeScheduleItem = (index: number) => {
    const newItems = [...scheduleItems]
    newItems.splice(index, 1)
    setScheduleItems(newItems)
  }

  const updateScheduleItem = (index: number, field: string, value: string) => {
    const newItems = [...scheduleItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setScheduleItems(newItems)
  }

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "", role: "" }])
  }

  const removeSpeaker = (index: number) => {
    const newSpeakers = [...speakers]
    newSpeakers.splice(index, 1)
    setSpeakers(newSpeakers)
  }

  const updateSpeaker = (index: number, field: string, value: string) => {
    const newSpeakers = [...speakers]
    newSpeakers[index] = { ...newSpeakers[index], [field]: value }
    setSpeakers(newSpeakers)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link
          href="/admin/events"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
          <p className="text-muted-foreground">Add a new event to your platform</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Basic information about the event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" placeholder="Enter event title" required />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input id="organizer" placeholder="Department or organization" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the event" className="min-h-[120px]" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Event Image</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop an image, or click to browse</p>
                  <p className="text-xs text-muted-foreground">Recommended size: 1200 x 600px. Max 5MB.</p>
                  <Input id="image" type="file" accept="image/*" className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    Select Image
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" placeholder="Leave empty or 0 for free events" min="0" step="1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Date & Location</CardTitle>
              <CardDescription>When and where the event will take place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  <Input id="date" type="date" required />
                </div>
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <Input id="startTime" type="time" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <Input id="endTime" type="time" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  <Input id="location" placeholder="Event venue" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="Maximum number of attendees" min="1" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Speakers & Schedule</CardTitle>
              <CardDescription>Who will be speaking and the event timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Speakers</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSpeaker}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Speaker
                  </Button>
                </div>

                {speakers.map((speaker, index) => (
                  <div key={index} className="space-y-2 border rounded-md p-3 relative">
                    {speakers.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeSpeaker(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor={`speaker-name-${index}`}>Name</Label>
                      <Input
                        id={`speaker-name-${index}`}
                        value={speaker.name}
                        onChange={(e) => updateSpeaker(index, "name", e.target.value)}
                        placeholder="Speaker name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`speaker-role-${index}`}>Role/Title</Label>
                      <Input
                        id={`speaker-role-${index}`}
                        value={speaker.role}
                        onChange={(e) => updateSpeaker(index, "role", e.target.value)}
                        placeholder="Speaker role or title"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Schedule</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addScheduleItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>

                {scheduleItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 border rounded-md p-3 relative">
                    {scheduleItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeScheduleItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor={`schedule-time-${index}`}>Time</Label>
                      <Input
                        id={`schedule-time-${index}`}
                        value={item.time}
                        onChange={(e) => updateScheduleItem(index, "time", e.target.value)}
                        placeholder="e.g. 10:00 AM - 11:00 AM"
                      />
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label htmlFor={`schedule-activity-${index}`}>Activity</Label>
                      <Input
                        id={`schedule-activity-${index}`}
                        value={item.activity}
                        onChange={(e) => updateScheduleItem(index, "activity", e.target.value)}
                        placeholder="Description of activity"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Registration Settings</CardTitle>
              <CardDescription>Configure how students can register for this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="registrationStart">Registration Start Date</Label>
                  <Input id="registrationStart" type="date" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationEnd">Registration End Date</Label>
                  <Input id="registrationEnd" type="date" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNotes">Registration Notes</Label>
                <Textarea id="registrationNotes" placeholder="Any special instructions for registration" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/admin/events")}>
                Cancel
              </Button>
              <Button type="submit" className="glow" disabled={isSubmitting}>
                {isSubmitting ? "Creating Event..." : "Create Event"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

