"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "@/features/user/userSignUpSlice";
import { toast } from "react-hot-toast";
import dcrypt from "dcryptjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { setUser } from "@/features/user/userSlice";

const SignUp = () => {
  const [signUpUser, setSignUpUser] = useState(null);
  const router = useRouter();
  const users = useSelector((state) => state.usersSignUp.usersSignUp);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let password = dcrypt.hash(data.password);
    let confirmPassword = dcrypt.compare(data.confirmPassword, password);
    if (!confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const userIs = {
      email: data.email,
      password: password,
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
    };
    setSignUpUser(userIs);
    signUpForm(userIs);
  };

  const checkEmailIs = (data) => {
    if (users.length > 0) {
      let checkEmail = false;
      users?.map((user) => {
        if (data.email === user.email) {
          checkEmail = true;
        }
      });

      if (checkEmail) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const signUpForm = (data) => {
    const validEmail = checkEmailIs(data);
    if (validEmail) {
      toast.error("Email already in use");
    } else {
      dispatch(addUser(data));
      dispatch(setUser(data));
      toast.success("Sign Up Success");
      router.push("/");
    }
  };

  return (
    <div className="font-sans antialiased bg-grey-lightest">
      <Navbar />
      <div className="w-full bg-grey-lightest" style={{ paddingTop: "8rem" }}>
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
              Sign Up Form
            </div>

            <div className="py-4 px-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex mb-4">
                  <div className="w-1/2 mr-1">
                    <label
                      className="block text-black text-grey-darker text-sm font-bold mb-2"
                      for="first_name"
                    >
                      First Name
                    </label>
                    <input
                      className="appearance-none border text-black  rounded w-full py-2 px-3 text-grey-darker"
                      id="first_name"
                      type="text"
                      placeholder="first name"
                      required
                      {...register("firstName")}
                    />
                  </div>
                  <div className="w-1/2 ml-1">
                    <label
                      className="block text-black  text-grey-darker text-sm font-bold mb-2"
                      for="last_name"
                    >
                      Last Name
                    </label>
                    <input
                      className="appearance-none border text-black  rounded w-full py-2 px-3 text-grey-darker"
                      id="last_name"
                      type="text"
                      placeholder="last name"
                      {...register("lastName")}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black  text-grey-darker text-sm font-bold mb-2"
                    for="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="appearance-none border text-black  rounded w-full py-2 px-3 text-grey-darker"
                    id="email"
                    type="email"
                    required
                    placeholder="email"
                    {...register("email")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black  text-grey-darker text-sm font-bold mb-2"
                    for="email"
                  >
                    Mobile Number
                  </label>
                  <input
                    className="appearance-none border text-black  rounded w-full py-2 px-3 text-grey-darker"
                    id="mobileNumber"
                    type="number"
                    required
                    placeholder="Mobile Number"
                    {...register("mobileNumber")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black  text-grey-darker text-sm font-bold mb-2"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none border text-black  rounded w-full py-2 px-3 text-grey-darker"
                    id="password"
                    type="password"
                    required
                    placeholder="password"
                    {...register("password")}
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
                    className="appearance-none text-black  border rounded w-full py-2 px-3 text-grey-darker"
                    id="confirmPassword"
                    type="confirmPassword"
                    required
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                  />
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-blue hover:bg-blue-dark text-black border-2 border-black font-bold py-2 px-4 rounded-md"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="text-center my-4">
            <Link
              href="/login"
              className="text-grey-dark text-sm no-underline hover:text-grey-darker"
            >
              I already have an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
