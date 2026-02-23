import { NextResponse } from "next/server";
import { getCodeData, incrementFailures, deleteCode } from "@/lib/auth-store";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    const data = getCodeData(email); // Reverted to dynamic target

    if (!data) {
      return NextResponse.json({ success: false, message: "Kod bulunamadı veya süresi doldu." }, { status: 401 });
    }

    const isCorrect = data.code === code?.trim();
    const isExpired = Date.now() > data.expires;

    if (!isCorrect) {
      const failures = incrementFailures(email);
      if (failures >= 3) {
        await resend.emails.send({
          from: "Security <onboarding@resend.dev>",
          to: email,
          subject: "⚠️ Güvenlik Uyarısı: Çok Sayıda Hatalı Giriş",
          html: `<p>Hesabınıza üst üste hatalı 2FA kodları girildi. Eğer bu siz değilseniz lütfen şifrenizi değiştirin.</p>`,
        });
      }
      return NextResponse.json({ success: false, message: "Hatalı kod." }, { status: 401 });
    }

    if (isExpired) {
      deleteCode(email);
      return NextResponse.json({ success: false, message: "Kodun süresi dolmuş." }, { status: 401 });
    }

    // Success
    deleteCode(email);
    const response = NextResponse.json({ success: true });
    
    // Set admin token cookie
    response.cookies.set("admin_token", "secure_session_token_" + Date.now(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ success: false, message: "Sunucu hatası" }, { status: 500 });
  }
}
