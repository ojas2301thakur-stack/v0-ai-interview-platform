"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
  Loader2
} from "lucide-react"

function ResultsContent() {
  const searchParams = useSearchParams()
  
  const role = searchParams.get("role") || "software-engineer"
  const experience = searchParams.get("experience") || "mid"
  const type = searchParams.get("type") || "mixed"
  const duration = parseInt(searchParams.get("duration") || "0")
  const questions = parseInt(searchParams.get("questions") || "0")

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

  // Mock scores - in a real app, these would come from AI analysis
  const scores = {
    overall: 78,
    communication: 82,
    technicalKnowledge: 75,
    problemSolving: 80,
    confidence: 72,
  }

  const strengths = [
    "Clear and structured responses",
    "Good use of specific examples",
    "Demonstrated problem-solving approach",
    "Showed enthusiasm for the role",
  ]

  const improvements = [
    "Could provide more quantifiable results",
    "Consider elaborating on team collaboration experiences",
    "Practice the STAR method for behavioral questions",
  ]

  const tips = [
    "Research the company culture before your next interview",
    "Prepare 2-3 questions to ask the interviewer",
    "Practice timing your responses (aim for 2-3 minutes per answer)",
    "Review common follow-up questions for your responses",
  ]

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
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/interview/setup">
                <Button size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Practice Again
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Interview Complete!</h1>
          <p className="text-muted-foreground">
            Great job completing your {roleLabels[role]} mock interview. Here&apos;s your performance summary.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{scores.overall}%</p>
                  <p className="text-xs text-muted-foreground">Overall Score</p>
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Performance Breakdown */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Breakdown</CardTitle>
              <CardDescription>How you performed across different areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Communication", score: scores.communication },
                { label: "Technical Knowledge", score: scores.technicalKnowledge },
                { label: "Problem Solving", score: scores.problemSolving },
                { label: "Confidence", score: scores.confidence },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.score}%</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Quick Tips
              </CardTitle>
              <CardDescription>Suggestions for your next interview</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Strengths
              </CardTitle>
              <CardDescription>What you did well</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Focus on these for better performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span className="text-foreground">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Ready to improve your score?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Practice makes perfect. Start another interview to work on your areas for improvement.
              </p>
              <Link href="/interview/setup">
                <Button size="lg" className="gap-2">
                  Start New Interview
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
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
