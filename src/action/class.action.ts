import { classFormData } from "~/schemas";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export interface ClassData {
  id: string;
  courseTitle: string;
  description: string;
  fee: string;
  startDate: string;
  endDate: string;
  courseId: string;
  type: "online" | "weekday" | "weekend";
}

interface APIError {
  status?: number;
  message: string;
  details?: Record<string, unknown>;
}

interface APIResponse<T> {
  data: T;
  message?: string;
  errors?: Record<string, unknown>;
}

interface OngoingClassesResponse {
  data: {
    ongoing: ClassData[];
  };
}

export const createClassAction = async (
  data: Omit<classFormData, "course">,
  courseId: string,
  token: string,
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/cohorts/courses/${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: APIResponse<unknown> = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: "Failed to create class", // Ensure no extra spaces here
        details: responseData.errors || {},
      } as APIError;
    }
  } catch (error) {
    const apiError = error as APIError;
    console.error("Error in createClassAction:", apiError);
    throw {
      message: apiError.message || "An unexpected error occurred.",
      details: apiError.details || {},
    } as APIError;
  }
};

export const fetchClassesByCourseIdAction = async (
  courseId: string,
  token: string,
): Promise<ClassData[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cohorts/courses/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: APIResponse<ClassData[]> = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: "Failed to fetch classes",
      } as APIError;
    }

    return responseData.data;
  } catch (error) {
    const apiError = error as APIError;
    console.error("Error in fetchClassesByCourseIdAction:", apiError);
    throw {
      message: apiError.message || "An unexpected error occurred.",
    } as APIError;
  }
};

export const getClassByIdAction = async (
  courseId: string,
  token: string,
): Promise<ClassData[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cohorts/courses/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const responseData: OngoingClassesResponse = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        message: "Failed to fetch classes", // Default message
      } as APIError;
    }

    return responseData.data.ongoing;
  } catch (error) {
    const apiError = error as APIError;
    console.error("Error fetching classes by course:", apiError);
    throw {
      message: apiError.message || "An unexpected error occurred.",
    } as APIError;
  }
};

// export const getClassByIdAction = async (
//   courseId: string,
//   token: string,
// ): Promise<ClassData[]> => {
//   try {
//     const response = await fetch(`${BASE_URL}/cohorts/courses/${courseId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const responseData: OngoingClassesResponse = await response.json();
//     if (!response.ok) {
//       throw {
//         status: response.status,
//         message: responseData.message || "Failed to fetch classes",
//         // message: "Failed to fetch classes",
//       } as APIError;
//     }

//     return responseData.data.ongoing;
//   } catch (error) {
//     const apiError = error as APIError;
//     console.error("Error fetching classes by course:", apiError);
//     throw {
//       message: apiError.message || "An unexpected error occurred.",
//     } as APIError;
//   }
// };

// export const updateClassAction = async (
//   id: string,
//   data: classFormData,
//   token: string,
// ): Promise<void> => {
//   try {
//     const response = await fetch(`${BASE_URL}/classes/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorBody: APIResponse<unknown> = await response.json();
//       throw {
//         status: response.status,
//         message: errorBody.message || "Failed to update class",
//         details: errorBody,
//       } as APIError;
//     }
//   } catch (error) {
//     const apiError = error as APIError;
//     console.error("Error in updateClassAction:", apiError);
//     throw apiError;
//   }
// };

// export const deleteClassAction = async (
//   id: string,
//   token: string,
// ): Promise<void> => {
//   try {
//     const response = await fetch(`${BASE_URL}/classes/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to delete class: ${response.statusText}`);
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error in deleteClassAction:", error);
//       throw error;
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };
