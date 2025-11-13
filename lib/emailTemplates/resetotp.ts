


export function otpTemplate(otp: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:0; background-color:#f4f5f7; font-family:'Segoe UI', Arial, sans-serif;">
    <center>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" 
             style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:12px; 
                    box-shadow:0 4px 12px rgba(0,0,0,0.06); overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td align="center" 
              style="padding:40px 20px 10px 20px; background:oklch(0.45 0.15 240); color:#fff;">
            <h1 style="font-size:28px; font-weight:800; margin:0;">UPCODER</h1>
            <p style="font-size:14px; margin:6px 0 0 0; opacity:0.9;">Account Security Alert</p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:40px 40px 20px 40px; text-align:left;">
            <h2 style="font-size:30px; color:#111827; font-weight:900; margin:0 0 16px;">
              Reset Your Password 🔒
            </h2>

            <p style="color:#4b5563; font-size:17px; line-height:1.7; margin:0 0 24px;">
              Hi <b>Coder</b>,<br><br>
              We received a request to reset your <b>Upcoder</b> account password.  
              Use the One-Time Password (OTP) below to proceed. This code will expire in <b>5 minutes</b>.
            </p>

           <div style="text-align:center; margin:30px 0;">
                        <div style="display:inline-block; 
                                    background-color:#000; 
                                    color:#fff; 
                                    font-size:32px; 
                                    font-weight:700; 
                                    letter-spacing:6px; 
                                    padding:16px 32px; 
                                    border-radius:10px; 
                                    /* Optional: Box shadow for modern depth, but compatibility is lower */
                                    box-shadow:0 4px 10px rgba(0,122,255,0.25);">
                            ${otp}
                        </div>
                    </div>

            <p style="color:#6b7280; font-size:15px; line-height:1.7; margin:0 0 28px;">
              If you didn’t request a password reset, please ignore this email.  
              Your account will remain secure.
            </p>

            <a href="https://upcoder.netlify.app" 
              style="display:inline-block; background-color:oklch(0.55 0.15 240); color:#fff; 
                     padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:700; 
                     font-size:16px; box-shadow:0 4px 10px rgba(37,99,235,0.25); transition:all 0.3s ease;">
              Go to Upcoder →
            </a>
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
              Visit us at 
              <a href="https://upcoder.netlify.app" style="color:oklch(0.55 0.15 240); text-decoration:none;">
                upcoder.netlify.app
              </a>
            </p>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`;
}

