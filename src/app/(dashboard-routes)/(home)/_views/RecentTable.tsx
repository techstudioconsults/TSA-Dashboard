const RecentTable = () => {
  interface ActivityItem {
    id: number;
    type: "Course Creation" | "Sheet Creation" | "Class Creation";
    description: string;
    dateTime: string;
  }

  // Dummy data
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: "Course Creation",
      description: "Full Stack Web Development",
      dateTime: "Sep 16, 2024, 3:00 PM",
    },
    {
      id: 2,
      type: "Sheet Creation",
      description: "August (2025) Marketing Cycle Sheet",
      dateTime: "Sep 13, 2024, 10:23 AM",
    },
    {
      id: 3,
      type: "Class Creation",
      description: "Full Stack Web Development (January 2025)",
      dateTime: "Sep 10, 2024, 1:00 PM",
    },
    // Add more items as needed
  ];

  return (
    <div>
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Activities
            </h2>
            <div className="flex space-x-2">
              <button className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100">
                Filter
              </button>
              <button className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100">
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {activity.type}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {activity.description}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {activity.dateTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">10 Entries per page</p>
            <div className="flex space-x-2">
              <button
                className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTable;
