// import { create } from "zustand";

// import {
//   createCourseAction,
//   fetchCoursesAction,
// } from "~/action/course.actions";
// import { courseFormData } from "~/schemas";

// interface CourseState {
//   courses: courseFormData[]; // List of courses
//   fetchCourses: (token: string) => Promise<void>; // Fetch courses from the server
//   createCourse: (data: courseFormData, token: string) => Promise<void>; // Create a new course
// }

// export const useCourseStore = create<CourseState>((set) => ({
//   courses: [],

//   fetchCourses: async (token) => {
//     try {
//       const courses = await fetchCoursesAction(token);
//       set({ courses });
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   },

//   createCourse: async (data, token) => {
//     try {
//       await createCourseAction(data, token);
//     } catch (error) {
//       console.error("Error creating course:", error);
//       throw error;
//     }
//   },
// }));

// import { create } from "zustand";

// import {
//   createCourseAction,
//   fetchCoursesAction,
//   getCourseByIdAction,
//   updateCourseAction,
// } from "~/action/course.actions";
// import { courseFormData } from "~/schemas";

// interface CourseState {
//   courses: courseFormData[]; // List of courses
//   fetchCourses: (token: string) => Promise<void>; // Fetch all courses from the server
//   createCourse: (data: courseFormData, token: string) => Promise<void>; // Create a new course
//   getCourseById: (id: string, token: string) => Promise<courseFormData | null>; // Fetch a single course by ID
//   updateCourse: (
//     id: string,
//     data: courseFormData,
//     token: string,
//   ) => Promise<void>; // Update an existing course
// }

// // interface CourseData {
// //    id: string;
// //   title: string;
// //   description: string;
// //   duration: {
// //     weekday: number;
// //     weekend: number;
// //     online: number;
// //   };
// // }

// export const useCourseStore = create<CourseState>((set) => ({
//   courses: [],

//   fetchCourses: async (token) => {
//     try {
//       const courses = await fetchCoursesAction(token);
//       set({ courses });
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   },

//   createCourse: async (data, token) => {
//     try {
//       await createCourseAction(data, token);
//     } catch (error) {
//       console.error("Error creating course:", error);
//       throw error;
//     }
//   },

//   getCourseById: async (id, token) => {
//     try {
//       const course = await getCourseByIdAction(id, token);
//       return course;
//     } catch (error) {
//       console.error("Error fetching course by ID:", error);
//       return null;
//     }
//   },

//   updateCourse: async (id, data, token) => {
//     try {
//       await updateCourseAction(id, data, token);
//     } catch (error) {
//       console.error("Error updating course:", error);
//       throw error;
//     }
//   },
// }));

// import { create } from "zustand";

// import {
//   createCourseAction,
//   fetchCoursesAction,
//   getCourseByIdAction,
//   updateCourseAction,
// } from "~/action/course.actions";
// import { courseFormData } from "~/schemas";

// // Define the CourseData type for API interaction
// export interface CourseData {
//   id: string;
//   title: string;
//   description: string;
//   duration: {
//     online: number;
//     weekday: number;
//     weekend: number;
//   };
// }

// // Define the store's state
// interface CourseState {
//   courses: CourseData[]; // List of courses fetched from the API
//   fetchCourses: (token: string) => Promise<void>; // Fetch all courses
//   createCourse: (data: courseFormData, token: string) => Promise<void>; // Create a new course
//   getCourseById: (id: string, token: string) => Promise<CourseData | undefined>; // Get a course by ID
//   updateCourse: (
//     id: string,
//     data: courseFormData,
//     token: string,
//   ) => Promise<void>; // Update an existing course
// }

// // Zustand store definition
// export const useCourseStore = create<CourseState>((set) => ({
//   courses: [],

//   fetchCourses: async (token) => {
//     try {
//       const courses = await fetchCoursesAction(token); // Fetch data from the action
//       set({ courses });
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   },

//   createCourse: async (data, token) => {
//     try {
//       await createCourseAction(data, token); // Call the create course action
//     } catch (error) {
//       console.error("Error creating course:", error);
//       throw error;
//     }
//   },

//   getCourseById: async (id, token) => {
//     try {
//       const course = await getCourseByIdAction(id, token);
//       // console.log(token);
//       // console.log(id );
//       // console.log(course);
//       return course;
//     } catch (error) {
//       console.error("Error fetching course by ID:", error);
//       return;
//     }
//   },

//   updateCourse: async (id, data, token) => {
//     try {
//       await updateCourseAction(id, data, token); // Call the update course action
//     } catch (error) {
//       console.error("Error updating course:", error);
//       throw error;
//     }
//   },
// }));

import { create } from "zustand";

import {
  createCourseAction,
  deleteCourseAction,
  fetchCoursesAction,
  getCourseByIdAction,
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
}));
