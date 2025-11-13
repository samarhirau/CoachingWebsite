import { mailtrapClient, sender } from "./mailserviceconfig";
import { otpTemplate } from "../emailTemplates/resetotp";
import { welcomeTemplate } from "../emailTemplates/welcome";
import { newsletterTemplate } from "../emailTemplates/newslatter";
import { passwordResetSuccessTemplate  } from "../emailTemplates/resetpasswordsuccess";

export async function sendOtpEmail(to: string, otp: string) {
  await mailtrapClient.send({
    from: sender,
    to: [{ email: to }],
    subject: "Your OTP Code",
    html: otpTemplate(otp),
  });
}

export async function sendWelcomeEmail(to: string, userName: string) {
  await mailtrapClient.send({
    from: sender,
    to: [{ email: to }],
    subject: "Welcome to Upcoder!",
    html: welcomeTemplate(userName),
  });
}

export async function sendSuccessResetEmail(to: string, userName: string) {
  await mailtrapClient.send({
    from: sender,
    to: [{ email: to }],
    subject: "Password Reset Successful",
    html: passwordResetSuccessTemplate(userName),
});
}

export async function sendNewsletter(
  recipients: string[],
) {
  const htmlContent = newsletterTemplate();

  // Send to each recipient individually (BCC not supported directly in Mailtrap API)
  for (const to of recipients) {
    await mailtrapClient.send({
      from: sender,
      to: [{ email: to }],
     subject: "Upcoder Monthly Newsletter",
     html:htmlContent
    });
  }
}


