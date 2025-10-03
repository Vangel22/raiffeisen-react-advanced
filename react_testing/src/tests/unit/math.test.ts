import { describe, expect, it } from "vitest";
import { add, multiply, divide } from "./math";

describe("Math functions", () => {
  it("Adds two numbers", () => {
    expect(add(2, 2)).toBe(4);
    expect(add(-1, 1)).toBe(0);
  });

  it("Multiply two numbers", () => {
    expect(multiply(2, 2)).toBe(4);
    expect(multiply(0, 10)).toBe(0);
  });

  it("throws an error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide with zero!");
  });

  it("Divides numbers correctly", () => {
    expect(divide(6, 2)).toBe(3);
  });
});
