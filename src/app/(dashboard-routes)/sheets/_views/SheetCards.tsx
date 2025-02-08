import { Calendar, MoreVertical, User } from "lucide-react";

interface Sheet {
  title: string;
  date: string;
  admin: string;
}

interface SheetGridProperties {
  sheets?: Sheet[];
}

const SheetCards = ({ sheets = [] }: SheetGridProperties) => {
  //    Create array with map to generate new objects for each element
  const defaultSheets: Sheet[] = Array.from({ length: 9 }, () => ({
    title: "September Marketing Cycle 2024",
    date: "June, 11, 2024",
    admin: "Admin",
  }));

  const displaySheets = sheets.length > 0 ? sheets : defaultSheets;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displaySheets.map((sheet, index) => (
        <div
          key={index}
          className="rounded-lg bg-white p-6 transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-lg font-semibold text-indigo-900">
              {sheet.title}
            </h3>
            <button className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-row items-end space-x-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="text-sm">{sheet.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <User className="mr-2 h-4 w-4" />
              <span className="text-sm">{sheet.admin}</span>
            </div>
          </div>

          <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
            View Sheet
          </button>
        </div>
      ))}
    </div>
  );
};

export default SheetCards;
