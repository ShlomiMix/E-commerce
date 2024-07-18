import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// This function handles the registration action by updating the user state with the registered user's data.
function register(user: UserModel,action: PayloadAction<UserModel>): UserModel {
  // Extract the registered user data from the action payload  
  const registeredUser = action.payload;

  // Create a new state containing the registered user data
  const newState = registeredUser;

  return newState;
}

// This function handles the login action by updating the user state with the logged-in user's data.
function login(user: UserModel, action: PayloadAction<UserModel>): UserModel {
  // Extract the logged-in user data from the action payload 
  const loggedInUser = action.payload;

  // Create a new state containing the logged-in user data
  const newState = loggedInUser;
  return newState;
}

// This function handles the logout action by resetting the user state to null, indicating no authenticated user.
function logout(user: UserModel, action: PayloadAction): UserModel {
  return null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: { register, login, logout },
});

export const authActionCreators = authSlice.actions;

export const authReducersContainer = authSlice.reducer;
