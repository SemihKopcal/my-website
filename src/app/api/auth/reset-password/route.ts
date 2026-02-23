import { NextResponse } from "next/server";
import { getCodeData, deleteCode } from "@/lib/auth-store";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json();
    const data = getCodeData(email);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Doğrulama oturumu bulunamadı." },
        { status: 401 },
      );
    }

    const isExpired = Date.now() > data.expires;
    const isCorrect = data.code === code?.trim();

    if (isCorrect && !isExpired) {
      // Update password in content.json
      const contentPath = path.join(process.cwd(), "src/data/content.json");
      const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));

      content.security = content.security || {};
      content.security.password = newPassword;

      fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));

      deleteCode(email);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Geçersiz veya süresi dolmuş kod." },
      { status: 401 },
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 },
    );
  }
}
