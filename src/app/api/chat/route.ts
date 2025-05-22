
// import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";


export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const { env } = await getCloudflareContext();
    // // const context = await getCloudflareContext({ async: true });　context.env.GROQ_SECRET_KEY  NG
    // // const env = await getCloudflareContext({ async: true });　env.GROQ_SECRET_KEY  NG
    // // const env = await getCloudflareContext();　env.GROQ_SECRET_KEY  NG
    // // const context = await getCloudflareContext();　env.GROQ_SECRET_KEY  NG

    console.log(`test`, env.TEST_SECRET_KEY)

    if (!env.GROQ_SECRET_KEY) {
      console.log(`GROQ_SECRET_KEY is not set`, env)
      throw new Error(`GROQ_SECRET_KEY is not set ,${env} ${env.GROQ_SECRET_KEY}`)
    }

    ////// NG
    // const groq = new Groq({
    //   apiKey: env.GROQ_SECRET_KEY,
    // });
    // const response = await groq.chat.completions.create({
    //   model: "llama3-8b-8192",
    //   messages: [
    //     {
    //       role: "system",
    //       content: 'You are a helpful assistant. Answer the question in English',
    //     },
    //     {
    //       role: "user",
    //       content: message,
    //     },
    //   ],
    // }); 
    // console.log(`response`, response)
    // const aiReply = response.choices[0].message.content;

    // 直接fetch APIを使用してGroq APIを呼び出し
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GROQ_SECRET_KEY}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. Answer the question in English'
          },
          {
            role: 'user',
            content: message
          }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.7,
        max_tokens: 200,
        top_p: 1,
        stream: false,
        stop: null
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const aiReply = data.choices[0].message.content;

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
