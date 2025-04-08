import Cookies from "js-cookie";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { login, logout } from "~/action/auth.actions";

const mockResponse = {
  data: {
    tokens: {
      access: "dummy-access-token",
      refresh: "dummy-refresh-token",
    },
  },
  message: "success",
};

beforeEach(() => {
  vi.clearAllMocks();
  Cookies.remove("authToken");
  Cookies.remove("refreshToken");
});

describe("Auth Actions", () => {
  it("logs in successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      }),
    );

    const result = await login("test@example.com", "password123");

    expect(result.success).toBe(true);
    expect(result.token).toBe("dummy-access-token");
    expect(result.refreshToken).toBe("dummy-refresh-token");
  });

  it("handles login failure when response is not successful", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    const result = await login("test@example.com", "wrongpassword");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Login failed");
  });

  it("handles unexpected server response", async () => {
    const mockInvalidResponse = {
      message: "error",
      data: { tokens: {} },
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockInvalidResponse,
      }),
    );

    const result = await login("test@example.com", "password123");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Unexpected response from the server");
  });

  it("handles errors thrown during login", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network Error")),
    );

    const result = await login("test@example.com", "password123");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Network Error");
  });

  it("logs out successfully", async () => {
    Cookies.set("authToken", "dummy-access-token");
    Cookies.set("refreshToken", "dummy-refresh-token");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
      }),
    );

    const result = await logout();

    expect(result.success).toBe(true);
    expect(result.message).toBe("Logout successful");
    expect(Cookies.get("authToken")).toBeUndefined();
    expect(Cookies.get("refreshToken")).toBeUndefined();
  });

  it("handles logout failure when no refresh token is found", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
      }),
    );

    const result = await logout();

    expect(result.success).toBe(false);
    expect(result.error).toBe("No refresh token found");
  });

  it("handles logout failure when fetch fails", async () => {
    Cookies.set("authToken", "dummy-access-token");
    Cookies.set("refreshToken", "dummy-refresh-token");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    const result = await logout();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Logout failed");
  });

  it("handles errors thrown during logout", async () => {
    Cookies.set("authToken", "dummy-access-token");
    Cookies.set("refreshToken", "dummy-refresh-token");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network Error")),
    );

    const result = await logout();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Network Error");
  });
});
