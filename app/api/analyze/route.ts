import { Output, streamText } from "ai"
import { z } from "zod"

export const maxDuration = 60

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

export async function POST(req: Request) {
  const { 
    role, 
    experience, 
    type, 
    duration, 
    questionCount,
    conversationSummary 
  }: { 
    role: string
    experience: string
    type: string
    duration: number
    questionCount: number
    conversationSummary?: string
  } = await req.json()

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
    entry: "entry-level",
    mid: "mid-level",
    senior: "senior",
    lead: "lead/manager",
  }

  const roleLabel = roleLabels[role] || "General"
  const expLabel = experienceLabels[experience] || "mid-level"

  const result = streamText({
    model: "openai/gpt-5",
    output: Output.object({ schema: analysisSchema }),
    prompt: `Analyze the following mock interview session and provide detailed feedback:

Interview Details:
- Role: ${roleLabel}
- Experience Level: ${expLabel}
- Interview Type: ${type}
- Duration: ${Math.floor(duration / 60)} minutes
- Questions Answered: ${questionCount}
${conversationSummary ? `\nConversation Summary:\n${conversationSummary}` : ""}

Based on this ${type} interview for a ${expLabel} ${roleLabel} position, generate a realistic performance analysis. Consider typical interview expectations for this role and level.

Provide:
1. An overall score (0-100) reflecting overall interview performance
2. Individual scores for:
   - Communication: How well they articulated their thoughts
   - Technical Knowledge: Role-specific expertise demonstrated
   - Problem Solving: Approach to challenges and questions
   - Confidence: Presentation and self-assurance
   - Clarity: How clear and structured their responses were
3. 4-5 specific strengths observed
4. 3-4 areas for improvement
5. 4-5 actionable tips for the next interview
6. A brief 2-3 sentence summary of the performance

Make the feedback constructive, specific, and actionable. Scores should be realistic (most candidates score between 60-85 unless exceptional or poor).`,
    abortSignal: req.signal,
  })

  return result.toTextStreamResponse()
}
