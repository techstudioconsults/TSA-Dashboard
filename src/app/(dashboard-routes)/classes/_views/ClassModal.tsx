import { Dialog, DialogContent } from "@strategic-dot/components";
import { Pencil, Trash } from "lucide-react";

interface ClassModalProperties {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ClassModal({
  open,
  setOpen,
  onEdit,
  onDelete,
}: ClassModalProperties) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-60">
        <div className="p-4">
          <button
            className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
          >
            <Pencil className="h-5 w-5 text-gray-700" />
            <span>Edit Class</span>
          </button>
          <button
            className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={() => {
              onDelete(); // Open WarningModal
              setOpen(false); // Close ClassModal
            }}
          >
            <Trash className="h-5 w-5 text-red-600" />
            <span>Delete Class</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
