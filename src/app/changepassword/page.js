"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dcrypt from "dcryptjs";
import { toast } from "react-hot-toast";
import { updateUser } from "@/features/user/userSignUpSlice";

const ForgotPassword = () => {
  const userList = useSelector((state) => state.usersSignUp.usersSignUp);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = (data) => {
    if (data.newPassword === data.confirmPassword) {
      if (dcrypt.compare(data.oldPassword, user.password)) {
        if (!dcrypt.compare(data.newPassword, user.password)) {
          const password = dcrypt.hash(data.newPassword);
          const filterUserList = userList.map((userData) => {
            if (userData.email === user.email) {
              return {
                email: userData.email,
                password: password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                mobileNumber: userData.mobileNumber,
              };
            }
          });

          dispatch(updateUser(filterUserList));
          toast.success("Password changed");
          router.push("/login");
        } else {
          toast.error("given password already taken");
        }
      } else {
        toast.error("Old password not match");
      }
    } else {
      toast.error("Password not match");
    }
  };

  if (!user.email) {
    router.push("/login");
  } else {
    return (
      <div className="font-sans antialiased bg-grey-lightest">
        <Navbar />
        <div className="w-full bg-grey-lightest" style={{ paddingTop: "8rem" }}>
          <div className="container mx-auto py-8">
            <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
              <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                Change Password
              </div>
              <div className="py-4 px-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label
                      className="block text-black text-grey-darker text-sm font-bold mb-2"
                      for="password"
                    >
                      Old Password
                    </label>
                    <input
                      className="appearance-none border rounded text-black w-full py-2 px-3 text-grey-darker"
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...register("oldPassword")}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-black text-grey-darker text-sm font-bold mb-2"
                      for="password"
                    >
                      New Password
                    </label>
                    <input
                      className="appearance-none border rounded text-black w-full py-2 px-3 text-grey-darker"
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...register("newPassword")}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-black text-grey-darker text-sm font-bold mb-2"
                      for="password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="appearance-none border rounded text-black w-full py-2 px-3 text-grey-darker"
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...register("confirmPassword")}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <button
                      className="bg-blue hover:bg-blue-dark text-black border-2 border-black font-bold py-2 px-4 rounded-md"
                      type="submit"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p className="text-center mt-20">
              <Link
                href="/signup"
                className="text-grey-dark text-sm no-underline hover:text-grey-darker"
              >
                dont have a account yet
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ForgotPassword;
