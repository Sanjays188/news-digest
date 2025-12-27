const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async ({ toEmail, subject, htmlContent }) => {
  const client = SibApiV3Sdk.ApiClient.instance;
  client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    sender: {
      name: "My Digest App",
      email: "sanjays100111@gmail.com"   // ✅ MUST MATCH VERIFIED SENDER
    },
    to: [
      {
        email: toEmail,
      },
    ],
    subject,
    htmlContent,
  };

  return await apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = sendEmail;

