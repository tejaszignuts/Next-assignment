import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersSignUp: [],
};

export const userSignUpSlice = createSlice({
  name: "usersSignUp",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usersSignUp.push(action.payload);
    },
    updateUser: (state, action) => {
      state.usersSignUp = action.payload;
    },
  },
});

export const { addUser, updateUser } = userSignUpSlice.actions;

export default userSignUpSlice.reducer;
