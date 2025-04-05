"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import type { Event } from "@/types"
import { useToast } from "@/hooks/use-toast"

// Category filters
const categories = ["All", "Technology", "Music", "Career", "Academic", "Cultural", "Business"]

export default function FeaturedEvents() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")

        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }

        const data = await response.json()
        setEvents(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load events. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [toast])

  const filteredEvents = activeCategory === "All" ? events : events.filter((event) => event.category === activeCategory)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Events</h2>
            <p className="text-muted-foreground">Discover upcoming events happening on campus</p>
          </div>
          <Link href="/events">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full ${activeCategory === category ? "glow" : ""}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border border-border">
                <div className="h-48 bg-muted animate-pulse"></div>
                <CardContent className="p-4">
                  <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-muted animate-pulse rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                  <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-animation">
            {filteredEvents.map((event) => (
              <Link key={event._id} href={`/events/${event._id}`}>
                <Card className="overflow-hidden border border-border hover:border-primary/50 transition-all event-card">
                  <div className="relative h-48">
                    <Image
                      src={event.image || "/placeholder.svg?height=400&width=600"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary hover:bg-primary/90">{event.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1 text-primary" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <Button size="sm" variant="ghost" className="hover:text-primary">
                      Details
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground">There are no events in this category at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}

