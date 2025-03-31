"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Shield, AlertTriangle, Zap, LogOut, Newspaper, Map } from "lucide-react"
import { motion } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link href="/dashboard" className="flex items-center space-x-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-wide">Intrusion Detection</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`min-w-[110px] transition-colors duration-200 hover:bg-accent ${pathname === "/dashboard" ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link href="/dashboard">
                <Shield className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`min-w-[110px] transition-colors duration-200 hover:bg-accent ${pathname === "/results" ? "bg-destructive/10 text-destructive" : ""}`}
              asChild
            >
              <Link href="/results">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Results
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`min-w-[110px] transition-colors duration-200 hover:bg-accent ${pathname === "/preventive-measures" ? "bg-warning/10 text-warning" : ""}`}
              asChild
            >
              <Link href="/preventive-measures">
                <Zap className="mr-2 h-4 w-4" />
                Prevention
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`min-w-[110px] transition-colors duration-200 hover:bg-accent ${pathname === "/about" ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link href="/about">
                <Shield className="mr-2 h-4 w-4" />
                About Us
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`min-w-[110px] transition-colors duration-200 hover:bg-accent ${pathname === "/news" ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link href="/news">
                <Newspaper className="mr-2 h-4 w-4" />
                News
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`min-w-[110px] transition-colors duration-200 hover:bg-accent ${pathname === "/heatmap" ? "bg-primary/10 text-primary" : ""}`}
              asChild
            >
              <Link href="/heatmap">
                <Map className="mr-2 h-4 w-4" />
                Heatmap
              </Link>
            </Button>
            <ModeToggle />

            <Button
              variant="ghost"
              size="sm"
              className="min-w-[110px] transition-colors duration-200 hover:bg-accent"
              asChild
            >
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
