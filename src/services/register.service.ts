/* eslint-disable unicorn/no-null */
import { create } from "zustand";

import { EducationPrograms } from "~/app/(landing-routes)/courses/types/index.types";
import { RegisterFormData } from "~/schemas";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/auth/register`;

interface registerFormState {
  isSubmitting: boolean;
  responseMessage: string | null;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setResponseMessage: (message: string | null) => void;
}

export async function getCourseData(slug: string): Promise<EducationPrograms> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/courses.json`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  const course = data.find(
    (course: object) =>
      Object.keys(course)[0].toLowerCase() === slug.toLowerCase(),
  );

  if (!course) {
    throw new Error("Course not found");
  }

  return course[slug];
}

export const useRegisterStore = create<registerFormState>((set) => ({
  isSubmitting: false,
  responseMessage: null,
  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
  setResponseMessage: (message: string | null) =>
    set({ responseMessage: message }),
}));

// Hook for form submission logic
export const useSubmitRegisterForm = (courseID: string) => {
  const { setIsSubmitting, setResponseMessage } = useRegisterStore();

  return async (data: RegisterFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}?curseId=${courseID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send your message");
      }
      // comback to handle this properly with original error message
      const responseData = await response.json();
      setResponseMessage(responseData.message);
      return responseData;
    } catch (error) {
      setResponseMessage("Failed to register course. Please try again later.");
      return error;
    } finally {
      setIsSubmitting(false);
    }
  };
};
