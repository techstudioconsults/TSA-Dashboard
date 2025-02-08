import { Dialog } from "@headlessui/react";
import { Pencil, Trash } from "lucide-react";

interface CourseModalProperties {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CourseModal({
  open,
  setOpen,
  onEdit,
  onDelete,
}: CourseModalProperties) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      {/* Dialog Backdrop */}
      <div className="fixed inset-0 bg-gray-400 opacity-40 shadow-xl" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-52">
            <div className="p-4">
              <button
                className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onEdit();
                  setOpen(false);
                }}
              >
                <Pencil className="h-5 w-5 text-gray-700" />
                <span>Edit Course</span>
              </button>
              <button
                className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
              >
                <Trash className="h-5 w-5 text-red-600" />
                <span>Delete Course</span>
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
