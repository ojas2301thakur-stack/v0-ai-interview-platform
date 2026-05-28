"use client"

import Link from "next/link"
import { AnimatedButton } from "@/components/animated-button"
import { ArrowRight, Sparkles, Play } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground mb-8">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>AI-Powered Interview Practice</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ace your next
          <br />
          <span className="text-accent">job interview.</span>
        </motion.h1>

        <motion.p 
          className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Practice with our AI interviewer, get real-time feedback, and build the confidence 
          you need to land your dream job.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/interview/setup">
            <AnimatedButton size="lg" className="gap-2" hapticIntensity="medium">
              Start Practicing
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </Link>
          <Link href="/prep">
            <AnimatedButton size="lg" variant="outline" className="gap-2">
              <Play className="h-4 w-4" />
              Prep Questions
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Feature highlights instead of dummy stats */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { title: "Adaptive AI", description: "Questions tailored to your experience level" },
            { title: "Instant Feedback", description: "Real-time analysis of your responses" },
            { title: "Track Progress", description: "Visual reports to measure improvement" },
          ].map((feature) => (
            <div key={feature.title} className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="text-lg font-semibold text-foreground">{feature.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{feature.description}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
