"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Send, 
  User, 
  Bot, 
  Clock, 
  Loader2,
  CheckCircle
} from "lucide-react"

function InterviewSessionContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [input, setInput] = useState("")
  const [startTime] = useState(Date.now())
  const [elapsedTime, setElapsedTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const role = searchParams.get("role") || "software-engineer"
  const experience = searchParams.get("experience") || "mid"
  const type = searchParams.get("type") || "mixed"
  const company = searchParams.get("company") || ""

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ 
      api: "/api/interview",
      prepareSendMessagesRequest: ({ messages }) => ({
        body: { messages, role, experience, type, company },
      }),
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Update elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [startTime])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Start interview automatically
  useEffect(() => {
    if (messages.length === 0) {
      sendMessage({ text: "Hello, I'm ready to begin the interview." })
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleEndInterview = () => {
    const params = new URLSearchParams({
      role,
      experience,
      type,
      duration: elapsedTime.toString(),
      questions: Math.floor(messages.filter(m => m.role === "assistant").length).toString()
    })
    router.push(`/interview/results?${params.toString()}`)
  }

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                  <span className="text-sm font-bold text-accent-foreground">AI</span>
                </div>
              </Link>
              <div className="hidden sm:block">
                <h1 className="font-semibold text-foreground">{roleLabels[role]} Interview</h1>
                <p className="text-xs text-muted-foreground capitalize">{type} questions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-mono">{formatTime(elapsedTime)}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleEndInterview}>
                <CheckCircle className="h-4 w-4 mr-2" />
                End Interview
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat messages */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  message.role === "user" 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-secondary text-foreground"
                }`}>
                  {message.role === "user" ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <Card className={`max-w-[80%] p-4 ${
                  message.role === "user" 
                    ? "bg-accent/10 border-accent/20" 
                    : "bg-card"
                }`}>
                  <div className="prose prose-sm prose-invert max-w-none">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <p key={index} className="text-foreground whitespace-pre-wrap m-0">
                            {part.text}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </Card>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <Card className="p-4 bg-card">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </Card>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input area */}
      <div className="border-t border-border bg-card p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response..."
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-[60px] w-[60px]"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </form>
      </div>
    </div>
  )
}

export default function InterviewSession() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    }>
      <InterviewSessionContent />
    </Suspense>
  )
}
