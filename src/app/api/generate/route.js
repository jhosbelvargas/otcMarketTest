import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
if (!openai.apiKey) throw new Error("OPENAI_API_KEY is not defined");

export async function POST(request) {
  const body = await request.json();
  if (!body.prompt || body.prompt.lenght === 0) {
    return NextResponse.error(new Error("Prompt is required"), {
      status: 400,
    });
  }
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `"Generate diverse messages tailored for Twitter, Facebook, Instagram, WhatsApp Channel, Reddit, LinkedIn, and Telegram, utilizing the given text. Incorporate up to three hashtags and replace stock symbols in parentheses with "$" for smooth links (e.g., OTC PINK: SANP becomes $SANP, (TSXV:QNC) becomes $QNC). Surround each response with square brackets [] for clarity. Ensure the WhatsApp message excludes emoticons. For the Twitter message, specifically alter the stock symbols, and keep the total length within 280 characters, including hashtags."${body.prompt}`,
      temperature: 0.7,
      max_tokens: 1000,
    });
    return NextResponse.json(response.choices[0].text);
  } catch (error) {
    return NextResponse.error(error, {
      status: 500,
    });
  }
}