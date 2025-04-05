import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Computer Science Student",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "Eventsphere has completely transformed how I discover campus events. The interface is intuitive and the registration process is seamless.",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Event Organizer",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "As an event organizer, Eventsphere has made my life so much easier. I can manage registrations, send updates, and track attendance all in one place.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Business Administration Student",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The personalized event recommendations are spot on! I've discovered so many interesting events that I would have missed otherwise.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from students and event organizers who use Eventsphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-secondary/50 border">
              <CardContent className="p-6 space-y-4">
                <Quote className="h-8 w-8 text-primary/40" />
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

