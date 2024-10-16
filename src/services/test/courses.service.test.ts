import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockResponse, renderHook } from "~/test/utils";
import useCoursesStore from "../courses.service";
import { Course } from "../services.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

globalThis.fetch = vi.fn();

describe("course test", () => {
  beforeEach(() => {
    useCoursesStore.setState({
      allCourses: [],
      loading: true,
      error: "",
      activeCourse: null,
    });
    vi.resetAllMocks();
  });

  it("should fetch all courses successfully", async () => {
    const mockCourses: Course[] = [
      {
        id: `1`,
        title: "Course 1",
        description: "Description 1",
        imageUrl: "",
        duration: 0,
        startDate: "",
        fee: 0,
        classes: {
          online: [],
          weekend: [],
          weekday: [],
        },
      },
      {
        id: `2`,
        title: "Course 2",
        description: "Description 2",
        imageUrl: "",
        duration: 0,
        startDate: "",
        fee: 0,
        classes: {
          online: [],
          weekend: [],
          weekday: [],
        },
      },
    ];

    (fetch as any).mockResolvedValueOnce(
      mockResponse(200, { data: mockCourses }),
    );

    const { result } = renderHook(() => useCoursesStore());

    await act(async () => {
      await result.current.getAllCourses();
    });

    const store = result.current;
    expect(store.loading).toBe(false);
    expect(store.allCourses).toEqual(mockCourses);
    expect(store.error).toBe(null);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/external/courses`,
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }),
    );
  });

  it("should handle fetch error correctly", async () => {
    const errorMessage = "Not Found";

    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: errorMessage,
      json: async () => ({ message: errorMessage }),
    });

    const { result } = renderHook(() => useCoursesStore());

    await act(async () => {
      await result.current.getAllCourses();
    });

    const store = result.current;
    expect(store.loading).toBe(false);
    expect(store.error).toContain("Error"); // Check if the error contains 'Error'
    expect(store.allCourses).toEqual([]);
  });

  it("should set the active course correctly", async () => {
    const mockCourse: Course = {
      id: `1`,
      title: "Active Course",
      description: "Active course description",
      imageUrl: "",
      duration: 0,
      startDate: "",
      fee: 0,
      classes: {
        online: [],
        weekend: [],
        weekday: [],
      },
    };

    const { result } = renderHook(() => useCoursesStore());

    act(() => {
      result.current.setActiveCourse(mockCourse);
    });

    const store = result.current;
    expect(store.activeCourse).toEqual(mockCourse);
  });
});
