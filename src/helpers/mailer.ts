import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { verify } from "crypto";

export const sendEmail = async ({ emailType, userId, email }: any) => {
  try {
    // create token using bcrypt.js
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);

    //TODO : configure mail for usage..

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4589c0c6c3d601", //⚠️❌
        pass: "789f115d8845f6", // ⚠️❌
      },
    });

    const mailOptions = {
      from: "keshav@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email " : "Reset your password",
      text: "Hello world?",
      html: `<p>Click Here  <a href= "${
        process.env.DOMAIN
      } / verifyemail?token=${hasedToken}" > here </a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
       or copy and paste the link below in your browser. <br>
       ${process.env.DOMAIN}/ verifyemail?token=${hasedToken}  </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
