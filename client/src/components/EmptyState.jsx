import { Plus, Library } from "lucide-react";

const EmptyState = ({ onAddBook }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Library className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-2xl font-semibold">Your Library is Empty</h3>

          <p className="text-base-content/70 max-w-sm mx-auto leading-relaxed">
            Start building your digital book collection by adding your first
            book. Keep track of what you've read and what's next on your list.
          </p>

          <div className="pt-4">
            <button onClick={onAddBook} className="btn btn-primary gap-2 px-6">
              <Plus className="w-5 h-5" />
              Add Your First Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
