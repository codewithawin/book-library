import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import BooksSlice from "./slices/BooksSlice";

export const store = configureStore({
  reducer: { auth: authSlice, books: BooksSlice },
});
