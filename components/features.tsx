"use client"

import { motion } from "framer-motion"
import { 
  MessageSquare, 
  BarChart3, 
  Brain, 
  Target,
  Clock,
  Shield
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Real-time AI Conversations",
    description: "Natural, flowing interviews that adapt to your responses just like a real interviewer would."
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Get comprehensive feedback on your answers, body language cues, and areas for improvement."
  },
  {
    icon: Brain,
    title: "Smart Question Generation",
    description: "Questions tailored to your target role, experience level, and industry standards."
  },
  {
    icon: Target,
    title: "Role-Specific Practice",
    description: "Practice for software engineering, product management, design, and more."
  },
  {
    icon: Clock,
    title: "Practice Anytime",
    description: "No scheduling needed. Practice whenever you want, as many times as you need."
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your interview data is encrypted and never shared. Practice with complete confidence."
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools you need to prepare for any interview.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
