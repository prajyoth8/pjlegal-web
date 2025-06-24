export async function getVisitCount(): Promise<number> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics/visits`);
  const data = await res.json();
  return Number(data.visits || 0); // Ensure it's always a number
}

export async function incrementVisitCount() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics/visits`, {
    method: "POST",
  });
}
