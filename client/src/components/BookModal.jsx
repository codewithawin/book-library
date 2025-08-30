import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook } from "../store/slices/booksSlice";

const BookModal = ({ isOpen, onClose, book }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

  const genres = Array.from(new Set(books.map((book) => book.genre))).filter(
    Boolean
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedStatus = watch("status");

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("genre", book.genre);
      setValue("publishedYear", book.publishedYear);
      setValue("isbn", book.isbn || "");
      setValue("description", book.description || "");
      setValue("coverImage", book.coverImage || "");
      setValue("status", book.status);
    } else {
      reset({
        title: "",
        author: "",
        genre: "",
        publishedYear: new Date().getFullYear(),
        isbn: "",
        description: "",
        coverImage: "",
        status: "available",
      });
    }
  }, [book, reset, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (book) {
        await dispatch(updateBook({ ...book, ...data }));
      } else {
        await dispatch(addBook(data));
      }

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">
          {book ? "Edit Book" : "Add New Book"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Title *</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter book title"
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Author *</span>
              </label>
              <input
                type="text"
                {...register("author", { required: "Author is required" })}
                placeholder="Enter author name"
                className="input input-bordered w-full"
              />
              {errors.author && (
                <p className="text-error text-sm mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Genre *</span>
              </label>
              <input
                list="genres"
                {...register("genre", { required: "Genre is required" })}
                placeholder="Select or type genre"
                className="input input-bordered w-full"
              />
              <datalist id="genres">
                {genres.map((g) => (
                  <option key={g} value={g} />
                ))}
              </datalist>
              {errors.genre && (
                <p className="text-error text-sm mt-1">
                  {errors.genre.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Published Year *</span>
              </label>
              <input
                type="number"
                {...register("publishedYear", {
                  required: "Published year is required",
                  min: { value: 1000, message: "Invalid year" },
                  max: {
                    value: new Date().getFullYear(),
                    message: "Year cannot be in the future",
                  },
                })}
                placeholder="e.g., 2023"
                className="input input-bordered w-full"
              />
              {errors.publishedYear && (
                <p className="text-error text-sm mt-1">
                  {errors.publishedYear.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setValue("status", e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text">ISBN</span>
            </label>
            <input
              type="text"
              {...register("isbn")}
              placeholder="Enter ISBN (optional)"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Cover Image URL</span>
            </label>
            <input
              type="text"
              {...register("coverImage")}
              placeholder="Enter image URL (optional)"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter description (optional)"
              className="textarea textarea-bordered w-full min-h-[100px]"
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading
                ? book
                  ? "Updating..."
                  : "Adding..."
                : book
                ? "Update Book"
                : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
