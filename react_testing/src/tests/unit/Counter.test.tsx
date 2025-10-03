import { expect, it, describe } from "vitest";
import { Counter } from "../../components/Counter";

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Counter component", () => {
  it("render initial count", () => {
    render(<Counter />);
    expect(screen.getByText("0 clicks")).toBeInTheDocument();
  });

  it("increment count when button is clicked", () => {
    render(<Counter />);
    const button = screen.getByText("Click me");

    fireEvent.click(button);
    expect(screen.getByText("1 clicks")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("2 clicks")).toBeInTheDocument();
  });

  it("increments count with userEvent", async () => {
    render(<Counter />);
    const button = screen.getByText("Click me");

    await userEvent.click(button);
    expect(screen.getByText("1 clicks")).toBeInTheDocument();
  });
});
