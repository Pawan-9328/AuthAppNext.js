import nodemailer from "nodemailer";

export const sendEmail = async ({emailType, userId,email}: any) => {
  try {
    //TODO : configure mail for usage..

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: true, 
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "keshav@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email " : "Reset your password",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
