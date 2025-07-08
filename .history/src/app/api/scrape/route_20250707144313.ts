// app/api/scrape/route.ts
import { spawn } from "child_process";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");

  if (!source) {
    return new Response(JSON.stringify({ error: "Missing source parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Promise<Response>((resolve) => {
    const process = spawn("python", ["./scrapers/recent_law_scraper.py", source]);

    let output = "";
    let error = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      error += data.toString();
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log(`Scraper output: ${output}`);
        resolve(
          new Response(JSON.stringify({ status: "success", output }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        );
      } else {
        console.error(`Scraper error: ${error}`);
        resolve(
          new Response(JSON.stringify({ status: "failed", error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      }
    });
  });
}
