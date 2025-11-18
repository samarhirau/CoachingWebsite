import { mailtrapClient, sender } from "./mailserviceconfig";
import { otpTemplate } from "../emailTemplates/resetotp";
import { welcomeTemplate } from "../emailTemplates/welcome";
import { newsletterTemplate } from "../emailTemplates/newsletterTemplate";
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




export async function sendNewsletter(recipients: string[]) {
  const to = recipients.map(email => ({ email }));

  try {
    const result = await mailtrapClient.send({
      from: sender,
      to,
      subject: "Latest Newsletter from Upcoder",
      html : newsletterTemplate(),
      category: "Newsletter",
    });

    console.log("Newsletter sent:", result);
    return result;
  } catch (err: any) {
    console.error("Error sending newsletter:", err);
    throw new Error(err?.message || "Mailtrap send failed");
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
    

