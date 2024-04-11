"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  // user details
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      // get the data 
      console.log(res.data.data._id);
      // set the data value
      setData(res.data.data._id);
    } catch (error: any) {
      console.log("User data can't fetch", error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      // push on route
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> Profile page </h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Noting"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get user details
      </button>
    </div>
  );
}
