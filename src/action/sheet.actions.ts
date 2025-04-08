import { SheetFormData } from "~/schemas";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/spreadsheets`;

// Create Spreadsheet Action
export const createSpreadsheetAction = async (
  data: SheetFormData,
  token: string,
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    // console.log(response);
    if (!response.ok) {
      const errorBody = await response.json();
      console.log(errorBody);
      throw {
        status: response.status,
        message: errorBody.message || "Failed to create course",
        details: errorBody,
      };
    }
  } catch (error) {
    console.error("Error in createSpreadsheetAction:", error);
    throw error;
  }
};

// Get All Spreadsheets Action
export const getSpreadsheetsAction = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch spreadsheets: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    return data.data?.items || []; // Ensure we extract the correct array
  } catch (error) {
    console.error("Error in getSpreadsheetsAction:", error);
    throw error;
  }
};

export const getTotalSheetAction = async (token: string): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch total Sheets: ${response.statusText}`);
    }

    const data = await response.json();

    // Add validation for response structure
    if (typeof data.data?.totalSpreadsheet !== "number") {
      throw new TypeError("Invalid total spreadsheet count format");
    }

    return data.data.totalSpreadsheet;
  } catch (error) {
    console.error("Error in getTotalSheetAction:", error);
    throw error;
  }
};
