import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
//for database connect

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    
    // validation
    console.log(reqBody);

    const user = await username.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exits" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hasedPassword = bcryptjs.hash(password, salt);

    const newuser = new User({
      username,
      email,
      password: hasedPassword,
    });

    const savedUser = await newuser.save();
    console.log(savedUser);

    //send verification email..

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully ",
      success: true,
      savedUser 

    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
