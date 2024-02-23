"use client";

import { configureStore } from "@reduxjs/toolkit";
import usersSignUpReducer from "../features/user/userSignUpSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    usersSignUp: usersSignUpReducer,
    user: userReducer,
  },
});
