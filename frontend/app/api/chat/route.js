// app/api/chat.js
import { NextResponse } from "next/server";


export async function POST(req) {
  let { message } = await req.json();
  console.log(message)

  const url = "http://20.98.104.160:8000/invoke";
  const cookies = 'user_id=0808080';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies
    },
    body: JSON.stringify({
      input: { human_input: message },
      config: {
        configurable: {
          conversation_id: '1234567890'
        }
      }
    })
  }
  )

  const data = await response.json();
  console.log(data);

  return NextResponse.json({ data }, { status: 200 });

}
