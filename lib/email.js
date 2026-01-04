async function sendEmail(to, subject, html) {
  console.log("Sending email to:", to);

  const api = new SibApiV3Sdk.TransactionalEmailsApi();

  const response = await api.sendTransacEmail({
    sender: { email: process.env.SENDER_EMAIL },
    to: [{ email: to }],
    subject,
    htmlContent: html
  });

  console.log("Brevo response:", response);
}



