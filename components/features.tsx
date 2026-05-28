"use client"

import { motion } from "framer-motion"
import { 
  MessageSquare, 
  BarChart3, 
  Brain, 
  Target,
  Clock,
  Shield,
  Sparkles
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Intelligent AI Interviewer",
    description: "Our AI adapts to your responses in real-time, asking follow-up questions just like a human interviewer would.",
    gradient: "from-violet-500/20 to-purple-500/20"
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Practice with fluid, contextual dialogue that feels authentic and prepares you for real interviews.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Detailed visualizations showing your strengths, areas for improvement, and progress over time.",
    gradient: "from-emerald-500/20 to-green-500/20"
  },
  {
    icon: Target,
    title: "Role-Specific Questions",
    description: "Tailored questions for software engineering, product management, design, data science, and more.",
    gradient: "from-orange-500/20 to-amber-500/20"
  },
  {
    icon: Clock,
    title: "Practice Anytime",
    description: "No scheduling required. Practice whenever inspiration strikes, day or night, as many times as needed.",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your interview data stays private. We never share your responses or personal information.",
    gradient: "from-teal-500/20 to-cyan-500/20"
  }
]

export function Features() {
  return (
    <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[150px] opacity-30" />
      
      <div className="mx-auto max-w-7xl relative">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground mb-6 glass"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Powerful Features</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Everything you need to <span className="text-gradient">succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our comprehensive platform provides all the tools and feedback you need to master any interview.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative p-8 rounded-2xl border border-border/50 bg-card/30 glass overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative">
                <motion.div 
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent mb-6 group-hover:bg-accent/20 transition-colors"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <feature.icon className="h-7 w-7" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
