"use client"

import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/animated-button"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with interview practice",
    features: [
      "3 practice interviews per month",
      "Basic AI feedback",
      "5 question categories",
      "Email support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious job seekers",
    features: [
      "Unlimited practice interviews",
      "Advanced AI analysis",
      "All question categories",
      "Performance analytics",
      "Priority support",
      "Custom scenarios"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team management",
      "Custom branding",
      "API access",
      "Dedicated support",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your interview preparation needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative p-8 rounded-xl border ${
                plan.popular 
                  ? "border-accent bg-accent/5" 
                  : "border-border bg-card"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/interview/setup">
                <AnimatedButton 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  hapticIntensity={plan.popular ? "medium" : "light"}
                >
                  {plan.cta}
                </AnimatedButton>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
