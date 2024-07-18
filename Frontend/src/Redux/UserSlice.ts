import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserSlice {
  userId: number;
  roleId: number;
}

// This function handles the action to set user data in the state.
function setUser(currentState: UserSlice,action: PayloadAction<UserSlice>): UserSlice {
  // Extract the user data from the action payload and assign it to a variable called newState.  
  const newState = action.payload;
  return newState;
}

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: { setUser },
});


export const userActionCreators = userSlice.actions;


export const userReducersContainer = userSlice.reducer;
