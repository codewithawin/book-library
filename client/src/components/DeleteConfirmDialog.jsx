import { AlertTriangle } from "lucide-react";

const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  bookTitle,
  isLoading = false,
}) => {
  return (
    <dialog id="delete_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-error/10">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">Delete Book</h3>
            <p className="py-2 text-sm">
              Are you sure you want to delete{" "}
              <span className="font-semibold">"{bookTitle}"</span>? <br />
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="modal-action">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="btn btn-error text-white"
          >
            {isLoading ? "Deleting..." : "Delete Book"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteConfirmDialog;
