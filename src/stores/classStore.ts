// import { create } from "zustand";

// import {
//   ClassData,
//   createClassAction,
//   deleteClassAction,
//   fetchClassesByCourseIdAction,
//   getClassByIdAction,
//   updateClassAction,
// } from "~/action/class.action";
// import { classFormData } from "~/schemas";

// interface ClassState {
//   classes: ClassData[];
//   fetchClasses: (courseId: string, token: string) => Promise<void>;
//   createClass: (
//     data: classFormData,
//     courseId: string,
//     token: string,
//   ) => Promise<void>;
//   getClassById: (id: string, token: string) => Promise<ClassData | undefined>;
//   deleteClass: (id: string, token: string) => Promise<void>;
//   updateClass: (
//     id: string,
//     data: classFormData,
//     token: string,
//   ) => Promise<void>;
// }

// export const useClassStore = create<ClassState>((set) => ({
//   classes: [],

//   // Fetch classes for a specific course
//   fetchClasses: async (courseId, token) => {
//     try {
//       const classes = await fetchClassesByCourseIdAction(courseId, token);
//       set({ classes });
//     } catch (error) {
//       console.error("Error fetching classes:", error);
//     }
//   },

//   // Create a new class for a specific course
//   createClass: async (data, courseId, token) => {
//     try {
//       await createClassAction(data, courseId, token);
//       // Refresh the classes list after creation
//       const classes = await fetchClassesByCourseIdAction(courseId, token);
//       set({ classes });
//     } catch (error) {
//       console.error("Error creating class:", error);
//       throw error;
//     }
//   },

//   // Get a class by its ID
//   getClassById: async (id, token) => {
//     try {
//       return await getClassByIdAction(id, token);
//     } catch (error) {
//       console.error("Error fetching class by ID:", error);
//       return;
//     }
//   },

//   // Update a class by its ID
//   updateClass: async (id, data, token) => {
//     try {
//       await updateClassAction(id, data, token);
//       // Optionally refresh the classes list after update
//       set((state) => ({
//         classes: state.classes.map((classItem) =>
//           classItem.id === id ? { ...classItem, ...data } : classItem,
//         ),
//       }));
//     } catch (error) {
//       console.error("Error updating class:", error);
//       throw error;
//     }
//   },

//   // Delete a class by its ID
//   deleteClass: async (id, token) => {
//     try {
//       await deleteClassAction(id, token);
//       // Remove the deleted class from the state
//       set((state) => ({
//         classes: state.classes.filter((classItem) => classItem.id !== id),
//       }));
//     } catch (error) {
//       console.error("Error deleting class:", error);
//       throw error;
//     }
//   },
// }));

import { create } from "zustand";

import {
  ClassData,
  createClassAction,
  fetchClassesByCourseIdAction,
} from "~/action/class.action";
import { classFormData } from "~/schemas";

// interface ClassState {
//   classes: ClassData[];
//   fetchClasses: (courseId: string, token: string) => Promise<void>;
//   createClass: (
//     data: classFormData,
//     courseId: string,
//     token: string,
//   ) => Promise<void>;
//   // updateClass: (
//   //   id: string,
//   //   data: classFormData,
//   //   token: string,
//   // ) => Promise<void>;
//   // deleteClass: (id: string, token: string) => Promise<void>;
// }
interface ClassState {
  classes: ClassData[];
  fetchClasses: (courseId: string, token: string) => Promise<void>;
  createClass: (
    data: classFormData,
    courseId: string,
    token: string,
  ) => Promise<void>;
}

export const useClassStore = create<ClassState>((set) => ({
  classes: [],

  fetchClasses: async (courseId, token) => {
    try {
      const classes = await fetchClassesByCourseIdAction(courseId, token);
      set({ classes });
    } catch {
      console.error("Error fetching classes:");
    }
  },

  createClass: async (data, courseId, token) => {
    try {
      const newClass = await createClassAction(data, courseId, token);

      set((state) => ({
        classes: [...state.classes, newClass], // No TypeScript error now
      }));
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },
}));
