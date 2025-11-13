import { MailtrapClient } from "mailtrap";

const mailtrapToken = process.env.MAILTRAP_TOKEN;
if (!mailtrapToken) {
  throw new Error("Missing required environment variable: MAILTRAP_TOKEN");
}
const endpoint = process.env.MAILTRAP_ENDPOINT;
if (!endpoint) {
     throw new Error("Missing required environment variable: MAILTRAP_ENDPOINT");
}

export const mailtrapClient = new MailtrapClient({
  // endpoint isn't part of the MailtrapClientConfig type, cast to any to allow custom endpoint
  endpoint: endpoint,
  token: mailtrapToken,
} as any);

export const sender = {
 email: "mailtrap@demomailtrap.com",
	name: "Upcoder",
};
