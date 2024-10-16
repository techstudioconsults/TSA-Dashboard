/* eslint-disable unicorn/no-null */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Course } from "./services.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
type coursesState = {
  allCourses: Course[];
  loading: boolean;
  error: string | null;
  activeCourse: Course | null;
  getAllCourses: () => Promise<void>;
  setActiveCourse: (course: Course) => void;
};

const useCoursesStore = create<coursesState>()(
  devtools((set) => ({
    allCourses: [],
    loading: true,
    error: "",
    activeCourse: null,

    getAllCourses: async () => {
      set({ loading: true, error: null });

      try {
        const response = await fetch(`${BASE_URL}/external/courses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        set({
          allCourses: data.data,
          loading: false,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        } else {
          set({ error: "An unknown error occurred", loading: false });
        }
      }
    },

    setActiveCourse: (course: Course) => {
      set({ activeCourse: course });
    },
  })),
);

export default useCoursesStore;
