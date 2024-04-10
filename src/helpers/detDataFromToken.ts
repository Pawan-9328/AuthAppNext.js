import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    //Access cookies
    //set time pass to value
    // get time pass key value pair
    // ? used for fail save suppose token exits na krta ho to value niklne k benefit nhi hoga " " empty pass for nothing access case
    const token = request.cookies.get("token")?.value || "";
    // decode token because token  encoded hote hai or value ko extract krna pdta h
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // decoded information [used id because this information we take from login not from mongoDb]
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
