import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockBooks } from "./mockBooks";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const initialState = {
  books: mockBooks,
  filteredBooks: mockBooks,
  searchQuery: "",
  selectedGenre: "",
  isLoading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockBooks;
});

export const addBook = createAsyncThunk("books/addBook", async (bookData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newBook = {
    ...bookData,
    id: Date.now().toString(),
    addedDate: new Date().toISOString().split("T")[0],
  };
  return newBook;
});

export const updateBook = createAsyncThunk("books/updateBook", async (book) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return book;
});

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return bookId;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredBooks = filterBooks(
        state.books,
        action.payload,
        state.selectedGenre
      );
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
      state.filteredBooks = filterBooks(
        state.books,
        state.searchQuery,
        action.payload
      );
    },
    clearFilters: (state) => {
      state.searchQuery = "";
      state.selectedGenre = "";
      state.filteredBooks = state.books;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        state.filteredBooks = filterBooks(
          action.payload,
          state.searchQuery,
          state.selectedGenre
        );
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch books";
      });

    builder
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.push(action.payload);
        state.filteredBooks = filterBooks(
          state.books,
          state.searchQuery,
          state.selectedGenre
        );
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to add book";
      });

    builder
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        state.filteredBooks = filterBooks(
          state.books,
          state.searchQuery,
          state.selectedGenre
        );
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update book";
      });

    builder
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.filteredBooks = filterBooks(
          state.books,
          state.searchQuery,
          state.selectedGenre
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete book";
      });
  },
});

function filterBooks(books, searchQuery, selectedGenre) {
  return books.filter((book) => {
    const matchesSearch =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = !selectedGenre || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });
}

export const { setSearchQuery, setSelectedGenre, clearFilters, clearError } =
  booksSlice.actions;
export default booksSlice.reducer;
