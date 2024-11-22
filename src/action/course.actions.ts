import { courseFormData } from "~/schemas";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCourseAction = async (
  data: courseFormData,
  token: string,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  // console.log(response);

  if (!response.ok) {
    throw new Error("Failed to create course");
  }
};

export const fetchCoursesAction = async (
  token: string,
): Promise<courseFormData[]> => {
  const response = await fetch(`${BASE_URL}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
};
