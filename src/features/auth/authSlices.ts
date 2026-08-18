import { User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  authToken: string;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout, setAuthToken } = authSlice.actions;

export default authSlice.reducer;
