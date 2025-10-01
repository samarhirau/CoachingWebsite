import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@getbrevo/brevo";

const BREVO_API_KEY = process.env.BREVO_API_KEY as string;

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

// ✅ Send OTP Email (unchanged)
export async function sendOtpEmail(to: string, otp: string) {
  const sendSmtpEmail = {
    sender: { email: "samrhirau@gmail.com", name: "Dev OTP" },
    to: [{ email: to }],
    subject: "Your OTP Code",
    htmlContent: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
  };

  return apiInstance.sendTransacEmail(sendSmtpEmail);
}

// ✅ Send Privacy-Friendly Newsletter using BCC
export async function sendNewsletter(
  to: string | string[],
  subject: string,
  html: string
) {
  const recipients = typeof to === "string" ? [{ email: to }] : to.map((email) => ({ email }));

  const sendSmtpEmail = {
    sender: { email: "samrhirau@gmail.com", name: "Dev Newsletter" },
    to: [{ email: "samrhirau@gmail.com" }], // main “to” field
    bcc: recipients, // recipients will not see each other's emails
    subject,
    htmlContent: html,
  };

  return apiInstance.sendTransacEmail(sendSmtpEmail);
}
