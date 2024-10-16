import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockResponse, renderHook } from "~/test/utils";
import {
  useNewsletterFormStore,
  useSubmitNewsletterForm,
} from "../email.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

globalThis.fetch = vi.fn();

describe("email test", () => {
  beforeEach(() => {
    useNewsletterFormStore.getState().reset();
    vi.resetAllMocks();
  });

  it("should handle successful form submission", async () => {
    // Mock a successful API response
    const successMessage = "Successfully subscribed!";
    (fetch as any).mockResolvedValueOnce(
      mockResponse(200, { message: successMessage }),
    );

    const { result } = renderHook(() => useSubmitNewsletterForm());

    await act(async () => {
      const response = await result.current({ email: "test@example.com" });
      expect(response.message).toBe(successMessage);
    });

    const store = useNewsletterFormStore.getState();
    expect(store.isSubmitting).toBe(false);
    expect(store.responseMessage).toBe(successMessage);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/external/newsletter`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      }),
    );
  });

  it("should handle failed form submission", async () => {
    // Mock a failed API response
    const errorMessage = "Failed to subscribe!";
    (fetch as any).mockResolvedValueOnce(
      mockResponse(400, { message: errorMessage }),
    );

    const { result } = renderHook(() => useSubmitNewsletterForm());

    await act(async () => {
      const error = await result.current({ email: "invalid-email" });
      expect(error.message).toBe(errorMessage);
    });

    // Assert Zustand store values
    const store = useNewsletterFormStore.getState();
    expect(store.isSubmitting).toBe(false);
    expect(store.responseMessage).toBe(errorMessage);

    // Ensure fetch was called
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/external/newsletter`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "invalid-email" }),
      }),
    );
  });

  it("should handle unexpected errors during submission", async () => {
    // Mock an unexpected error
    const unexpectedError = new Error("Network Error");
    (fetch as any).mockRejectedValueOnce(unexpectedError);

    const { result } = renderHook(() => useSubmitNewsletterForm());

    // Act: Submit the form
    await act(async () => {
      const error = await result.current({ email: "test@example.com" });
      expect(error).toBe(unexpectedError); // Ensure unexpected error is caught
    });

    // Assert Zustand store values
    const store = useNewsletterFormStore.getState();
    expect(store.isSubmitting).toBe(false);
    expect(store.responseMessage).toBe(unexpectedError.message);

    // Ensure fetch was called
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/external/newsletter`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      }),
    );
  });
});
