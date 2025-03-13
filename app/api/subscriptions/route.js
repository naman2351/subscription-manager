import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "subscriptions.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const subscriptions = JSON.parse(data);
    return new Response(JSON.stringify(subscriptions), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error loading data" }), {
      status: 500,
    });
  }
}
