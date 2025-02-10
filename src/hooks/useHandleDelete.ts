import Cookies from "js-cookie";

import { deleteCourseAction } from "~/action/course.actions";
import { useCourseStore } from "~/stores/courseStore";

export const useHandleDelete = () => {
  const { fetchCourses } = useCourseStore();
  const token = Cookies.get("authToken");

  const handleDelete = async (courseId: string, closeModal: () => void) => {
    if (!courseId || !token) {
      console.error("Course ID or token is missing");
      return;
    }

    try {
      await deleteCourseAction(courseId, token);
      closeModal();
      fetchCourses(token);
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return { handleDelete };
};
