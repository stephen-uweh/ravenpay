exports.notificationPayload = (email, subject, firstname, accountNumber, account = {}) => {
  let data = {
    fromEmail: "hello@getravenbank.com",
    email: email,
    subject: subject,
    fromName: "Raven",
    source: "hello@getravenbank.com",
    apiKey: process.env.RABBIT_MQ_API_KEY,
    provider: "mailgun",
    domain: process.env.DOMAIN_NAME,
    toName: firstname + " " + lastname,
    accountNumber: accountNumber,
    meta: account,
  };
  return data;
};
