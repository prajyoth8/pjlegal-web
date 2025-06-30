// 📁 src/lib/api.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

/**
 * Call PJ Legal chatbot backend to get AI response.
 * @param sessionId - UUID from Supabase or client-generated
 * @param prompt - User's legal query
 */
export async function sendChatbotPrompt(sessionId: string, prompt: string) {
  const res = await fetch(`${API_BASE_URL}/chatbot/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      prompt,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to get AI response");
  }

  const data = await res.json(); // { blocks, model }
  return data;
}
