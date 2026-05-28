"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import { z } from "zod"
import { AnimatedButton } from "@/components/animated-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowRight, 
  Clock, 
  MessageSquare, 
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  RotateCcw,
  Home,
  Loader2,
  Brain,
  MessageCircle,
  Zap,
  Eye
} from "lucide-react"
import { motion } from "framer-motion"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"

const analysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  scores: z.object({
    communication: z.number().min(0).max(100),
    technicalKnowledge: z.number().min(0).max(100),
    problemSolving: z.number().min(0).max(100),
    confidence: z.number().min(0).max(100),
    clarity: z.number().min(0).max(100),
  }),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  tips: z.array(z.string()),
  summary: z.string(),
})

function ResultsContent() {
  const searchParams = useSearchParams()
  
  const role = searchParams.get("role") || "software-engineer"
  const experience = searchParams.get("experience") || "mid"
  const type = searchParams.get("type") || "mixed"
  const duration = parseInt(searchParams.get("duration") || "300")
  const questions = parseInt(searchParams.get("questions") || "5")

  const { object, submit, isLoading } = useObject({
    api: "/api/analyze",
    schema: analysisSchema,
  })

  useEffect(() => {
    submit({ 
      role, 
      experience, 
      type, 
      duration, 
      questionCount: questions 
    })
  }, [])

  const roleLabels: Record<string, string> = {
    "software-engineer": "Software Engineer",
    "product-manager": "Product Manager",
    "designer": "Designer",
    "data-analyst": "Data Analyst",
    "marketing": "Marketing",
    "hr": "HR / People Ops",
    "sales": "Sales",
    "other": "General",
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const scores = object?.scores
  const overallScore = object?.overallScore || 0
  const strengths = object?.strengths || []
  const improvements = object?.improvements || []
  const tips = object?.tips || []
  const summary = object?.summary || ""

  const radarData = scores ? [
    { skill: "Communication", value: scores.communication, fullMark: 100 },
    { skill: "Technical", value: scores.technicalKnowledge, fullMark: 100 },
    { skill: "Problem Solving", value: scores.problemSolving, fullMark: 100 },
    { skill: "Confidence", value: scores.confidence, fullMark: 100 },
    { skill: "Clarity", value: scores.clarity, fullMark: 100 },
  ] : []

  const barData = scores ? [
    { name: "Communication", score: scores.communication },
    { name: "Technical", score: scores.technicalKnowledge },
    { name: "Problem Solving", score: scores.problemSolving },
    { name: "Confidence", score: scores.confidence },
    { name: "Clarity", score: scores.clarity },
  ] : []

  const getScoreColor = (score: number) => {
    if (score >= 80) return "hsl(var(--chart-2))"
    if (score >= 60) return "hsl(var(--chart-4))"
    return "hsl(var(--chart-5))"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Very Good"
    if (score >= 70) return "Good"
    if (score >= 60) return "Fair"
    return "Needs Work"
  }

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
                <AnimatedButton variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </AnimatedButton>
              </Link>
              <Link href="/interview/setup">
                <AnimatedButton size="sm" hapticIntensity="medium">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Practice Again
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Interview Complete!</h1>
          <p className="text-muted-foreground">
            Great job completing your {roleLabels[role]} mock interview. Here&apos;s your AI-powered analysis.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <div>
                  {isLoading && !overallScore ? (
                    <Loader2 className="h-6 w-6 animate-spin text-accent" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-foreground">{overallScore}%</p>
                      <p className="text-xs text-muted-foreground">{getScoreLabel(overallScore)}</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatTime(duration)}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{questions}</p>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground capitalize">{type}</p>
                  <p className="text-xs text-muted-foreground">Interview Type</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Text */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 shrink-0">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">AI Summary</h3>
                    <p className="text-muted-foreground">{summary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Skills Overview</CardTitle>
                <CardDescription>Your performance across key interview dimensions</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && !scores ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="skill" 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="value"
                        stroke="hsl(var(--accent))"
                        fill="hsl(var(--accent))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
                <CardDescription>Detailed scores for each category</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && !scores ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        width={100}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Detailed Scores</CardTitle>
              <CardDescription>How you performed across different areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {scores ? (
                <>
                  {[
                    { label: "Communication", score: scores.communication, icon: MessageCircle },
                    { label: "Technical Knowledge", score: scores.technicalKnowledge, icon: Brain },
                    { label: "Problem Solving", score: scores.problemSolving, icon: Zap },
                    { label: "Confidence", score: scores.confidence, icon: Target },
                    { label: "Clarity", score: scores.clarity, icon: Eye },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.label} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.score}%</span>
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </motion.div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Strengths and Improvements */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Strengths
                </CardTitle>
                <CardDescription>What you did well</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && strengths.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-accent" />
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {strengths.map((strength, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + index * 0.05 }}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-foreground">{strength}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>Focus on these for better performance</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && improvements.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-accent" />
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {improvements.map((improvement, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                      >
                        <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="text-foreground">{improvement}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Tips for Your Next Interview
              </CardTitle>
              <CardDescription>Actionable suggestions to improve your performance</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && tips.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-accent" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + index * 0.05 }}
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 shrink-0">
                        <span className="text-xs font-bold text-accent">{index + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Ready to improve your score?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Practice makes perfect. Start another interview to work on your areas for improvement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/prep">
                  <AnimatedButton size="lg" variant="outline" className="gap-2">
                    Review Prep Questions
                  </AnimatedButton>
                </Link>
                <Link href="/interview/setup">
                  <AnimatedButton size="lg" className="gap-2" hapticIntensity="medium">
                    Start New Interview
                    <ArrowRight className="h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default function InterviewResults() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
