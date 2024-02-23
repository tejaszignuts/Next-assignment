"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { updateUser } from "@/features/user/userSignUpSlice";
import { useRouter } from "next/navigation";
import { setUser } from "@/features/user/userSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user.user);

  const router = useRouter();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.usersSignUp.usersSignUp);
  const { register, handleSubmit } = useForm();

  if (!user.email) {
    router.push("/login");
  }

  const onSubmit = (data) => {
    if (
      userList.some(
        (userIs) => userIs.email === data.email && userIs.email !== user.email
      )
    ) {
      toast.error("Email already in use");
      return;
    } else {
      const updatedUserList = userList.map((userIs) => {
        if (userIs.email === user.email) {
          return {
            ...userIs,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            mobileNumber: data.mobileNumber,
          };
        }
        return userIs;
      });

      dispatch(updateUser(updatedUserList));

      const newUser = {
        ...user,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
      };
      dispatch(setUser(newUser));

      toast.success("Profile Updated");
      router.push("/");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="w-full bg-grey-lightest" style={{ paddingTop: "8rem" }}>
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
              Edit Profile
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
                      placeholder={user.firstName}
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
                      placeholder={user.lastName}
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
                    placeholder={user.email}
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
                    placeholder={user.mobileNumber}
                    {...register("mobileNumber")}
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
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
