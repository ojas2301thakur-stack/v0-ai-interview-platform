"use client"

import Link from "next/link"
import { AnimatedButton } from "@/components/animated-button"
import { ArrowRight, Sparkles, Play, Zap, Shield, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 noise" />
      
      {/* Gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[150px] opacity-40"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-chart-2/20 rounded-full blur-[120px] opacity-30"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent mb-8 glass"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">AI-Powered Interview Practice</span>
            <span className="flex h-2 w-2 rounded-full bg-accent pulse-glow" />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 text-balance leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ace your next
          <br />
          <span className="text-gradient">job interview.</span>
        </motion.h1>

        <motion.p 
          className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-12 text-pretty leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Practice with our AI interviewer, receive instant feedback, and build 
          the confidence you need to land your dream job.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/interview/setup">
            <AnimatedButton size="lg" className="gap-2 px-8 h-14 text-base glow-accent" hapticIntensity="medium">
              Start Practicing
              <ArrowRight className="h-5 w-5" />
            </AnimatedButton>
          </Link>
          <Link href="/prep">
            <AnimatedButton size="lg" variant="outline" className="gap-2 px-8 h-14 text-base glass border-border/50">
              <Play className="h-5 w-5" />
              Prep Questions
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Feature cards */}
        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { 
              icon: Zap, 
              title: "Adaptive AI", 
              description: "Questions dynamically adjust based on your responses and skill level",
              color: "text-yellow-400"
            },
            { 
              icon: Shield, 
              title: "Real-time Feedback", 
              description: "Get instant analysis on your answers with actionable improvements",
              color: "text-accent"
            },
            { 
              icon: TrendingUp, 
              title: "Track Progress", 
              description: "Visual reports and analytics to measure your improvement over time",
              color: "text-emerald-400"
            },
          ].map((feature, index) => (
            <motion.div 
              key={feature.title} 
              className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/80 ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-20 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-sm text-muted-foreground mb-4">Trusted by job seekers worldwide</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
            <span className="ml-2 text-sm text-foreground font-medium">4.9/5</span>
            <span className="text-sm text-muted-foreground ml-1">from 2,500+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
