import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "user@example.com" && password === "password") {
      const mockUser = {
        id: "1",
        email: email,
        name: "Demo User",
      };
      const mockToken = "mock-jwt-token";

      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", mockToken);

      return { user: mockUser, token: mockToken };
    } else {
      throw new Error("Invalid credentials");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = {
      id: "1",
      email: email,
      name: name,
    };
    const mockToken = "mock-jwt-token";

    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", mockToken);

    return { user: mockUser, token: mockToken };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
