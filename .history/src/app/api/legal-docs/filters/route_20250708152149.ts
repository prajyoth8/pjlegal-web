export async function GET() {
  const res = await fetch(`${process.env.BACKEND_URL}/legal-docs/filters`);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
