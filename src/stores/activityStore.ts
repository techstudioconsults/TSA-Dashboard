import { create } from "zustand";

import { getAllActivityAction } from "~/action/activity.actions";

interface Activity {
  id: string;
  activity: string;
  description: string;
  createdAt: string;
}

interface ActivityState {
  activities: {
    data: Activity[];
  };
  isLoading: boolean;
  error: string | null;
  fetchActivities: (token: string) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: { data: [] }, // Ensure `data` is always an array
  isLoading: false,
  error: null,

  fetchActivities: async (token: string) => {
    try {
      set({ isLoading: true, error: null });
      const activities = await getAllActivityAction(token);
      set({ activities: { data: activities }, isLoading: false }); // Ensure `data` is set correctly
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch activities",
        isLoading: false,
      });
    }
  },
}));
