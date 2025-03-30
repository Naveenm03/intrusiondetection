"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsFeed } from "@/components/news-feed"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative container mx-auto px-4 py-8">
        <FloatingIcons />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Cybersecurity News</CardTitle>
              <CardDescription>
                Stay updated with the latest news about cybersecurity, intrusion detection, and prevention measures.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsFeed />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

