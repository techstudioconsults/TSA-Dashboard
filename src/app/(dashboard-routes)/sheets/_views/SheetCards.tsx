"use client";

import { TsaButton } from "@strategic-dot/components";
import { Calendar, MoreVertical, User } from "lucide-react";
import { useEffect } from "react";

// import { useHandleDelete } from "~/hooks/useHandleDelete";
import { useAuthStore } from "~/stores/authStore";
import { useSheetStore } from "~/stores/sheetStore";

// import SheetModal from "./SheetModal";
// import WarningModal from "./WarningModal";

// Function to format the date
const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const SheetCards = () => {
  const token = useAuthStore((state) => state.token);
  const sheetData = useSheetStore((state) => state.sheetData);
  const fetchSheets = useSheetStore((state) => state.fetchSheets);

  // const [isModalOpen, setModalOpen] = useState(false);
  // const [warningModalOpen, setWarningModalOpen] = useState(false);
  // const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);

  // const { handleDeleteSpreadsheet } = useHandleDelete();

  useEffect(() => {
    if (token) {
      fetchSheets(token);
    }
  }, [token, fetchSheets]);

  // Function to handle delete action
  // const handleDelete = async () => {
  //   if (!selectedSheetId || !token) return;

  //   try {
  //     await handleDeleteSpreadsheet(
  //       selectedSheetId,
  //       () => setWarningModalOpen(false),
  //       () => fetchSheets(token),
  //     );
  //   } catch (error) {
  //     console.error("Error deleting spreadsheet:", error);
  //   }
  // };

  // const openModal = (sheetId: string) => {
  //   setSelectedSheetId(sheetId);
  //   setModalOpen(true);
  // };

  // const openWarningModal = () => {
  //   setWarningModalOpen(true);
  // };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sheetData.length > 0 ? (
        sheetData.map((sheet) => (
          <div
            key={sheet.id}
            className="rounded-lg bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold text-indigo-900">
                {sheet.title}
              </h3>
              <TsaButton
                className="border-0 px-0 shadow-none"
                // onClick={() => openModal(sheet.id)}
              >
                <MoreVertical className="h-5 w-5" />
              </TsaButton>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-sm">{formatDate(sheet.createdAt)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="mr-2 h-4 w-4" />
                <span className="text-sm">Admin</span>
              </div>
            </div>

            <a
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-b-indigo-900"
            >
              <TsaButton className="mt-4 border-0 px-0 text-sm font-medium text-indigo-900 shadow-none hover:text-blue-700">
                View Sheet
              </TsaButton>
            </a>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No sheets available
        </p>
      )}
      {/* <SheetModal
        open={isModalOpen}
        setOpen={setModalOpen}
        onDelete={openWarningModal}
        onEdit={() => console.log("Edit action triggered")}
      />

      <WarningModal
        isOpen={warningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        onConfirm={handleDelete}
      /> */}
    </div>
  );
};

export default SheetCards;
