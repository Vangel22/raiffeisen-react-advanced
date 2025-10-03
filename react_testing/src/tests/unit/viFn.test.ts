import { describe, expect, it, vi } from "vitest";

describe("vi.fn example", () => {
  it("tracks calls and arguments", () => {
    const mockFn = vi.fn((x: number) => x * 2);

    const result = mockFn(2);

    expect(result).toBe(4);
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalled(2); // check args
  });
});
