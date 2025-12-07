import { createSlice } from "@reduxjs/toolkit";

const persistedToken = localStorage.getItem("authToken");
const persistedRole = localStorage.getItem("authRole");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!persistedToken,
    role: persistedRole || null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;

      if (action.payload.token) {
        localStorage.setItem("authToken", action.payload.token);
      }

      if (action.payload.role) {
        localStorage.setItem("authRole", action.payload.role);
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("authRole");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
