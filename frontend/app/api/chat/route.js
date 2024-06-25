// app/api/chat.js
import { NextResponse } from "next/server";


export async function POST(req) {
  const { message } = req.body;

  // Replace this with actual call to an AI model or service
  const aiResponse = `You said: ${message}`;

  return NextResponse.json({ response: aiResponse }, { status: 200 });

}
