import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@getbrevo/brevo";
import { otpTemplate } from "./emailTemplates/resetotp";
import { welcomeTemplate } from "./emailTemplates/welcome";
import { newsletterTemplate } from "./emailTemplates/newslatter";
import { passwordResetSuccessTemplate } from "./emailTemplates/resetpasswordsuccess";


const BREVO_API_KEY = process.env.BREVO_API_KEY as string;

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

//  Send OTP Email 
export async function sendOtpEmail(to: string, otp: string) {
  const sendSmtpEmail = {
    sender: { email: "samrhirau@gmail.com", name: "Upcoder" },
    to: [{ email: to }],
    subject: "Your Upcoder Password Reset OTP",
    htmlContent: otpTemplate(otp),
  };

  return apiInstance.sendTransacEmail(sendSmtpEmail);
}

// ✅ Send Welcome Email 
export async function sendWelcomeEmail(to: string, userName: string) {
  const sendSmtpEmail = {
    sender: { email: "samrhirau@gmail.com", name: "Upcoder" },
    to: [{ email: to }],
    subject: "Welcome to Upcoder! 🚀",
    htmlContent: welcomeTemplate(userName),
  };
  return apiInstance.sendTransacEmail(sendSmtpEmail);
}


// send password reset success email

export async function sendSuccessResetEmail(to: string, userName: string) {
  const sendSmtpEmail = {
    sender: { email: "samrhirau@gmail.com", name: "Upcoder" },
    to: [{ email: to }],
    subject: "Password Reset Successfully",
    htmlContent: passwordResetSuccessTemplate(userName),
  };
  return apiInstance.sendTransacEmail(sendSmtpEmail);
}

//  Send Privacy-Friendly Newsletter using BCC
export async function sendNewsletter(
  to: string | string[],

) {
  const recipients = typeof to === "string" ? [{ email: to }] : to.map((email) => ({ email }));

  const sendSmtpEmail = {
    sender: { email: "samrhirau@gmail.com", name: "Upcoder Newsletter" },
    to: [{ email: "samrhirau@gmail.com" }], // main “to” field
    bcc: recipients, // recipients will not see each other's emails
    subject: "Upcoder Monthly Newsletter 📰",
   htmlContent : newsletterTemplate()
  };

  return apiInstance.sendTransacEmail(sendSmtpEmail);
}
