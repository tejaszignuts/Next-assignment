"use client";

import { setUser } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      <div className="w-full bg-green fixed shadow z-1">
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center py-4 px-8">
            <Link href="/" className="text-center text-white font-bold">
              Amazon
            </Link>

            <div className="items-center  ">
              {user.email ? (
                <Link
                  href="/product"
                  className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
                >
                  Product
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
                >
                  Login
                </Link>
              )}
              {user.email ? (
                <Link
                  href="/profile"
                  className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
                >
                  SignUp
                </Link>
              )}
              {user.email ? (
                <Link
                  href="/changepassword"
                  className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
                >
                  Change Password
                </Link>
              ) : (
                <></>
              )}
              {user.email ? (
                <a
                  className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
                  onClick={() => {
                    dispatch(setUser({}));

                    router.push("/login");
                    toast.success("Logout Successful!");
                  }}
                >
                  Logout
                </a>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
