import clientPromise from "./mongodb"

export async function connectToDatabase() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return { client, db }
}

// Events Collection
export async function getEvents(filter = {}, limit = 0) {
  const { db } = await connectToDatabase()
  return db.collection("events").find(filter).limit(limit).sort({ date: 1 }).toArray()
}

export async function getEventById(id: string) {
  const { db } = await connectToDatabase()
  return db.collection("events").findOne({ _id: id })
}

export async function createEvent(eventData: any) {
  const { db } = await connectToDatabase()
  return db.collection("events").insertOne(eventData)
}

export async function updateEvent(id: string, eventData: any) {
  const { db } = await connectToDatabase()
  return db.collection("events").updateOne({ _id: id }, { $set: eventData })
}

export async function deleteEvent(id: string) {
  const { db } = await connectToDatabase()
  return db.collection("events").deleteOne({ _id: id })
}

// Registrations Collection
export async function getRegistrations(filter = {}) {
  const { db } = await connectToDatabase()
  return db.collection("registrations").find(filter).sort({ registrationDate: -1 }).toArray()
}

export async function getRegistrationById(id: string) {
  const { db } = await connectToDatabase()
  return db.collection("registrations").findOne({ _id: id })
}

export async function createRegistration(registrationData: any) {
  const { db } = await connectToDatabase()
  return db.collection("registrations").insertOne(registrationData)
}

export async function updateRegistration(id: string, registrationData: any) {
  const { db } = await connectToDatabase()
  return db.collection("registrations").updateOne({ _id: id }, { $set: registrationData })
}

export async function deleteRegistration(id: string) {
  const { db } = await connectToDatabase()
  return db.collection("registrations").deleteOne({ _id: id })
}

// Users Collection
export async function getUserByEmail(email: string) {
  const { db } = await connectToDatabase()
  return db.collection("users").findOne({ email })
}

export async function createUser(userData: any) {
  const { db } = await connectToDatabase()
  return db.collection("users").insertOne(userData)
}

