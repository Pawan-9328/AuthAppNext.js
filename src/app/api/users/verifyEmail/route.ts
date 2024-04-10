import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("token hai kya ",token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now()}});

    if (!user) {
      return NextResponse.json({ error: "Invalid token " }, { status: 400 });
    }

    console.log(user);

    // clean up process [in local app]
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    //save in database
    await user.save();
    return NextResponse.json(
      {
        message: "Email verified successfully ",
        success: true
      },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
