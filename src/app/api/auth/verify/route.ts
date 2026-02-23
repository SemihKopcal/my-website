import { NextResponse } from "next/server";
import { getCodeData, deleteCode, incrementFailures } from "@/lib/auth-store";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Removing edge runtime to improve in-memory persistence in local development/standard Node environments
// export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    const cleanCode = code?.trim();
    const data = getCodeData(email);

    if (!data) {
      console.log(
        `[AUTH-VERIFY] No session found for ${email}. Map size: ${new Map().size}`,
      );
      return NextResponse.json(
        {
          success: false,
          message: "Doğrulama oturumu bulunamadı veya süresi doldu.",
        },
        { status: 401 },
      );
    }

    const isExpired = Date.now() > data.expires;
    const isCorrect = data.code === cleanCode;

    if (isCorrect && !isExpired) {
      deleteCode(email);
      const response = NextResponse.json({ success: true });

      response.cookies.set("admin_token", "semih_admin_secure_secret", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    // Handle failure
    const failures = incrementFailures(email);
    console.log(
      `[AUTH-VERIFY] Incorrect code for ${email}. Attempt: ${failures}/2`,
    );

    if (failures >= 2) {
      // Send security alert
      await resend.emails.send({
        from: "Security <onboarding@resend.dev>",
        to: "semihkopcal1@gmail.com",
        subject: "⚠️ Güvenlik Uyarısı: Şüpheli Giriş Denemesi",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #fee2e2; border-radius: 12px; background: #fff5f5;">
            <h2 style="color: #991b1b; margin-top: 0;">⚠️ Şüpheli Giriş Denemesi</h2>
            <p>Admin paneline <strong>${email}</strong> hesabı ile üst üste 2 kez hatalı kod girişi yapıldı.</p>
            <div style="background: #ffffff; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #fee2e2;">
              <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Zaman:</strong> ${new Date().toLocaleString("tr-TR")}</p>
              <p style="margin: 8px 0 0; font-size: 14px; color: #475569;"><strong>Durum:</strong> Oturum güvenlik nedeniyle sonlandırıldı.</p>
            </div>
            <p style="color: #64748b; font-size: 13px; line-height: 1.6;">Bu işlemi siz yapmadıysanız lütfen hemen şifrenizi değiştirin ve sistem güvenliğini kontrol edin.</p>
            <hr style="border: 0; border-top: 1px solid #fee2e2; margin: 24px 0;" />
            <p style="text-align: center; font-size: 11px; color: #94a3b8;">© ${new Date().getFullYear()} My Website • Security Monitor</p>
          </div>
        `,
      });

      deleteCode(email); // Lock out this session
      return NextResponse.json(
        {
          success: false,
          message:
            "Güvenlik nedeniyle oturum sonlandırıldı. Yöneticiye bildirim gönderildi.",
        },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { success: false, message: `Geçersiz kod! (${failures}/2 deneme hakkı)` },
      { status: 401 },
    );
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 },
    );
  }
}
