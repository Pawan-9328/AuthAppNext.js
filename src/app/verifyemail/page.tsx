"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function VerifyEmailPage() {
  // utiliazation of next.js
  // fetch data from the url
  //const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifiedUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      // user verified
      setVerified(true);
      // after verified error exits
      setError(false)
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  // as soon component mount ho then run
  useEffect(() => {
   setError(false)
    // token niklna
    const urlToken = window.location.search.split("=")[1];
    // now your value urlToken else empty
    setToken(urlToken || "");

    //extract the query
    //const  query  = router;
    // out the token from the query
   // const urlTokenTwo = query.token;
  }, []);

  //for any changes in token
  useEffect(() => {
   setError(false)
    if (token.length > 0) {
      verifiedUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
          
        </div>
      )}
    </div>
  );
}
