import { Output, streamText } from "ai"
import { z } from "zod"

export const maxDuration = 60

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

export async function POST(req: Request) {
  const { role, experience, count = 5 }: { role: string; experience: string; count?: number } = await req.json()

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

  const experienceLabels: Record<string, string> = {
    entry: "entry-level (0-2 years)",
    mid: "mid-level (3-5 years)",
    senior: "senior (6-10 years)",
    lead: "lead/manager (10+ years)",
  }

  const roleLabel = roleLabels[role] || "General"
  const expLabel = experienceLabels[experience] || "mid-level"

  const result = streamText({
    model: "openai/gpt-5",
    output: Output.object({ schema: prepQuestionSchema }),
    prompt: `Generate ${count} realistic interview questions for a ${roleLabel} position at ${expLabel} level.

Include a mix of:
- Behavioral questions (past experiences, teamwork, challenges)
- Technical questions (role-specific knowledge and skills)
- Situational questions (hypothetical scenarios)
- Cultural fit questions (values, work style)

For each question, provide:
- A unique ID (use format like "q1", "q2", etc.)
- The actual interview question
- The category (behavioral, technical, situational, or cultural)
- Difficulty level (easy, medium, or hard)
- 2-3 practical tips for answering
- A sample strong answer (2-3 sentences)

Make questions realistic and commonly asked in actual interviews.`,
    abortSignal: req.signal,
  })

  return result.toTextStreamResponse()
}
