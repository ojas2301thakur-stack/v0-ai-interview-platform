"use client"

import { useState } from "react"
import Link from "next/link"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import { z } from "zod"
import { AnimatedButton } from "@/components/animated-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Loader2, 
  BookOpen,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Code,
  Users,
  Target,
  Heart,
  RefreshCw,
  Download
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const prepQuestionSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      category: z.enum(["behavioral", "technical", "situational", "cultural"]),
      difficulty: z.enum(["easy", "medium", "hard"]),
      tips: z.array(z.string()),
      sampleAnswer: z.string(),
    })
  ),
})

const roles = [
  { id: "software-engineer", label: "Software Engineer", icon: Code },
  { id: "product-manager", label: "Product Manager", icon: Target },
  { id: "designer", label: "Designer", icon: Sparkles },
  { id: "data-analyst", label: "Data Analyst", icon: BookOpen },
  { id: "marketing", label: "Marketing", icon: Users },
  { id: "sales", label: "Sales", icon: Heart },
]

const experienceLevels = [
  { id: "entry", label: "Entry Level" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior" },
  { id: "lead", label: "Lead / Manager" },
]

const categoryIcons = {
  behavioral: Users,
  technical: Code,
  situational: Target,
  cultural: Heart,
}

const categoryColors = {
  behavioral: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  technical: "bg-green-500/10 text-green-500 border-green-500/20",
  situational: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  cultural: "bg-orange-500/10 text-orange-500 border-orange-500/20",
}

const difficultyColors = {
  easy: "bg-emerald-500/10 text-emerald-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  hard: "bg-red-500/10 text-red-500",
}

export default function PrepQuestionsPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [showSetup, setShowSetup] = useState(true)

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/prep-questions",
    schema: prepQuestionSchema,
  })

  const handleGenerate = () => {
    if (!selectedRole || !selectedExperience) return
    setShowSetup(false)
    submit({ role: selectedRole, experience: selectedExperience, count: 8 })
  }

  const handleRegenerate = () => {
    submit({ role: selectedRole, experience: selectedExperience, count: 8 })
  }

  const handleReset = () => {
    setShowSetup(true)
    setSelectedRole("")
    setSelectedExperience("")
    setExpandedQuestion(null)
  }

  const questions = object?.questions || []
  const categoryStats = questions.reduce(
    (acc, q) => {
      if (q?.category) {
        acc[q.category] = (acc[q.category] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="text-sm font-bold text-accent-foreground">AI</span>
              </div>
              <span className="text-lg font-semibold text-foreground">InterviewAI</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/">
                <AnimatedButton variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Home
                </AnimatedButton>
              </Link>
              <Link href="/interview/setup">
                <AnimatedButton size="sm" className="gap-2">
                  Practice Interview
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {showSetup ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">Interview Prep Questions</h1>
                <p className="text-muted-foreground">
                  Generate personalized interview questions with tips and sample answers
                </p>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Select Your Target Role</CardTitle>
                  <CardDescription>Choose the role you&apos;re preparing for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selectedRole === role.id
                            ? "border-accent bg-accent/10"
                            : "border-border bg-card hover:border-muted-foreground"
                        }`}
                      >
                        <role.icon className={`h-5 w-5 mb-2 ${selectedRole === role.id ? "text-accent" : "text-muted-foreground"}`} />
                        <span className="text-sm font-medium text-foreground">{role.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Experience Level</CardTitle>
                  <CardDescription>Select your experience level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {experienceLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedExperience(level.id)}
                        className={`p-4 rounded-lg border text-center transition-all ${
                          selectedExperience === level.id
                            ? "border-accent bg-accent/10"
                            : "border-border bg-card hover:border-muted-foreground"
                        }`}
                      >
                        <span className="text-sm font-medium text-foreground">{level.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <AnimatedButton 
                className="w-full gap-2" 
                size="lg"
                onClick={handleGenerate}
                disabled={!selectedRole || !selectedExperience}
                hapticIntensity="medium"
              >
                <Sparkles className="h-4 w-4" />
                Generate Questions
              </AnimatedButton>
            </motion.div>
          ) : (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">Your Prep Questions</h1>
                  <p className="text-sm text-muted-foreground">
                    {roles.find(r => r.id === selectedRole)?.label} • {experienceLevels.find(e => e.id === selectedExperience)?.label}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <AnimatedButton variant="outline" size="sm" onClick={handleReset} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Change Selection
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    onClick={isLoading ? stop : handleRegenerate}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Stop
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4" />
                        Regenerate
                      </>
                    )}
                  </AnimatedButton>
                </div>
              </div>

              {/* Category Stats */}
              {questions.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {(["behavioral", "technical", "situational", "cultural"] as const).map((category) => {
                    const Icon = categoryIcons[category]
                    const count = categoryStats[category] || 0
                    return (
                      <Card key={category} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${categoryColors[category]}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-foreground">{count}</p>
                            <p className="text-xs text-muted-foreground capitalize">{category}</p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}

              {/* Loading State */}
              {isLoading && questions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-accent mb-4" />
                  <p className="text-muted-foreground">Generating personalized questions...</p>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-4">
                {questions.map((question, index) => {
                  if (!question) return null
                  const Icon = question.category ? categoryIcons[question.category] : BookOpen
                  const isExpanded = expandedQuestion === question.id
                  
                  return (
                    <motion.div
                      key={question.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden">
                        <button
                          className="w-full text-left p-6 hover:bg-secondary/30 transition-colors"
                          onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className={`p-2 rounded-lg shrink-0 ${question.category ? categoryColors[question.category] : "bg-muted"}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground mb-2">{question.question}</p>
                                <div className="flex flex-wrap gap-2">
                                  {question.category && (
                                    <Badge variant="outline" className={categoryColors[question.category]}>
                                      {question.category}
                                    </Badge>
                                  )}
                                  {question.difficulty && (
                                    <Badge className={difficultyColors[question.difficulty]}>
                                      {question.difficulty}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="shrink-0 text-muted-foreground">
                              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-border bg-secondary/20">
                                {/* Tips */}
                                {question.tips && question.tips.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                                      Tips for Answering
                                    </h4>
                                    <ul className="space-y-1">
                                      {question.tips.map((tip, tipIndex) => (
                                        <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                          <span className="text-accent">•</span>
                                          {tip}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Sample Answer */}
                                {question.sampleAnswer && (
                                  <div>
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                                      <BookOpen className="h-4 w-4 text-accent" />
                                      Sample Answer
                                    </h4>
                                    <p className="text-sm text-muted-foreground bg-card/50 p-4 rounded-lg border border-border">
                                      {question.sampleAnswer}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              {/* Loading more indicator */}
              {isLoading && questions.length > 0 && (
                <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Generating more questions...</span>
                </div>
              )}

              {/* CTA */}
              {questions.length > 0 && !isLoading && (
                <Card className="mt-8 bg-accent/5 border-accent/20">
                  <CardContent className="py-8 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Ready to practice?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Put your preparation to the test with a realistic AI-powered mock interview.
                    </p>
                    <Link href={`/interview/setup?role=${selectedRole}&experience=${selectedExperience}`}>
                      <AnimatedButton size="lg" className="gap-2" hapticIntensity="medium">
                        Start Mock Interview
                        <ArrowRight className="h-4 w-4" />
                      </AnimatedButton>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
