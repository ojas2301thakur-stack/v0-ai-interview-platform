"use client"

import { motion } from "framer-motion"
import { Settings, MessageSquare, BarChart, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Settings,
    title: "Set Up Your Interview",
    description: "Choose your target role, experience level, and the type of questions you want to practice."
  },
  {
    icon: MessageSquare,
    title: "Start the Interview",
    description: "Our AI interviewer will guide you through realistic interview questions, adapting based on your responses."
  },
  {
    icon: BarChart,
    title: "Get Visual Feedback",
    description: "Receive detailed analysis with interactive charts showing your strengths and areas for improvement."
  },
  {
    icon: CheckCircle,
    title: "Track Your Progress",
    description: "Review your performance over time and see how your interview skills improve with practice."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and begin improving your interview skills today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className="relative inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                  <step.icon className="h-7 w-7" />
                </div>
                <motion.span 
                  className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: index * 0.1 + 0.3 }}
                >
                  {index + 1}
                </motion.span>
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
