// import { useEffect, useState } from "react";

// export const useFetchData = <T>(
//   fetchFunction: (token: string) => Promise<T>,
//   token: string | null,
// ) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         if (token) {
//           const result = await fetchFunction(token);
//           setData(result);
//         } else {
//           setError("Authentication token not found. Please log in.");
//         }
//       } catch (error) {
//         setError("Failed to fetch data. Please try again.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [fetchFunction, token]);

//   return { data, loading, error };
// };

import { useEffect, useState } from "react";

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

  const handleFetch = async () => {
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
  };

  useEffect(() => {
    handleFetch();
  }, [token]);

  return {
    loading,
    error,
    refetch: handleFetch,
  };
}
