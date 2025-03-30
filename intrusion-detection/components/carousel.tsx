"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface CarouselProps {
  attackType: string
}

export function Carousel({ attackType }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  const dosCards = [
    {
      title: "Introduction to DoS Attacks",
      description: "Learn about the basics of Denial of Service attacks and their impact on systems.",
      onClick: () => router.push("/introductiondos"),
      textColor: "text-green-500"
    },
    {
      title: "Types of DoS Attacks", 
      description: "Explore different types of DoS attacks and how they work.",
      onClick: () => router.push("/typesdos"),
      textColor: "text-green-500"
    },
    {
      title: "DoS Detection Parameters",
      description: "Understand the parameters used to detect DoS attacks in our system.",
      onClick: () => router.push("/glossarydos"),
      textColor: "text-green-500"
    },
  ]

  const aptCards = [
    {
      title: "Introduction to APT Attacks",
      description: "Learn about Advanced Persistent Threats and their characteristics.",
      onClick: () => router.push("/introductionapt"),
      textColor: "text-red-500"
    },
    {
      title: "Types of APT Attacks",
      description: "Explore different types of APT attacks and their techniques.",
      onClick: () => router.push("/typesapt"),
      textColor: "text-red-500"
    },
    {
      title: "APT Detection Parameters",
      description: "Understand the parameters used to detect APT attacks in our system.",
      onClick: () => router.push("/glossaryapt"),
      textColor: "text-red-500"
    },
  ]

  const zerodayCards = [
    {
      title: "Introduction to Zero Day Attacks",
      description: "Learn about zero-day vulnerabilities and their impact.",
      onClick: () => router.push("/introductionzeroday"),
      textColor: "text-yellow-500"
    },
    {
      title: "Types of Zero Day Attacks",
      description: "Explore different types of zero-day attacks and their methods.",
      onClick: () => router.push("/typeszeroday"),
      textColor: "text-yellow-500"
    },
    {
      title: "Zero Day Detection Parameters",
      description: "Understand the parameters used to detect zero-day attacks in our system.",
      onClick: () => router.push("/glossaryzeroday"),
      textColor: "text-yellow-500"
    },
  ]

  const ddosCards = [
    {
      title: "Introduction to DDoS Attacks",
      description: "Learn about Distributed Denial of Service attacks and their impact.",
      onClick: () => router.push("/introductionddos"),
      textColor: "text-green-500"
    },
    {
      title: "Types of DDoS Attacks",
      description: "Explore different types of DDoS attacks and their techniques.",
      onClick: () => router.push("/typesddos"),
      textColor: "text-green-500"
    },
    {
      title: "DDoS Detection Parameters",
      description: "Understand the parameters used to detect DDoS attacks in our system.",
      onClick: () => router.push("/glossaryddos"),
      textColor: "text-green-500"
    },
  ]

  const getCards = () => {
    switch (attackType) {
      case "dos":
        return dosCards
      case "apt":
        return aptCards
      case "zeroday":
        return zerodayCards
      case "ddos":
        return ddosCards
      default:
        return []
    }
  }

  const cards = getCards()

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  const previous = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
  }

  if (cards.length === 0) {
    return null
  }

  const getDotColor = () => {
    switch (attackType) {
      case "dos":
      case "ddos":
        return "bg-green-500"
      case "apt":
        return "bg-red-500"
      case "zeroday":
        return "bg-yellow-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto px-8">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={previous}
          className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:bg-foreground/5 dark:hover:bg-foreground/10 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={next}
          className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:bg-foreground/5 dark:hover:bg-foreground/10 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="w-full"
          >
            <Card
              className="cursor-pointer border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm card-hover"
              onClick={cards[currentIndex].onClick}
            >
              <CardHeader className="space-y-4 text-center">
                <CardTitle className={`text-2xl font-bold tracking-tight ${cards[currentIndex].textColor}`}>
                  {cards[currentIndex].title}
                </CardTitle>
                <CardDescription className={`text-lg ${cards[currentIndex].textColor}`}>
                  {cards[currentIndex].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-3">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentIndex(index)
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? `w-8 ${getDotColor()}` : `w-2.5 bg-muted hover:${getDotColor()}`
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
