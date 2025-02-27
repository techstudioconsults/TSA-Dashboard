"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import SuccessModal from "~/components/modals/response-modal";
import { useFetchData } from "~/hooks/useFetchData";
import { useHandleDelete } from "~/hooks/useHandleDelete";
import { useAuthStore } from "~/stores/authStore";
import { useCourseStore } from "~/stores/courseStore";
import CourseModal from "./CourseModal";
import WarningModal from "./WarningModal";

const CourseCards = () => {
  const { token } = useAuthStore();
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const courses = useCourseStore((state) => state.courses);
  const { loading, error } = useFetchData(token);

  // console.log(courses);
  const router = useRouter();
  const { handleDeleteCourse } = useHandleDelete();

  const openCourseModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCourseModalOpen(true); // Open the edit/delete modal
  };

  const openWarningModal = () => {
    setWarningModalOpen(true); // Open the warning modal
  };

  const confirmDelete = () => {
    if (selectedCourseId) {
      handleDeleteCourse(selectedCourseId, () => setWarningModalOpen(false));
      setShowSuccessModal(true);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center">
        <p>No courses available</p>
      </div>
    );
  }

  console.log(courses);
  const handleContinue = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      {/* Warning Modal */}
      <WarningModal
        isOpen={warningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        onConfirm={confirmDelete} // Handle delete confirmation
      />

      {/* Course Modal */}
      <CourseModal
        open={courseModalOpen}
        setOpen={setCourseModalOpen}
        onEdit={() => router.push(`/courses/${selectedCourseId}`)}
        onDelete={openWarningModal} // Open the warning modal
      />

      {/* Course Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border-blue-700 bg-white p-4 transition-all hover:border-b-4"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {course.title}
              </h3>
              <button
                className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100"
                onClick={() => openCourseModal(course.id)} // Open the course modal
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-4 line-clamp-3 text-sm text-gray-600">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <span className="font-medium text-blue-500">Weekday:</span>
                <span className="ml-1 text-gray-600">
                  {course.duration?.weekday || 0} Weeks
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-blue-500">Weekend:</span>
                <span className="ml-1 text-gray-600">
                  {course.duration?.weekend || 0} Weeks
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-blue-500">Online:</span>
                <span className="ml-1 text-gray-600">
                  {course.duration?.online || 0} Weeks
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Course Deleted Successfully"
        description="Selected Course has been deleted"
        actionLabel="Continue"
        onAction={handleContinue}
      />
    </>
  );
};

export default CourseCards;
