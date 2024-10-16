export * from "@testing-library/react";

export const mockResponse = (status: number, data: Record<string, unknown>) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  };
};
