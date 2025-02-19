import Cookies from "js-cookie";

import { deleteClassAction } from "~/action/class.action";
import { deleteCourseAction } from "~/action/course.actions";
// import { deleteSpreadsheetAction } from "~/action/sheet.actions";
// import { useClassStore } from "~/stores/classStore";
import { useCourseStore } from "~/stores/courseStore";

export const useHandleDelete = () => {
  const { fetchCourses } = useCourseStore();
  // const { fetchClasses } = useClassStore(); // Use deleteClass from the store
  const token = Cookies.get("authToken");

  const handleDeleteCourse = async (
    courseId: string,
    closeModal: () => void,
  ) => {
    if (!courseId || !token) {
      console.error("Course ID or token is missing");
      return;
    }

    try {
      await deleteCourseAction(courseId, token);
      closeModal();
      fetchCourses(token); // Refresh the list of courses
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const handleDeleteClass = async (
    classId: string,
    courseId: string,
    closeModal: () => void,
    refetchClasses: () => Promise<void>, // Callback to refetch classes
  ) => {
    if (!classId || !courseId || !token) {
      console.error("Class ID, Course ID, or token is missing");
      return;
    }

    try {
      await deleteClassAction(classId, token);
      closeModal();
      await refetchClasses(); // Call the refetch callback
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  // const handleDeleteSpreadsheet = async (
  //   sheetId: string,
  //   closeModal: () => void,
  //   refetchSheets: () => Promise<void>,
  // ) => {
  //   const token = Cookies.get("authToken");

  //   if (!sheetId || !token) {
  //     console.error("Sheet ID or token is missing");
  //     return;
  //   }

  //   try {
  //     await deleteSpreadsheetAction(sheetId, token);
  //     closeModal(); // Close the modal only on success
  //     await refetchSheets(); // Refresh the list of sheets
  //   } catch (error) {
  //     console.error("Failed to delete spreadsheet:", error);
  //   }
  // };

  return { handleDeleteCourse, handleDeleteClass };
};
