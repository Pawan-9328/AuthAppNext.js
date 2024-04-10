"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      // loading state change like signup button disabled
      setLoading(true);
      //for data fetch
      //user - here all data store
      const response = await axios.post("/api/users/login", user);
      //show this msg on browser screen
      console.log("Login success", response.data);
      // home route some but home router k aage url post fix ho jta hai
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 
    ) {
      //user signup allow
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      {/* email  */}

      <label htmlFor="email">email</label>
      <input
        id="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        // value is imp++ [detect ho rh h state se ]
        value={user.email}
        // user destructuring(spread) [change only one value - username]
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      {/* password */}

      <label htmlFor="password">password</label>
      <input
        id="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        // value is imp++ [detect ho rh h state se ]
        value={user.password}
        // user destructuring(spread) [change only one value - username]
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}
