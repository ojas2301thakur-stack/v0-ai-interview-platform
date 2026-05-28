"use client"

import Link from "next/link"
import { AnimatedButton } from "@/components/animated-button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <motion.div 
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-bold text-accent-foreground">AI</span>
              </motion.div>
              <span className="text-lg font-semibold text-foreground">InterviewAI</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/prep" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Prep Questions
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/interview/setup">
              <AnimatedButton variant="ghost" size="sm">Sign in</AnimatedButton>
            </Link>
            <Link href="/interview/setup">
              <AnimatedButton size="sm" hapticIntensity="medium">Get Started</AnimatedButton>
            </Link>
          </div>
          <motion.button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden border-t border-border bg-background"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 space-y-3">
              <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">
                How it Works
              </Link>
              <Link href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/prep" className="block text-sm text-muted-foreground hover:text-foreground">
                Prep Questions
              </Link>
              <div className="pt-3 flex flex-col gap-2">
                <Link href="/interview/setup">
                  <AnimatedButton variant="ghost" size="sm" className="w-full">Sign in</AnimatedButton>
                </Link>
                <Link href="/interview/setup">
                  <AnimatedButton size="sm" className="w-full" hapticIntensity="medium">Get Started</AnimatedButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
