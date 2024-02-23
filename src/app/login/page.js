"use client";

import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import dcrypt from "dcryptjs";
import { toast } from "react-hot-toast";
import { setUser } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const users = useSelector((state) => state.usersSignUp.usersSignUp);
  const onSubmit = (data) => {
    const filterUser = users.filter((user) => {
      if (
        user.email === data.email &&
        dcrypt.compare(data.password, user.password)
      ) {
        return user;
      }
    });

    if (filterUser[0]?.email) {
      dispatch(setUser(filterUser[0]));
      router.push("/");
      toast.success("Login Success");
    } else {
      toast.error("Email or Password is incorrect");
    }
  };

  return (
    <div className="font-sans antialiased bg-grey-lightest">
      <Navbar />
      <div className="w-full bg-grey-lightest" style={{ paddingTop: "8rem" }}>
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
              Login Form
            </div>
            <div className="py-4 px-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    className="block text-black text-grey-darker text-sm font-bold mb-2"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none border rounded w-full text-black py-2 px-3 text-grey-darker"
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black text-grey-darker text-sm font-bold mb-2"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none border rounded text-black w-full py-2 px-3 text-grey-darker"
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    {...register("password")}
                  />
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-blue hover:bg-blue-dark text-black border-2 border-black font-bold py-2 px-4 rounded-md"
                    type="submit"
                  >
                    Login
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
};

export default Login;
