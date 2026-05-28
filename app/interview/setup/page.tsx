"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  ArrowRight, 
  Briefcase, 
  Code, 
  Palette, 
  LineChart,
  Users,
  Megaphone,
  GraduationCap,
  Rocket
} from "lucide-react"

const roles = [
  { id: "software-engineer", label: "Software Engineer", icon: Code },
  { id: "product-manager", label: "Product Manager", icon: Rocket },
  { id: "designer", label: "Designer", icon: Palette },
  { id: "data-analyst", label: "Data Analyst", icon: LineChart },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "hr", label: "HR / People Ops", icon: Users },
  { id: "sales", label: "Sales", icon: Briefcase },
  { id: "other", label: "Other", icon: GraduationCap },
]

const experienceLevels = [
  { id: "entry", label: "Entry Level", description: "0-2 years" },
  { id: "mid", label: "Mid Level", description: "3-5 years" },
  { id: "senior", label: "Senior", description: "6-10 years" },
  { id: "lead", label: "Lead / Manager", description: "10+ years" },
]

const interviewTypes = [
  { id: "behavioral", label: "Behavioral", description: "Questions about your past experiences and how you handled situations" },
  { id: "technical", label: "Technical", description: "Role-specific technical questions and problem-solving" },
  { id: "mixed", label: "Mixed", description: "A combination of behavioral and technical questions" },
]

export default function InterviewSetup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    interviewType: "",
    targetCompany: "",
    jobDescription: "",
  })

  const handleRoleSelect = (roleId: string) => {
    setFormData({ ...formData, role: roleId })
  }

  const handleExperienceSelect = (expId: string) => {
    setFormData({ ...formData, experience: expId })
  }

  const handleTypeSelect = (typeId: string) => {
    setFormData({ ...formData, interviewType: typeId })
  }

  const handleStartInterview = () => {
    const params = new URLSearchParams({
      role: formData.role,
      experience: formData.experience,
      type: formData.interviewType,
      company: formData.targetCompany,
    })
    router.push(`/interview/session?${params.toString()}`)
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.role !== ""
      case 2: return formData.experience !== ""
      case 3: return formData.interviewType !== ""
      case 4: return true
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="text-sm font-bold text-accent-foreground">AI</span>
              </div>
              <span className="text-lg font-semibold text-foreground">InterviewAI</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 4</span>
            <span className="text-sm text-muted-foreground">{Math.round((step / 4) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-3">What role are you interviewing for?</h1>
              <p className="text-muted-foreground">Select the role that best matches your target position</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`p-6 rounded-xl border text-center transition-all ${
                    formData.role === role.id
                      ? "border-accent bg-accent/10"
                      : "border-border bg-card hover:border-muted-foreground"
                  }`}
                >
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-lg mb-3 ${
                    formData.role === role.id ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground"
                  }`}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-foreground">{role.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Experience Level */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-3">What&apos;s your experience level?</h1>
              <p className="text-muted-foreground">This helps us tailor the questions to your background</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleExperienceSelect(level.id)}
                  className={`p-6 rounded-xl border text-left transition-all ${
                    formData.experience === level.id
                      ? "border-accent bg-accent/10"
                      : "border-border bg-card hover:border-muted-foreground"
                  }`}
                >
                  <span className="font-semibold text-lg text-foreground">{level.label}</span>
                  <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Interview Type */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-3">What type of interview do you want to practice?</h1>
              <p className="text-muted-foreground">Choose the focus area for your practice session</p>
            </div>
            <div className="space-y-4 max-w-2xl mx-auto">
              {interviewTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`w-full p-6 rounded-xl border text-left transition-all ${
                    formData.interviewType === type.id
                      ? "border-accent bg-accent/10"
                      : "border-border bg-card hover:border-muted-foreground"
                  }`}
                >
                  <span className="font-semibold text-lg text-foreground">{type.label}</span>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Additional Details */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-3">Almost ready!</h1>
              <p className="text-muted-foreground">Add any additional context to personalize your interview</p>
            </div>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Optional Details</CardTitle>
                <CardDescription>These help us create more relevant questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Target Company (Optional)</Label>
                  <Input
                    id="company"
                    placeholder="e.g., Google, Stripe, Airbnb"
                    value={formData.targetCompany}
                    onChange={(e) => setFormData({ ...formData, targetCompany: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description (Optional)</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description here for more targeted questions..."
                    rows={5}
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleStartInterview}
              className="gap-2"
            >
              Start Interview
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
