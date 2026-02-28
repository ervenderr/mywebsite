import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const filePath = join(process.cwd(), "public", "resume.pdf");
  const fileBuffer = await readFile(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": fileBuffer.byteLength.toString(),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
