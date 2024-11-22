interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

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
      throw new Error("Login failed");
    }

    const data = await response.json();
    // console.log(data);

    if (data.message == "success") {
      console.log("every where stew");
    }

    return {
      success: true,
      token: data.data.accessToken,
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
  // Clear or remove any stored token later
};
