"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Duration {
  online: number;
  weekend: number;
  weekday: number;
}

interface CourseFormData {
  title: string;
  about: string;
  duration: Duration;
}

const EditCourseForm = () => {
  const [formData] = useState<CourseFormData>({
    title: "",
    about: "",
    duration: {
      online: 0,
      weekend: 0,
      weekday: 0,
    },
  });

  // const handleDurationChange = (type: keyof Duration, value: string) => {
  //   setFormData((previous) => ({
  //     ...previous,
  //     duration: {
  //       ...previous.duration,
  //       [type]: Number.parseInt(value) || 0,
  //     },
  //   }));
  // };

  return (
    <div className="max-w-full">
      {/* Header with action buttons */}
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <h1 className="text-xl font-semibold text-blue-950">
              Create New Course
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Fill in the fields below to create a new course.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Form Content */}
      <form>
        <div className="mb-6 grid grid-cols-2 items-center gap-8">
          {/* Title Section */}
          <div>
            <label className="mb-2 block font-semibold text-blue-950">
              Title
            </label>
            <input
              type="text"
              placeholder="Placeholder Text"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
            />
          </div>

          {/* Duration Section */}
          <div className="">
            <label className="mb-2 block font-semibold text-blue-950">
              Duration
            </label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Online Duration */}
              <div className="flex items-center gap-3">
                <label className="mb-1 block text-sm text-gray-500">
                  Online
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.duration.online}
                >
                  {Array.from({ length: 53 }).map((_, index) => (
                    <option key={index} value={index}>
                      {index} Weeks
                    </option>
                  ))}
                </select>
              </div>

              {/* Weekend Duration */}
              <div className="flex items-center gap-3">
                <label className="mb-1 block text-sm text-gray-500">
                  Weekend
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.duration.weekend}
                >
                  {Array.from({ length: 53 }).map((_, index) => (
                    <option key={index} value={index}>
                      {index} Weeks
                    </option>
                  ))}
                </select>
              </div>

              {/* Weekday Duration */}
              <div className="flex items-center gap-3">
                <label className="mb-1 block text-sm text-gray-500">
                  Weekday
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.duration.weekday}
                >
                  {Array.from({ length: 53 }).map((_, index) => (
                    <option key={index} value={index}>
                      {index} Weeks
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* About Course Section */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-blue-950">
            About Course
          </label>
          <textarea
            placeholder="Placeholder Text"
            className="h-32 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.about}
          />
        </div>
      </form>
    </div>
  );
};

export default EditCourseForm;
