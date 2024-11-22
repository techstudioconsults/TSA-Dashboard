"use client";

import { Calendar, MoreVertical } from "lucide-react";
import { useState } from "react";

interface ClassInfo {
  title: string;
  startDate: string;
  duration: string;
  preference: string;
  category: string;
}

interface ClassCardProperties {
  classes?: ClassInfo[];
}

const ClassCards = ({ classes = [] }: ClassCardProperties) => {
  const [activeCategory, setActiveCategory] = useState(
    "Fullstack Web Development",
  );

  const defaultClasses: ClassInfo[] = [
    {
      title: "Fullstack Web Development",
      startDate: "Jan 18, 2023",
      duration: "16 Weeks",
      preference: "Weekday",
      category: "Fullstack Web Development",
    },
    {
      title: "Fullstack Web Development",
      startDate: "Jan 18, 2023",
      duration: "16 Weeks",
      preference: "Weekend",
      category: "Fullstack Web Development",
    },
    {
      title: "Fullstack Web Development",
      startDate: "Jan 18, 2023",
      duration: "16 Weeks",
      preference: "Online",
      category: "Fullstack Web Development",
    },
    {
      title: "UI/UX Design",
      startDate: "Feb 1, 2023",
      duration: "12 Weeks",
      preference: "Weekday",
      category: "UI/UX Design",
    },
    {
      title: "Front-end Web Development",
      startDate: "Mar 1, 2023",
      duration: "14 Weeks",
      preference: "Online",
      category: "Front-end Web Development",
    },
    {
      title: "Data Science",
      startDate: "April 1, 2023",
      duration: "18 Weeks",
      preference: "Weekend",
      category: "Data Science",
    },
    {
      title: "Cyber Security",
      startDate: "May 1, 2023",
      duration: "16 Weeks",
      preference: "Weekday",
      category: "Cyber Security",
    },
    {
      title: "Digital Marketing",
      startDate: "June 1, 2023",
      duration: "14 Weeks",
      preference: "Online",
      category: "Digital Marketing",
    },
  ];

  const filteredClasses =
    classes.length > 0
      ? classes.filter((c) => c.category === activeCategory)
      : defaultClasses.filter((c) => c.category === activeCategory);

  const categories = [...new Set(defaultClasses.map((c) => c.category))];

  return (
    <div className="">
      <div className="flex justify-between">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium ${
              activeCategory === category
                ? "border-b-4 border-blue-700 text-blue-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((classInfo, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold text-indigo-900">
                {classInfo.title}
              </h3>
              <button className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-sm">
                  {classInfo.startDate} ({classInfo.duration})
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-medium">{classInfo.preference}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassCards;
