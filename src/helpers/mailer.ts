import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


export const sendEmail = async ({email, emailType, userId }: any) => {
  try {
    // create token using bcrypt.js
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log("MAIL", userId);
    console.log("EMAIL TYPE", emailType);
    console.log(typeof emailType);

    //TODO : configure mail for usage..

    if (emailType === "VERIFY") {
      console.log("VERIFY SECTION");

      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hasedToken,
          verifyTokenExpiry: (Date.now() + 3600000)
          // expiry 1hr from now
        },
      });
      console.log("Updated User for VERIFY", updatedUser);
    } 
    else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        //set - parameters 
        $set: {
     
          forgotPasswordToken: hasedToken,
          forgotPasswordTokenExpiry: (Date.now() + 3600000)
        },
      });
    }
    console.log("Out side if else ");
    

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ff2fef32fc7745",
        pass: "e5e0d01e9100be"
      }
    });

    const mailOptions = {
     
      from: "keshav@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email " : "Reset your password",
      text: "Hello world?",
      html: `<p>Click Here  <a href= "
      ${process.env.DOMAIN
      } / verifyemail?token=${hasedToken}" > here </a> to
       ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
       or copy and paste the link below in your browser. <br>
       ${process.env.DOMAIN}/ verifyemail?token=${hasedToken}  </p>`,
    };


    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;


  } catch (error: any) {
    throw new Error(error.message);
  }
};
