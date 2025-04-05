"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample data for the chart
const data = [
  { name: "Apr 1", registrations: 12 },
  { name: "Apr 2", registrations: 8 },
  { name: "Apr 3", registrations: 15 },
  { name: "Apr 4", registrations: 10 },
  { name: "Apr 5", registrations: 7 },
  { name: "Apr 6", registrations: 5 },
  { name: "Apr 7", registrations: 9 },
  { name: "Apr 8", registrations: 11 },
  { name: "Apr 9", registrations: 14 },
  { name: "Apr 10", registrations: 18 },
  { name: "Apr 11", registrations: 21 },
  { name: "Apr 12", registrations: 16 },
  { name: "Apr 13", registrations: 12 },
  { name: "Apr 14", registrations: 10 },
]

export default function AdminEventStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          cursor={{ fill: "rgba(149, 0, 255, 0.1)" }}
        />
        <Bar dataKey="registrations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

