// ✅ Node route to call Python scraper
import type { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { source } = req.query;

  if (!source || typeof source !== "string") {
    return res.status(400).json({ error: "Missing source parameter" });
  }

  try {
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
        res.status(200).json({ status: "success", output });
      } else {
        console.error(`Scraper error: ${error}`);
        res.status(500).json({ status: "failed", error });
      }
    });
  } catch (err) {
    console.error("Failed to run scraper", err);
    res.status(500).json({ error: "Internal error" });
  }
}
