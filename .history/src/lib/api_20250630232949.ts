// 📁 src/lib/api.ts

// lib/api.ts
export async function sendChatbotPrompt(sessionId: string, prompt: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chatbot/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      prompt: prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return await response.json();
}
