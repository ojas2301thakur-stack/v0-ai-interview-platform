"use client"

import { motion } from "framer-motion"
import { Settings, MessageSquare, BarChart, Rocket } from "lucide-react"

const steps = [
  {
    icon: Settings,
    title: "Configure Your Interview",
    description: "Select your target role, experience level, and focus areas. We customize everything to match your needs.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: MessageSquare,
    title: "Practice with AI",
    description: "Engage in realistic conversations with our AI interviewer that adapts and responds naturally.",
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: BarChart,
    title: "Review Your Performance",
    description: "Get detailed analytics, visual reports, and actionable feedback to improve your skills.",
    color: "from-emerald-500 to-green-500"
  },
  {
    icon: Rocket,
    title: "Land Your Dream Job",
    description: "Walk into your real interview with confidence, preparation, and the skills to succeed.",
    color: "from-orange-500 to-amber-500"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-secondary/20">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="mx-auto max-w-7xl relative">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get started in minutes and begin improving your interview skills today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="text-center">
                <motion.div 
                  className="relative inline-flex mb-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                    <step.icon className="h-9 w-9" />
                  </div>
                  <motion.span 
                    className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: index * 0.15 + 0.3 }}
                  >
                    {index + 1}
                  </motion.span>
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
