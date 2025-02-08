"use client";

import { Calendar, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

import { ClassData, getClassByIdAction } from "~/action/class.action";
import { useFetchData } from "~/hooks/useFetchData";
import { useAuthStore } from "~/stores/authStore";
import { useCourseStore } from "~/stores/courseStore";

const ClassCards = () => {
  const { token } = useAuthStore();
  const courses = useCourseStore((state) => state.courses);
  const { loading, error } = useFetchData(token);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  // const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  // const [classModalOpen, setClassModalOpen] = useState(false);

  useEffect(() => {
    if (courses.length > 0) {
      setActiveCategory(courses[0].title);
      fetchClassesForCourse(courses[0].id);
    }
  }, []);

  const fetchClassesForCourse = async (courseId: string) => {
    try {
      if (token) {
        const response = await getClassByIdAction(courseId, token);
        setClasses(response);
      } else {
        console.error("Token is undefined");
      }
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  const handleCategoryChange = (category: string, courseId: string) => {
    setActiveCategory(category);
    fetchClassesForCourse(courseId);
  };

  console.log(classes);

  const filteredClasses = classes.filter(
    (c) => c.courseTitle === activeCategory,
  );

  // console.log(filteredClasses);

  if (loading) {
    return <div className="py-7 text-center"> please wait...</div>;
  }
  if (error) {
    return <div>Error fetching classes: {error}</div>;
  }

  const openClassModal = (classId: string) => {
    console.log(classId);
    setSelectedCourseId(classId);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        {courses.map((course, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium ${
              activeCategory === course.title
                ? "border-b-4 border-blue-700 text-blue-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleCategoryChange(course.title, course.id)}
          >
            {course.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.length === 0 && !loading ? (
          <div className="col-span-full text-center text-gray-500">
            <p>No classes available for this course</p>
          </div>
        ) : (
          filteredClasses.map((classInfo, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-indigo-900">
                  {classInfo.courseTitle}
                </h3>
                <button
                  onClick={() => openClassModal(classInfo.id)}
                  className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    <p>Start Date:</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {classInfo.startDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    <p>Duration:</p>
                  </div>
                  <span className="text-sm">16 Weeks</span>
                </div>

                <hr />

                <div className="flex items-center justify-between pt-8 text-gray-600">
                  <p>Preference:</p>
                  <span className="font-medium">{classInfo.type}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassCards;
