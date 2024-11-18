// src/action/auth.actions.ts

interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log(data);

    return {
      success: true,
      token: data.data.accessToken, // Adjust this based on your API response
    };
  } catch (error) {
    // console.error("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const logout = () => {
  // Clear any stored token or user data here
  // This can include removing token from localStorage if used
};
