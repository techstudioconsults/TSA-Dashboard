"use client";

import { TsaButton } from "@strategic-dot/components";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";

import { useActivityStore } from "~/stores/activityStore";
import { useAuthStore } from "~/stores/authStore";

const formatDateTime = (dateString: string): string => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return dateString;
  }
};

const RecentTable = () => {
  const { activities, isLoading, error, fetchActivities } = useActivityStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchActivities(token);
    }
  }, [fetchActivities, token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Add a check for activities existence
  if (!activities?.data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">No activities found</div>
      </div>
    );
  }
  console.log(activities);

  return (
    <div>
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Activities
            </h2>
            <div className="flex space-x-3">
              <TsaButton
                variant="outline"
                className="rounded border-gray-600 px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Filter
              </TsaButton>
              <TsaButton
                variant="outline"
                className="rounded border-gray-600 px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Export
              </TsaButton>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-950">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-950">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-950">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {activities.data.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {activity.activity}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {activity.description}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {formatDateTime(activity.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              {activities.data.length} Entries shown
            </p>
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
