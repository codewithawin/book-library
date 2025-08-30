import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../utils/api";

const initialState = {
  books: [],
  filteredBooks: [],
  searchQuery: "",
  selectedGenre: "",
  isLoading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetch("/book");
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch books");
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const data = await apiFetch("/book", {
        method: "POST",
        body: JSON.stringify(bookData),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add book");
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (book, { rejectWithValue }) => {
    try {
      const data = await apiFetch(`/book/${book._id}`, {
        method: "PUT",
        body: JSON.stringify(book),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update book");
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, { rejectWithValue }) => {
    try {
      await apiFetch(`/book/${bookId}`, {
        method: "DELETE",
      });
      return bookId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete book");
    }
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
          state.books,
          state.searchQuery,
          state.selectedGenre
        );
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

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
        state.error = action.payload;
      })

      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.books.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index !== -1) state.books[index] = action.payload;
        state.filteredBooks = filterBooks(
          state.books,
          state.searchQuery,
          state.selectedGenre
        );
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((book) => book._id !== action.payload);
        state.filteredBooks = filterBooks(
          state.books,
          state.searchQuery,
          state.selectedGenre
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
