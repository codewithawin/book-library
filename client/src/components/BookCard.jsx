import { useState } from "react";
import { Edit, Trash2, Calendar, User, Tag } from "lucide-react";

const BookCard = ({ book, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  const statusColors = {
    available: "badge badge-success",
    borrowed: "badge badge-accent",
    lost: "badge badge-error",
  };

  return (
    <div className="group relative card bg-base-100 shadow-md p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col h-full">
        <div className="relative mb-4 aspect-[3/4] rounded-lg overflow-hidden bg-base-200">
          {book.coverImage && !imageError ? (
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-base-300">
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Tag className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-base-content">
                  {book.title}
                </p>
                <p className="text-xs text-base-content/70 mt-1">
                  {book.author}
                </p>
              </div>
            </div>
          )}

          <div className="absolute top-2 right-2">
            <span className={`${statusColors[book.status] || "badge"} text-xs`}>
              {book.status}
            </span>
          </div>
        </div>

        <div className="flex-1 pb-12">
          {" "}
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {book.title}
          </h3>
          <div className="flex items-center text-base-content/70 mb-2">
            <User className="w-4 h-4 mr-1 flex-shrink-0" />
            <p className="text-sm truncate">{book.author}</p>
          </div>
          <div className="flex items-center text-base-content/70 mb-2">
            <Tag className="w-4 h-4 mr-1 flex-shrink-0" />
            <p className="text-sm truncate">{book.genre}</p>
          </div>
          <div className="flex items-center text-base-content/70 mb-3">
            <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
            <p className="text-sm">{book.publishedYear}</p>
          </div>
          {book.description && (
            <p className="text-sm text-base-content/70 line-clamp-3">
              {book.description}
            </p>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="btn btn-outline btn-sm flex-1"
            onClick={() => onEdit(book)}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button
            className="btn btn-outline btn-sm btn-error flex-1"
            onClick={() => onDelete(book._id)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
