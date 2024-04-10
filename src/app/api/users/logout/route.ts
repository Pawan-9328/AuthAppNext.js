import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


//for database connect

connect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });

    //Access the cookies...
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {}
}
