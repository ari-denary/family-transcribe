import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { text } = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that provides clear, concise, and unambiguous summaries on topics related to college admissions, finances, scholarships, etc. The summaries should be straightforward and easily translatable, avoiding jargon and complex sentences.',
      },
      {
        role: 'user',
        content: text,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return NextResponse.json({
    summary: completion.choices[0].message.content,
  });
}
