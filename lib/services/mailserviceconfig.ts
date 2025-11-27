// import { MailtrapClient } from "mailtrap";

// const mailtrapToken = process.env.MAILTRAP_TOKEN;
// if (!mailtrapToken) {
// 	throw new Error("Environment variable MAILTRAP_TOKEN is required");
// }

// export const mailtrapClient = new MailtrapClient({
// 	token: mailtrapToken,
// });

// export const sender = {
// 	// email: "mailtrap@demomailtrap.com",
// 	email: "hello@sensewqplus.live",
// 	name: "Upcoder",
// };

import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";
import { welcomeTemplate } from "@/emailTemplates/welcome";

// Load API key
const apiKey = process.env.BREVO_API_KEY as string;

// Init Brevo client
const brevo = new TransactionalEmailsApi();
brevo.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);

// Verified sender
const sender = {
  email: "contact@samarhirau.dev",
  name: "Upcoder",
};

// --- Welcome Email ---
export async function sendWelcomeEmail(to: string, userName: string) {
  const email: SendSmtpEmail = {
    sender,
    to: [{ email: to }],
    subject: "Welcome to Upcoder!",
    htmlContent: welcomeTemplate(userName),
  };

  return brevo.sendTransacEmail(email);
}
