export function welcomeTemplate(userName: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:0; background-color:#f4f5f7; font-family: 'Segoe UI', Arial, sans-serif;">
    <center>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.06); overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="padding:40px 20px 10px 20px; background:oklch(0.45 0.15 240); color:#fff;">
            <h1 style="font-size:28px; font-weight:800; margin:0;">UPCODER</h1>
            <p style="font-size:14px; margin:6px 0 0 0; opacity:0.9;">Empowering the next generation of coders</p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:40px 40px 20px 40px; text-align:left;">
            <h2 style="font-size:36px; color:#111827; font-weight:900; margin:0 0 16px;">Welcome to Upcoder 🚀</h2>

            <p style="color:#4b5563; font-size:17px; line-height:1.7; margin:0 0 28px;">
              Hey <b>${userName}</b>,<br><br>

              My name is <b>Samar</b>, and I built Upcoder with one mission —  
              to help students learn coding in the most simple, practical, and enjoyable way possible.<br><br>

              Now that you're in, you’ll start learning <b>real-world coding skills</b> through courses designed to make you industry-ready.  
              Step-by-step. Beginner-friendly. No unnecessary complexity.
            </p>

            <h3 style="font-size:20px; color:#111827; margin:20px 0 10px;">🔥 What you will learn</h3>

            <ul style="color:#4b5563; font-size:16px; line-height:1.7; padding-left:20px; margin:0 0 28px;">
              <li>How to write clean and modern code</li>
              <li>Build real projects that actually teach you something</li>
              <li>Learn concepts with examples, visuals, and real explanations</li>
              <li>Interview-focused coding patterns and problem-solving</li>
              <li>Confidence to build apps on your own</li>
            </ul>

            <p style="color:#4b5563; font-size:17px; margin:0 0 28px;">
              You’re officially part of the Upcoder community.  
              Let’s make your coding journey meaningful, structured, and powerful.
            </p>

            <a href="https://upcoderv1.vercel.app"
              style="display:inline-block; background-color:oklch(0.55 0.15 240); color:#fff; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:700; letter-spacing:0.3px; font-size:16px; box-shadow:0 4px 10px rgba(37,99,235,0.25); transition:all 0.3s ease;">
              Start Learning →
            </a>

            <p style="color:#6b7280; font-size:14px; line-height:1.6; margin:32px 0 0;">
              Need help? Just reply to this email or visit our 
              <a href="https://upcoderv1.vercel.app" style="color:oklch(0.55 0.15 240); text-decoration:none; font-weight:600;">Help Center</a>.
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none; border-top:1px solid #e5e7eb; margin:32px 0 0 0;">
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:24px 40px 36px 40px; background-color:#f9fafb;">
            <p style="color:#9ca3af; font-size:12px; margin:0;">
              © 2025 <strong>Upcoder</strong>. All rights reserved.<br>
              Visit us at <a href="https://upcoderv1.vercel.app" style="color:oklch(0.55 0.15 240); text-decoration:none;">upcoderv1.vercel.app</a>
            </p>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`;
}
