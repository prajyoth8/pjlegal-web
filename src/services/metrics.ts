const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://pjlegal-backend-production.up.railway.app";

export async function getVisitCount(): Promise<number> {
  try {
    const res = await fetch(`${BASE_URL}/metrics/visits`);
    const data = await res.json();
    console.log("✅ getVisitCount response:", data);
    return Number(data.visits || 0);
  } catch (err) {
    console.error("❌ getVisitCount error:", err);
    return 0;
  }
}

export async function incrementVisitCount() {
  try {
    await fetch(`${BASE_URL}/metrics/visits`, { method: "POST" });
  } catch (err) {
    console.error("❌ incrementVisitCount error:", err);
  }
}
