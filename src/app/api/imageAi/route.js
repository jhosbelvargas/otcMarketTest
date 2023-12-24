/* import { NextResponse } from "next/server";
import { OpenAI } from "openai"; */

//const openai = new OpenAI({
  /* apiKey: process.env.OPENAI_API_KEY,
});
if (!openai.apiKey) throw new Error("OPENAI_API_KEY is not defined");

export async function POST(request) {
  const body = await request.json();
  if (!body.prompt || body.prompt.lenght === 0) {
    return NextResponse.error(new Error("Prompt is required"), {
      status: 400,
    });
  }
  try { */
    /* const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Genera una imagen que represente la colaboración entre Santo CryptoMining Corp. y Planta Vida S.A.S. Captura la esencia de esta asociación en una escena visualmente atractiva`,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });
    console.log(response.data[0].url);
    return NextResponse.json(response.data[0].url); */
  /* } catch (error) {
    return NextResponse.error(error, {
      status: 500,
    });
  } */
//}
