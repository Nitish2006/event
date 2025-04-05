"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, CheckCircle, Upload, IndianRupee } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Event } from "@/types"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface EventRegistrationProps {
  event: Event
}

export default function EventRegistration({ event }: EventRegistrationProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    agreeToTerms: false,
  })

  const [paymentMethod, setPaymentMethod] = useState("free")
  const [transactionId, setTransactionId] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      // Redirect to login if not authenticated
      router.push(`/login?callbackUrl=/events/${event._id}`)
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would upload the payment proof to a storage service
      // and get a URL to store in the database

      const registrationData = {
        eventId: event._id,
        studentName: formData.name,
        email: formData.email,
        phone: formData.phone,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === "free" ? "completed" : "pending",
        transactionId: transactionId || undefined,
        // paymentProofUrl would be added here in a real implementation
      }

      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Registration failed")
      }

      setIsRegistered(true)
      toast({
        title: "Success",
        description:
          paymentMethod === "free"
            ? "You have successfully registered for this event"
            : "Registration submitted. Your payment is being verified.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isRegistered) {
    return (
      <Card className="border shadow-lg sticky top-24">
        <CardHeader className="bg-primary/10 border-b">
          <CardTitle className="text-center text-xl">Registration Complete</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <h3 className="text-xl font-medium">You're all set!</h3>
          <p className="text-muted-foreground">
            You have successfully registered for <span className="font-medium text-foreground">{event.title}</span>.
          </p>
          <div className="bg-secondary/50 rounded-lg p-4 text-left space-y-2">
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
              <span>{event.location}</span>
            </div>
            {paymentMethod !== "free" && (
              <div className="flex items-center text-sm mt-2 pt-2 border-t">
                <IndianRupee className="h-4 w-4 mr-2 text-primary" />
                <span>
                  Payment Status: <Badge className="ml-1 bg-yellow-500">Pending Verification</Badge>
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your inbox with all the details.
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="outline" className="w-full">
            Add to Calendar
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Determine if the event is free or paid
  const isFreeEvent = !event.price || event.price === 0

  return (
    <Card className="border shadow-lg sticky top-24">
      <CardHeader className="bg-primary/10 border-b">
        <CardTitle className="text-center text-xl">Register for this Event</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 space-y-2">
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
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <span>{event.attendees} attending</span>
          </div>
          {!isFreeEvent && (
            <div className="flex items-center text-sm font-medium mt-2 pt-2 border-t">
              <IndianRupee className="h-4 w-4 mr-2 text-primary" />
              <span>Registration Fee: ₹{event.price || 0}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>

          {!isFreeEvent && (
            <div className="space-y-3 pt-2 border-t">
              <Label>Payment Method</Label>
              <Tabs defaultValue="upi" className="w-full" onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upi">UPI Payment</TabsTrigger>
                  <TabsTrigger value="manual">Manual Transfer</TabsTrigger>
                </TabsList>
                <TabsContent value="upi" className="space-y-4 pt-4">
                  <div className="flex flex-col items-center space-y-3 p-4 border rounded-md bg-muted/30">
                    <p className="text-sm text-center">
                      Scan the QR code to pay via PhonePe, Google Pay, or any UPI app
                    </p>
                    <div className="relative h-48 w-48 border-4 border-primary/20 rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="UPI QR Code"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium">UPI ID: eventsphere@ybl</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transactionId">UPI Transaction ID</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter UPI reference number"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                    />
                  </div>
                </TabsContent>
                <TabsContent value="manual" className="space-y-4 pt-4">
                  <div className="space-y-2 text-sm border rounded-md p-4 bg-muted/30">
                    <p className="font-medium">Bank Transfer Details:</p>
                    <p>Account Name: Eventsphere</p>
                    <p>Account Number: 1234567890</p>
                    <p>IFSC Code: ABCD0001234</p>
                    <p>Bank: Example Bank</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction Reference</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter transaction reference"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentProof">Upload Payment Proof</Label>
                    <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        {paymentProof ? paymentProof.name : "Click to upload screenshot"}
                      </p>
                      <Input
                        id="paymentProof"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => document.getElementById("paymentProof")?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions
            </Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting || !formData.agreeToTerms || (!isFreeEvent && paymentMethod === "upi" && !transactionId)
          }
          className="w-full glow"
        >
          {isSubmitting ? "Processing..." : "Register Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}

