import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: {
    name: string;
    email: string;
  };
};

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  user: {
    name: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.user.name = action.payload.userName;
      state.user.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
