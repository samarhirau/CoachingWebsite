import { mailtrapClient, sender } from "./mailserviceconfig";
import { otpTemplate } from "../emailTemplates/resetotp";
import { welcomeTemplate } from "../emailTemplates/welcome";
import { newsletterTemplate } from "../emailTemplates/newslatter";
import { passwordResetSuccessTemplate  } from "../emailTemplates/resetpasswordsuccess";
import { subscriptionSuccessTemplate } from "../emailTemplates/subscriptionSuccessTemplate";


export async function sendOtpEmail(to: string, otp: string) {
  await mailtrapClient.send({
    from: sender,
    to: [{ email: to }],
    subject: "Your OTP Code",
    html: otpTemplate(otp),
    category: "OTP",
  });
}

export async function sendWelcomeEmail(to: string, userName: string) {
  await mailtrapClient.send({
    from: sender,
    to: [{ email: to }],
    subject: "Welcome to Upcoder!",
    html: welcomeTemplate(userName),
    category: "Welcome",
  });
}

export async function sendSuccessResetEmail(to: string, userName: string) {
  await mailtrapClient.send({
    from: sender,
    to: [{ email: to }],
    subject: "Password Reset Successful",
    html: passwordResetSuccessTemplate(userName),
    category: "PasswordResetSuccess",
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
     html:htmlContent,
     category: "Newsletter",
    });
  }
}

export async function sendSubscriptionSuccessEmail(to: string) {
  await mailtrapClient.send({
    from: sender,
    to: [{ email: to }],
    subject: "Subscription Successful",
    html: subscriptionSuccessTemplate(),
    category: "Subscription",
  });
}
    


