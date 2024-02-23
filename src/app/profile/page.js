"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Profile = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  if (!user.email) {
    router.push("/login");
  }
  return (
    <div>
      <Navbar />
      <div>
        <div className="w-full bg-grey-lightest" style={{ paddingTop: "8rem" }}>
          <div className="container mx-auto py-8">
            <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
              <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                {`Name : ${user.firstName} ${user.lastName}`}
              </div>
              <div className="py-4 px-8 text-black text-lg border-b border-grey-lighter">
                <h1>{`Email : ${user.email}`}</h1>
              </div>
              <div className="py-4 px-8 text-black text-lg border-b border-grey-lighter">
                <h1>{`Mobile Number : ${user.mobileNumber}`}</h1>
              </div>
              <div className="flex items-center justify-center py-8">
                <button
                  className="bg-blue hover:bg-blue-dark text-black border-2 border-black font-bold py-2 px-4 rounded-md"
                  type="submit"
                  onClick={() => router.push("/editprofile")}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
