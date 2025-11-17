export function subscriptionSuccessTemplate() {
  return `
  <!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:0; background-color:#f4f5f7; font-family:'Segoe UI', Arial, sans-serif;">
    <center>
      <table width="100%" border="0" cellspacing="0" cellpadding="0"
        style="max-width:640px; margin:auto; background-color:#ffffff; border-radius:12px; 
               box-shadow:0 4px 12px rgba(0,0,0,0.06); overflow:hidden;">

        <!-- Header -->
        <tr>
          <td align="center" 
              style="padding:36px 20px 20px 20px; background:oklch(0.45 0.15 240); color:#fff;">
            <h1 style="font-size:28px; font-weight:900; margin:0;">UPCODER</h1>
            <p style="font-size:14px; margin:6px 0 0; opacity:0.9;">Subscription Successful</p>
          </td>
        </tr>

       

        <!-- Main Content -->
        <tr>
          <td style="padding:40px 40px 20px; text-align:left;">
            <h2 style="font-size:26px; font-weight:800; color:#111827; margin:0 0 16px;">
              🎉 Welcome coder
            </h2>

            <p style="font-size:16px; color:#4b5563; line-height:1.7; margin:0 0 24px;">
              Thank you for subscribing to Upcoder updates. You’re all set to receive the latest courses, coding challenges, and community highlights directly in your inbox.
            </p>

            <a href="https://upcoder.netlify.app"
              style="display:inline-block; background-color:oklch(0.55 0.15 240); color:#fff;
                     padding:14px 28px; border-radius:8px; font-weight:700; text-decoration:none;
                     box-shadow:0 4px 10px rgba(37,99,235,0.25); transition:all 0.3s ease;">
              Explore Courses →
            </a>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none; border-top:1px solid #e5e7eb; margin:32px 0;">
          </td>
        </tr>

        <!-- Tips Section -->
        <tr>
          <td style="padding:0 40px 40px;">
            <h3 style="font-size:20px; color:#111827; font-weight:700; margin:0 0 12px;">
              💡 Quick Tip
            </h3>
            <p style="font-size:15px; color:#4b5563; margin:0 0 18px; line-height:1.7;">
              Add Upcoder to your bookmarks and never miss new challenges. Stay consistent, learn daily, and level up your coding skills!
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="background-color:#f9fafb; padding:28px 20px;">
            <p style="font-size:12px; color:#9ca3af; margin:0 0 12px;">
              You’re receiving this because you subscribed to Upcoder updates.
            </p>
            <a href="#" style="color:#6366f1; font-size:12px; text-decoration:none; margin-right:10px;">
              Unsubscribe
            </a>
            •
            <a href="https://upcoder.netlify.app" style="color:#6366f1; font-size:12px; text-decoration:none; margin-left:10px;">
              Visit Website
            </a>
            <p style="color:#9ca3af; font-size:12px; margin-top:16px;">
              © 2025 Upcoder. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`;
}
