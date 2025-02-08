// // action/class.actions.ts
// import { classFormData } from "~/schemas";

// const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

// export interface ClassData {
//   id: string;
//   title: string;
//   description: string;
//   fee: string;
//   startDate: string;
//   endDate: string;
//   courseId: string;
//   type: "online" | "weekday" | "weekend";
// }

// export const createClassAction = async (
//   data: Omit<classFormData, "course">, // Exclude `course` from the type
//   courseId: string, // Accept `courseId` as a separate parameter
//   token: string,
// ): Promise<void> => {
//   try {
//     const response = await fetch(`${BASE_URL}/cohorts/courses/${courseId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data), // Only send the required fields
//     });

//     const responseData = await response.json();
//     console.log(responseData);

//     if (!response.ok) {
//       throw {
//         status: response.status,
//         message: responseData.message || "Failed to create class",
//         details: responseData.errors || {}, // Include field-specific errors if available
//       };
//     }
//   } catch (error: any) {
//     console.error("Error in createClassAction:", error);
//     throw {
//       message: error.message || "An unexpected error occurred.",
//       details: error.details || {}, // Pass field-specific errors if any
//     };
//   }
// };

// export const fetchClassesByCourseIdAction = async (
//   courseId: string,
//   token: string,
// ): Promise<ClassData[]> => {
//   try {
//     const response = await fetch(`${BASE_URL}/cohorts/courses/${courseId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const responseData = await response.json();

//     if (!response.ok) {
//       throw {
//         status: response.status,
//         message: responseData.message || "Failed to fetch classes",
//       };
//     }
//     if (!response.ok) {
//       throw {
//         status: response.status,
//         message: responseData.message || "Failed to fetch classes",
//       };
//     }

//     return responseData as ClassData[];
//   } catch (error: any) {
//     console.error("Error in fetchClassesByCourseIdAction:", error);
//     throw {
//       message: error.message || "An unexpected error occurred.",
//     };
//   }
// };

// // Get class by ID
// // export const getClassByIdAction = async (
// //   id: string,
// //   token: string,
// // ): Promise<ClassData> => {
// //   try {
// //     const response = await fetch(`${BASE_URL}/classes/${id}`, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });

// //     if (!response.ok) {
// //       throw new Error(`Failed to fetch class: ${response.statusText}`);
// //     }

// //     const classData = await response.json();

// //     return {
// //       id: classData.data.id,
// //       title: classData.data.title,
// //       description: classData.data.description,
// //       fee: classData.data.fee,
// //       startDate: classData.data.startDate,
// //       endDate: classData.data.endDate,
// //       courseId: classData.data.courseId,
// //       type: classData.data.type,
// //     };
// //   } catch (error) {
// //     console.error("Error in getClassByIdAction:", error);
// //     throw error;
// //   }
// // }
// // action/class.action.ts

// export const getClassByIdAction = async (
//   courseId: string,
//   token: string,
// ): Promise<any[]> => {
//   try {
//     const response = await fetch(`${BASE_URL}/cohorts/courses/${courseId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const responseData = await response.json();
//     if (!response.ok) {
//       throw {
//         status: response.status,
//         message: responseData.message || "Failed to fetch classes",
//       };
//     }

//     return responseData.data.ongoing; // Assuming `ongoing` holds the list of classes
//   } catch (error: any) {
//     console.error("Error fetching classes by course:", error);
//     throw {
//       message: error.message || "An unexpected error occurred.",
//     };
//   }
// };

// // Update class action
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
//       const errorBody = await response.json();
//       throw {
//         status: response.status,
//         message: errorBody.message || "Failed to update class",
//         details: errorBody,
//       };
//     }
//   } catch (error) {
//     console.error("Error in updateClassAction:", error);
//     throw error;
//   }
// };

// // Delete class action
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
//     console.error("Error in deleteClassAction:", error);
//     throw error;
//   }
// };

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
        message: responseData.message || "Failed to create class",
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
        message: responseData.message || "Failed to fetch classes",
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
        message: responseData.message || "Failed to fetch classes",
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
