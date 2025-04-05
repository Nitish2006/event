// This is a script to create an admin user
// Run with: node scripts/create-admin.js

const { MongoClient } = require("mongodb")
const bcrypt = require("bcrypt")
require("dotenv").config()

async function createAdminUser() {
  if (!process.env.MONGODB_URI) {
    console.error("Please add your MongoDB URI to .env.local")
    return
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(process.env.MONGODB_DB)
    const usersCollection = db.collection("users")

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@eventsphere.edu" })

    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10)

    const adminUser = {
      name: "Admin User",
      email: "admin@eventsphere.edu",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date().toISOString(),
    }

    const result = await usersCollection.insertOne(adminUser)
    console.log(`Admin user created with ID: ${result.insertedId}`)
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

createAdminUser()

