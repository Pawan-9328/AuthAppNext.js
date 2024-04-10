import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/detDataFromToken";

//for database connect

connect();

export async function POST(request: NextRequest) {
  // extract data from  token
  const userId = await getDataFromToken(request);
  // search id form the database
  // -password used dash means could'nt need password value
  const user = await User.findOne({ _id: userId }).select("-password");
  // check if there is no user
  return NextResponse.json({
    message: "User Found",
    data: user,
  });
}
