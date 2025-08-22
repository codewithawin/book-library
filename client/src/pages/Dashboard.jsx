import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchBooks,
  setSearchQuery,
  setSelectedGenre,
  clearFilters,
} from "../store/slices/booksSlice";
import { logout } from "../store/slices/authSlice";
import { Library, Plus, Search, LogOut, X } from "lucide-react";
import BookCard from "../components/BookCard";
import { mockBooks } from "../store/slices/mockBooks";
import { usePagination } from "../hooks/usePagination";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { filteredBooks, searchQuery, selectedGenre, isLoading, error, books } =
    useSelector((state) => state.books);

  const genres = Array.from(new Set(books.map((book) => book.genre))).filter(
    Boolean
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleLogout = () => dispatch(logout());
  const handleClearFilters = () => dispatch(clearFilters());

  const hasActiveFilters = searchQuery || selectedGenre;

  const handleEditBook = (book) => {
    console.log("Edit book:", book);
  };

  const handleDeleteBook = (bookId) => {
    console.log("Delete book with ID:", bookId);
  };

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoNext,
    canGoPrevious,
  } = usePagination({ data: mockBooks, itemsPerPage: 8 });

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <header className="bg-base-100 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Library className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Book Library</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                    <span className="text-sm">
                      {user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {user?.name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Your Books</h2>
              <p className="text-sm text-base-content/70 mt-1">
                {isLoading
                  ? "Loading..."
                  : error
                  ? "Failed to load books"
                  : `${filteredBooks.length} ${
                      filteredBooks.length === 1 ? "book" : "books"
                    }${
                      hasActiveFilters
                        ? ` (filtered from ${books.length} total)`
                        : ""
                    }`}
              </p>
            </div>

            <button className="btn btn-primary gap-2">
              <Plus className="w-4 h-4" />
              Add Book
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="input input-bordered w-full pl-10"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedGenre || "all"}
                onChange={(e) =>
                  dispatch(
                    setSelectedGenre(
                      e.target.value === "all" ? "" : e.target.value
                    )
                  )
                }
                className="select select-bordered w-48"
              >
                <option value="all">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="btn btn-outline btn-sm gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <div className="badge badge-secondary text-sm px-3 py-1">
                  Search: "{searchQuery}"
                </div>
              )}
              {selectedGenre && (
                <div className="badge badge-secondary text-sm px-3 py-1">
                  Genre: {selectedGenre}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedData.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="join">
                <button
                  onClick={goToPreviousPage}
                  disabled={!canGoPrevious}
                  className="join-item btn btn-sm"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`join-item btn btn-sm ${
                        page === currentPage ? "btn-primary" : ""
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={goToNextPage}
                  disabled={!canGoNext}
                  className="join-item btn btn-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
