export async function POST(req: Request) {
  const formData = await req.formData();

  const res = await fetch(`${process.env.BACKEND_URL}/upload-legal-doc`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
