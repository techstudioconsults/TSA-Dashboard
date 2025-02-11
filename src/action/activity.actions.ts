const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/activity`;
export interface Activity {
  id: string;
  activity: string;
  description: string;
  createdAt: string;
}

export const getAllActivityAction = async (
  token: string,
): Promise<Activity[]> => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.data; // ✅ Fix: correctly access the nested array
  } catch (error) {
    console.error("Error in getAllActivityAction:", error);
    throw error;
  }
};
