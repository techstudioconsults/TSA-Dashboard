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

// Delete Spreadsheet Action
// export const deleteSpreadsheetAction = async (
//   sheetId: string,
//   token: string,
// ): Promise<void> => {
//   try {
//     console.log(sheetId);

//     const response = await fetch(`${BASE_URL}/${sheetId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const responseData = await response.json();
//     console.log(responseData);

//     if (!response.ok) {
//       throw new Error(`Failed to delete spreadsheet: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error("Error in deleteSpreadsheetAction:", error);
//     throw error;
//   }
// };

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
    // console.log(data);

    return data.data.totalSpreadsheet;
  } catch (error) {
    console.error("Error in getTotalSheetAction:", error);
    throw error;
  }
};
