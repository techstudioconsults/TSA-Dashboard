import { useCallback, useEffect, useState } from "react";

import { useCourseStore } from "~/stores/courseStore";

interface UseFetchCoursesResult {
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFetchData(token: string | undefined): UseFetchCoursesResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCourses = useCourseStore((state) => state.fetchCourses);

  const handleFetch = useCallback(async () => {
    if (!token) {
      setError("Authentication token not found. Please log in.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await fetchCourses(token);
    } catch (error) {
      setError("Failed to fetch courses. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [token, fetchCourses, setError, setLoading]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return {
    loading,
    error,
    refetch: handleFetch,
  };
}
