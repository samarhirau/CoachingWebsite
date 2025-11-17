import { MailtrapClient } from "mailtrap";

const mailtrapToken = process.env.MAILTRAP_TOKEN;
if (!mailtrapToken) {
	throw new Error("Environment variable MAILTRAP_TOKEN is required");
}

export const mailtrapClient = new MailtrapClient({
	token: mailtrapToken,
});

export const sender = {
	// email: "mailtrap@demomailtrap.com",
	email: "hello@sensewqplus.live",
	name: "Upcoder",
};



