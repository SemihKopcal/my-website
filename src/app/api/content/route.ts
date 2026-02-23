import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Removing edge runtime to allow filesystem operations in local development
// export const runtime = "edge";
export const dynamic = "force-dynamic";

const contentPath = path.join(process.cwd(), "src/data/content.json");

export async function GET() {
  try {
    const fileContent = fs.readFileSync(contentPath, "utf8");
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Content GET error:", error);
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const newContent = await request.json();

    // In local development or Node environments, we can write to the filesystem.
    // Cloudflare Pages (production) will be read-only, so this will fail there.
    try {
      fs.writeFileSync(
        contentPath,
        JSON.stringify(newContent, null, 2),
        "utf8",
      );
      return NextResponse.json({ success: true });
    } catch (writeError: any) {
      console.error("Content Write error:", writeError);
      return NextResponse.json(
        {
          error:
            "Dosya yazma hatası. Üretim ortamında (Cloudflare vb.) içerik güncellenemez.",
          details: writeError.message,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Content POST error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
