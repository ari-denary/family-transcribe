import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const {text} = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that provides clear and simplified summaries of articles.',
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
  })
}

