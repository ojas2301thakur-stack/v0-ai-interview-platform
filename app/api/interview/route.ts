import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'

export const maxDuration = 60

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
  "entry": "entry-level (0-2 years experience)",
  "mid": "mid-level (3-5 years experience)",
  "senior": "senior (6-10 years experience)",
  "lead": "lead/manager level (10+ years experience)",
}

const typeLabels: Record<string, string> = {
  "behavioral": "behavioral interview questions focusing on past experiences, teamwork, leadership, and problem-solving situations",
  "technical": "technical interview questions specific to the role, including problem-solving, domain knowledge, and hands-on scenarios",
  "mixed": "a mix of behavioral and technical questions",
}

export async function POST(req: Request) {
  const { messages, role, experience, type, company }: { 
    messages: UIMessage[]
    role: string
    experience: string
    type: string
    company?: string
  } = await req.json()

  const roleLabel = roleLabels[role] || "General"
  const expLabel = experienceLabels[experience] || "mid-level"
  const typeLabel = typeLabels[type] || "a mix of behavioral and technical questions"
  const companyContext = company ? ` The candidate is targeting ${company}.` : ""

  const systemPrompt = `You are an experienced professional interviewer conducting a job interview for a ${roleLabel} position. The candidate is ${expLabel}.${companyContext}

Your task is to conduct ${typeLabel}.

Interview Guidelines:
1. Start by greeting the candidate warmly and explaining how the interview will proceed
2. Ask one question at a time and wait for the candidate's response
3. Listen actively and ask relevant follow-up questions based on their answers
4. Keep questions realistic and commonly asked in actual interviews
5. Maintain a professional but friendly tone
6. After each answer, you may provide brief encouragement or transition naturally to the next question
7. If the candidate's answer is vague or incomplete, ask probing follow-up questions
8. Keep track of which areas you've covered to ensure a comprehensive interview

After approximately 5-7 questions (or when the conversation naturally concludes), offer to wrap up and ask if the candidate has any questions for you.

Important: Be conversational and natural. This should feel like a real interview, not a quiz.`

  const result = streamText({
    model: 'openai/gpt-5',
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
