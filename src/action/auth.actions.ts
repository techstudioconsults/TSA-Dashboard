import Cookies from "js-cookie";

interface LoginResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  error?: string;
}

// interface APIError {
//   status?: number;
//   message: string;
//   details?: Record<string, unknown>;
// }

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const resultData = await response.json();

    // console.log(resultData);

    if (resultData.message === "success") {
      return {
        success: true,
        token: resultData.data.tokens.access,
        refreshToken: resultData.data.tokens.refresh,
      };
    }

    return {
      success: false,
      error: "Unexpected response from the server",
    };
  } catch (error) {
    console.error("Error in login action:", error);
    throw error;
  }
};

// export const logout = () => {
//   Cookies.remove("authToken");
// };

export const logout = async () => {
  try {
    // Retrieve the refreshToken from cookies
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    // console.log(response);

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    // Remove tokens from cookies
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");

    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
