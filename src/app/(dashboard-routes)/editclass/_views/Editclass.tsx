"use client";

import React, { useState } from "react";

interface CreateClassFormProperties {
  onCancel: () => void;
}

interface ClassFormData {
  title: string;
  fee: string;
  startDate: string;
  endDate: string;
  course: string;
  preference: "online" | "weekday" | "weekend";
  description: string;
}

const EditClassForm: React.FC<CreateClassFormProperties> = ({ onCancel }) => {
  const [formData] = useState<ClassFormData>({
    title: "",
    fee: "",
    startDate: "",
    endDate: "",
    course: "",
    preference: "weekend",
    description: "",
  });

  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   onSubmit(formData);
  // };

  return (
    <div className="py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-indigo-900">Edit Class</h2>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the fields below to create a new class under a course.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block font-semibold text-indigo-900">
              Class Title
            </label>
            <input
              type="text"
              className="w-full rounded border px-4 py-2"
              placeholder="Placeholder Text"
              value={formData.title}
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold text-indigo-900">
              Fee
            </label>
            <input
              type="text"
              className="w-full rounded border px-4 py-2"
              placeholder="Placeholder Text"
              value={formData.fee}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block font-semibold text-indigo-900">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full rounded border px-4 py-2"
                value={formData.startDate}
              />
              {/* <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" /> */}
            </div>
          </div>
          <div>
            <label className="mb-2 block font-semibold text-indigo-900">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full rounded border px-4 py-2"
                value={formData.endDate}
              />
              {/* <Calendar /> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block font-semibold text-indigo-900">
              Course
            </label>
            <select
              className="w-full rounded border px-4 py-2"
              value={formData.course}
            >
              <option value="">Placeholder Text</option>
              <option value="course1">Course 1</option>
              <option value="course2">Course 2</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block font-semibold text-indigo-900">
              Preference
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="preference"
                  value="online"
                  checked={formData.preference === "online"}
                  className="form-radio"
                />
                <span>Online</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="preference"
                  value="weekday"
                  checked={formData.preference === "weekday"}
                  className="form-radio"
                />
                <span>Weekday</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="preference"
                  value="weekend"
                  checked={formData.preference === "weekend"}
                  className="form-radio"
                />
                <span>Weekend</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-indigo-900">
            Description
          </label>
          <textarea
            className="h-32 w-full rounded border px-4 py-2"
            placeholder="Enter class description"
            value={formData.description}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default EditClassForm;
