// import { mailtrapClient, sender } from "./mailserviceconfig";
// import { otpTemplate } from "../emailTemplates/resetotp";
// import { welcomeTemplate } from "../emailTemplates/welcome";
// import { newsletterTemplate } from "../emailTemplates/newsletterTemplate";
// import { passwordResetSuccessTemplate  } from "../emailTemplates/resetpasswordsuccess";
// import { subscriptionSuccessTemplate } from "../emailTemplates/subscriptionSuccessTemplate";


// export async function sendOtpEmail(to: string, otp: string) {
//   await mailtrapClient.send({
//     from: sender,
//     to: [{ email: to }],
//     subject: "Your OTP Code",
//     html: otpTemplate(otp),
//     category: "OTP",
//   });
// }

// export async function sendWelcomeEmail(to: string, userName: string) {
//   await mailtrapClient.send({
//     from: sender,
//     to: [{ email: to }],
//     subject: "Welcome to Upcoder!",
//     html: welcomeTemplate(userName),
//     category: "Welcome",
//   });
// }

// export async function sendSuccessResetEmail(to: string, userName: string) {
//   await mailtrapClient.send({
//     from: sender,
//     to: [{ email: to }],
//     subject: "Password Reset Successful",
//     html: passwordResetSuccessTemplate(userName),
//     category: "PasswordResetSuccess",
// });
// }





// export async function sendNewsletter(recipients: string[]) {
//   try {
//     await Promise.all(
//       recipients.map(email =>
//         mailtrapClient.send({
//           from: sender,
//           to: [{ email }],
//           subject: "Latest Newsletter from Upcoder",
//           html: newsletterTemplate(),
//           category: "Newsletter",
//         })
//       )
//     );

//     return { success: true };
//   } catch (err: any) {
//     console.error("Newsletter send error:", err);
//     throw new Error(err?.message || "Mailtrap send failed");
//   }
// }



// export async function sendSubscriptionSuccessEmail(to: string) {
//   await mailtrapClient.send({
//     from: sender,
//     to: [{ email: to }],
//     subject: "Subscription Successful",
//     html: subscriptionSuccessTemplate(),
//     category: "Subscription",
//   });
// }
    




import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";

import { welcomeTemplate } from "../emailTemplates/welcome";
import { otpTemplate } from "../emailTemplates/resetotp";
import { passwordResetSuccessTemplate } from "../emailTemplates/resetpasswordsuccess";
import { subscriptionSuccessTemplate } from "../emailTemplates/subscriptionSuccessTemplate";
import { newsletterTemplate } from "../emailTemplates/newsletterTemplate";

const BREVO_API_KEY = process.env.BREVO_API_KEY as string;

const brevo = new TransactionalEmailsApi();
brevo.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

// MUST BE VERIFIED IN BREVO
export const sender = {
  email: "contact@samarhirau.dev",
  name: "Upcoder",
};

// ---------------- OTP ----------------
export async function sendOtpEmail(to: string, otp: string) {
  const email: SendSmtpEmail = {
    sender,
    to: [{ email: to }],
    subject: "Your OTP Code",
    htmlContent: otpTemplate(otp),
  };

  return brevo.sendTransacEmail(email);
}

// ---------------- WELCOME ----------------
export async function sendWelcomeEmail(to: string, userName: string) {
  const email: SendSmtpEmail = {
    sender,
    to: [{ email: to }],
    subject: "Welcome to Upcoder!",
    htmlContent: welcomeTemplate(userName),
  };

  return brevo.sendTransacEmail(email);
}

// ---------------- RESET SUCCESS ----------------
export async function sendSuccessResetEmail(to: string, userName: string) {
  const email: SendSmtpEmail = {
    sender,
    to: [{ email: to }],
    subject: "Password Reset Successful",
    htmlContent: passwordResetSuccessTemplate(userName),
  };

  return brevo.sendTransacEmail(email);
}


// ---------------- SUBSCRIPTION SUCCESS ----------------
export async function sendSubscriptionSuccessEmail(to: string) {
  const email: SendSmtpEmail = {
    sender,
    to: [{ email: to }],
    subject: "Subscription Successful",
    htmlContent: subscriptionSuccessTemplate(),
  };

  return brevo.sendTransacEmail(email);
}
// export async function sendNewsletter(recipients: string[]) {
//   try {
//     await Promise.all(
//       recipients.map(email =>
//         mailtrapClient.send({
//           from: sender,
//           to: [{ email }],
//           subject: "Latest Newsletter from Upcoder",
//           html: newsletterTemplate(),
//           category: "Newsletter",
//         })
//       )
//     );

//     return { success: true };
//   } catch (err: any) {
//     console.error("Newsletter send error:", err);
//     throw new Error(err?.message || "Mailtrap send failed");
//   }
// }

// export async function sendNewsletter(recipients: string[]) {
//   try {
//     await Promise.all(
//       recipients.map(email => {
//         const emailData: SendSmtpEmail = {
//           sender,
//           to: [{ email }],
//           subject: "Latest Newsletter from Upcoder",
//           htmlContent: newsletterTemplate(),
//         };
//         return brevo.sendTransacEmail(emailData);
//       })
//     );
//     return { success: true };
//   } catch (err: any) {
//     console.error("Newsletter send error:", err);
//     throw new Error(err?.message || "Brevo send failed");
//   }
// }


export async function sendNewsletter(recipients: string[]) {
  try {
    for (const email of recipients) {
      const emailData: SendSmtpEmail = {
        sender,
        to: [{ email }],
        subject: "Latest Newsletter from Upcoder",
        htmlContent: newsletterTemplate(), // keep template simple if you want primary
      };

      await brevo.sendTransacEmail(emailData);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Newsletter send error:", err);
    throw new Error(err?.message || "Brevo send failed");
  }
}

