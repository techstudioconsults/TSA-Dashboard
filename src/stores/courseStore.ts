import { create } from "zustand";

import {
  createCourseAction,
  fetchCoursesAction,
} from "~/action/course.actions";
import { courseFormData } from "~/schemas";

interface CourseState {
  courses: courseFormData[]; // List of courses
  fetchCourses: (token: string) => Promise<void>; // Fetch courses from the server
  createCourse: (data: courseFormData, token: string) => Promise<void>; // Create a new course
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],

  fetchCourses: async (token) => {
    try {
      const courses = await fetchCoursesAction(token);
      set({ courses });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  },

  createCourse: async (data, token) => {
    try {
      await createCourseAction(data, token);
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },
}));
