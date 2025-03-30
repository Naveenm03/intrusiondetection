"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { DosAttackForm } from "@/components/attack-forms/dos-attack-form"
import { AptAttackForm } from "@/components/attack-forms/apt-attack-form"
import { ZerodayAttackForm } from "@/components/attack-forms/zeroday-attack-form"
import { DdosAttackForm } from "@/components/attack-forms/ddos-attack-form"
import { ParallaxHero } from "@/components/parallax-hero"
import { Carousel } from "@/components/carousel"
import { Navbar } from "@/components/navbar"
import { Particles } from "@/components/3d/particles"
import { UITheme } from "@/components/ui-theme"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dos")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <UITheme />
      <Navbar />
      <div className="relative mt-8 space-y-8">
        <Particles />

        <ParallaxHero
          title="Intrusion Detection System"
          description="Monitor and detect various types of network attacks"
        />

        <Carousel attackType={activeTab} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <Tabs defaultValue="dos" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="dos"
                className="data-[state=active]:bg-success data-[state=active]:text-success-foreground"
              >
                DoS Attack
              </TabsTrigger>
              <TabsTrigger
                value="apt"
                className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
              >
                APT Attack
              </TabsTrigger>
              <TabsTrigger
                value="zeroday"
                className="data-[state=active]:bg-warning data-[state=active]:text-warning-foreground"
              >
                Zero Day Attack
              </TabsTrigger>
              <TabsTrigger
                value="ddos"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                DDoS Attack
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dos" className="space-y-4">
              <DosAttackForm />
            </TabsContent>

            <TabsContent value="apt" className="space-y-4">
              <AptAttackForm />
            </TabsContent>

            <TabsContent value="zeroday" className="space-y-4">
              <ZerodayAttackForm />
            </TabsContent>

            <TabsContent value="ddos" className="space-y-4">
              <DdosAttackForm />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </>
  )
}

