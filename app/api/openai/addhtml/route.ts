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
          'You are tasked with converting translated plain text content into structured HTML. This HTML content will eventually be converted into a PDF. Ensure that the structure is clear and simple, suitable for a static document format. Use appropriate HTML tags to segment and highlight important parts.',
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
