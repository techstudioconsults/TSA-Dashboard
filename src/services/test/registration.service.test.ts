import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { RegisterFormData } from "~/schemas";
import { mockResponse, renderHook } from "~/test/utils";
import { useRegisterStore, useSubmitRegisterForm } from "../register.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

globalThis.fetch = vi.fn();

describe("registration test", () => {
  beforeEach(() => {
    // Reset store state before each test
    useRegisterStore.setState({
      isSubmitting: false,
      responseMessage: null,
    });
    vi.resetAllMocks();
  });

  it("should submit register form successfully", async () => {
    const mockResponseData = { message: "Registration successful!" };

    (fetch as any).mockResolvedValueOnce(mockResponse(200, mockResponseData));

    const courseID = "testCourseId";
    const formData: RegisterFormData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      course: "",
      schedule: "",
    };

    const { result } = renderHook(() => useSubmitRegisterForm(courseID));

    await act(async () => {
      const response = await result.current(formData);
      expect(response).toEqual(mockResponseData);
    });

    const store = useRegisterStore.getState();

    expect(store.isSubmitting).toBe(false);
    expect(store.responseMessage).toBe("Registration successful!");
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/auth/register?curseId=${courseID}`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }),
    );
  });

  it("should handle registration error correctly", async () => {
    (fetch as any).mockResolvedValueOnce(
      mockResponse(500, { message: "Error" }),
    );

    const courseID = "testCourseId";
    const formData: RegisterFormData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      phoneNumber: "0987654321",
      course: "",
      schedule: "",
    };

    const { result } = renderHook(() => useSubmitRegisterForm(courseID));

    await act(async () => {
      const error = await result.current(formData);
      expect(error).toBeInstanceOf(Error);
    });

    const store = useRegisterStore.getState();

    expect(store.isSubmitting).toBe(false);
    expect(store.responseMessage).toBe(
      "Failed to register course. Please try again later.",
    );
  });
});
