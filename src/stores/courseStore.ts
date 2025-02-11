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
}

interface CourseState {
  courses: CourseData[];
  fetchCourses: (token: string) => Promise<void>;
  createCourse: (data: courseFormData, token: string) => Promise<void>;
  getCourseById: (id: string, token: string) => Promise<CourseData | undefined>;
  deleteCourse: (id: string, token: string) => Promise<void>;
  updateCourse: (
    id: string,
    data: courseFormData,
    token: string,
  ) => Promise<void>;
  totalCourse: number;
  fetchTotalCourse: (token: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  totalCourse: 0,

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

  getCourseById: async (id, token) => {
    try {
      return await getCourseByIdAction(id, token);
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      return;
    }
  },

  updateCourse: async (id, data, token) => {
    try {
      await updateCourseAction(id, data, token);
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  deleteCourse: async (id, token) => {
    try {
      await deleteCourseAction(id, token);
    } catch (error) {
      console.error("Error deleting course:", error);
      console.log(error);
    }
  },

  fetchTotalCourse: async (token) => {
    try {
      // console.log("Token:", token);
      const total = await getTotalCourseAction(token);
      // console.log("API Response:", total);
      set({ totalCourse: total });
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
