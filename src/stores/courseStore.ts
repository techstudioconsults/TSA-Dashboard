import { create } from "zustand";

import {
  createCourseAction,
  deleteCourseAction,
  fetchCoursesAction,
  getCourseByIdAction,
  getTotalCourseAction,
  updateCourseAction,
} from "~/action/course.actions";
import { courseFormData } from "~/schemas";

export interface CourseData {
  id: string;
  title: string;
  description: string;
  duration: {
    online: number;
    weekday: number;
    weekend: number;
  };
  curriculum?: File | string | null; // Make curriculum optional with ?
}

interface CourseState {
  courses: CourseData[];
  fetchCourses: (token: string) => Promise<void>;
  createCourse: (formData: FormData, token: string) => Promise<courseFormData>;
  getCourseById: (id: string, token: string) => Promise<CourseData | undefined>;
  deleteCourse: (id: string, token: string) => Promise<void>;
  updateCourse: (
    id: string,
    formData: FormData,
    token: string,
  ) => Promise<void>;
  totalCourse: number;
  fetchTotalCourse: (token: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  totalCourse: 0,

  fetchCourses: async (token) => {
    try {
      const courses = await fetchCoursesAction(token);
      // Add null curriculum to each course to match CourseData interface
      const coursesWithCurriculum = courses.map((course) => ({
        ...course,
        curriculum: null,
      }));
      set({ courses: coursesWithCurriculum });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  },

  // createCourse: async (formData, token) => {
  //   try {
  //     const newCourse = await createCourseAction(formData, token);
  //     // Get the curriculum file from formData
  //     const curriculumFile = formData.get("curriculum") as File;

  //     // Add the new course with curriculum to the store
  //     const courseWithCurriculum = {
  //       ...newCourse,
  //       curriculum: curriculumFile,
  //     };

  //     set({ courses: [...get().courses, courseWithCurriculum] });
  //     return newCourse;
  //   } catch (error) {
  //     console.error("Error creating course:", error);
  //     throw error;
  //   }
  // },

  //   createCourse: async (formData, token) => {
  //   try {
  //     const newCourse = await createCourseAction(formData, token);
  //     const curriculumFile = formData.get("curriculum") as File;

  //     // Ensure courseWithCurriculum includes all required CourseData properties
  //     const courseWithCurriculum: CourseData = {
  //       ...newCourse, // Ensure newCourse includes 'id' and 'duration'
  //       curriculum: curriculumFile,
  //     };

  //     set({ courses: [...get().courses, courseWithCurriculum] });
  //     return newCourse;
  //   } catch (error) {
  //     console.error("Error creating course:", error);
  //     throw error;
  //   }
  // },
  // createCourse: async (formData, token) => {
  //   try {
  //     const newCourse = await createCourseAction(formData, token);
  //     const curriculumFile = formData.get("curriculum") as File | null;

  //     // Ensure newCourse has all required properties before assigning to CourseData
  //     const courseWithCurriculum: CourseData = {
  //       id: newCourse.id, // Ensure `id` exists
  //       title: newCourse.title,
  //       description: newCourse.about, // Ensure `description` matches `about`
  //       duration: {
  //         online: newCourse.onlineDuration,
  //         weekday: newCourse.weekdayDuration,
  //         weekend: newCourse.weekendDuration,
  //       },
  //       curriculum: curriculumFile ?? null, // Assign curriculum if available
  //     };

  //     set({ courses: [...get().courses, courseWithCurriculum] });
  //     return newCourse;
  //   } catch (error) {
  //     console.error("Error creating course:", error);
  //     throw error;
  //   }
  // },

  // createCourse: async (formData, token) => {
  //   try {
  //     const newCourse = await createCourseAction(formData, token);
  //     const curriculumFile = formData.get("curriculum") as File | null;

  //     // Merge curriculum file into the new course data
  //     const courseWithCurriculum: courseFormData = {
  //       ...newCourse,
  //       curriculum: curriculumFile ?? newCourse.curriculum, // Ensure curriculum is set
  //     };

  //     set({ courses: [...get().courses, courseWithCurriculum] });
  //     return newCourse;
  //   } catch (error) {
  //     console.error("Error creating course:", error);
  //     throw error;
  //   }
  // },

  createCourse: async (formData, token) => {
    try {
      const newCourse = await createCourseAction(formData, token);
      const curriculumFile = formData.get("curriculum") as File;

      const generatedId = crypto.randomUUID();

      // Transform `courseFormData` into `CourseData`
      const courseWithCurriculum: CourseData = {
        id: generatedId, // Use generated ID instead of API response
        title: newCourse.title,
        description: newCourse.about, // Match 'about' to 'description'
        duration: {
          online: newCourse.onlineDuration,
          weekday: newCourse.weekdayDuration,
          weekend: newCourse.weekendDuration,
        },
        curriculum: curriculumFile, // Store the uploaded file locally
      };

      set({ courses: [...get().courses, courseWithCurriculum] });
      return newCourse;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  getCourseById: async (id, token) => {
    try {
      const course = await getCourseByIdAction(id, token);
      if (course) {
        // Return the course with null curriculum since API doesn't return it
        return {
          ...course,
          curriculum: null,
        };
      }
      return;
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      return;
    }
  },

  updateCourse: async (id, formData, token) => {
    try {
      await updateCourseAction(id, formData, token);

      // Fetch the updated course to refresh the store
      const updatedCourse = await getCourseByIdAction(id, token);

      if (updatedCourse) {
        // Get curriculum file from formData if it exists
        const curriculumFile = formData.get("curriculum") as File | null;

        // Update the courses array with the updated course
        set({
          courses: get().courses.map((course) =>
            course.id === id
              ? { ...updatedCourse, curriculum: curriculumFile }
              : course,
          ),
        });
      }
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  deleteCourse: async (id, token) => {
    try {
      await deleteCourseAction(id, token);
      set({ courses: get().courses.filter((course) => course.id !== id) });
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  },

  fetchTotalCourse: async (token) => {
    try {
      const total = await getTotalCourseAction(token);
      set({ totalCourse: total });
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
