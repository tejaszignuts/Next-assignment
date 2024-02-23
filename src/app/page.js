"use client";

import Link from "next/link";
import React from "react";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const page = () => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  if (!user.email) {
    router.push("/login");
  }
  return (
    <>
      <div>
        <Navbar />
        <div className="pt-48">
          <h1 className="text-center text-7xl	">
            Welcome back
            <span className="block pt-16 text-orange-500">
              {user?.firstName}
            </span>
          </h1>
        </div>
        <div className="flex justify-center pt-24">
          <button
            className="bg-white text-black px-20 py-4 border-2 border-white hover:bg-black hover:text-white"
            onClick={() => router.push("/product")}
          >
            Go to Product
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
