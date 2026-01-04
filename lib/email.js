const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

async function sendEmail(to, subject, html) {
  const api = new SibApiV3Sdk.TransactionalEmailsApi();

  await api.sendTransacEmail({
    sender: { email: process.env.SENDER_EMAIL },
    to: [{ email: to }],
    subject,
    htmlContent: html
  });
}

module.exports = sendEmail;


