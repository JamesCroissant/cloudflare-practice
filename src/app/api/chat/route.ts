
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const context = await getCloudflareContext();
  // const context = await getCloudflareContext({ async: true });　context.env.GROQ_SECRET_KEY  NG
  // const env = await getCloudflareContext({ async: true });　env.GROQ_SECRET_KEY  NG
  // const env = await getCloudflareContext();　env.GROQ_SECRET_KEY  NG
  // const context = await getCloudflareContext();　env.GROQ_SECRET_KEY  NG

  if (!context.env.GROQ_SECRET_KEY) {
    throw new Error(`GROQ_SECRET_KEY is not set ,${context.env} ${context.env.GROQ_SECRET_KEY}`)
  }

  const groq = new Groq({
    apiKey: context.env.GROQ_SECRET_KEY,
  });

  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content: 'You are a helpful assistant. Answer the question in English',
      },
      {
        role: "user",
        content: message,
      },
    ],
  }); 

  const aiReply = response.choices[0].message.content;

  return NextResponse.json({ reply: aiReply });
}