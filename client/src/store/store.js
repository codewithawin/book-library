import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import booksSlice from "./slices/booksSlice";

export const store = configureStore({
  reducer: { auth: authSlice, books: booksSlice },
});
