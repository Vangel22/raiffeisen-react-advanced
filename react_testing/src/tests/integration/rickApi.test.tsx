import { LocationList } from "../../components/LocationList";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as api from "./rickApi";

describe("LocationList Integration Test", () => {
  it("renders loading state first", () => {
    render(<LocationList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders locations after successful fetch", async () => {
    const mockLocations = [
      { id: 1, name: "Earth (C-137)", type: "Planet", dimension: "C-137" },
      { id: 2, name: "Abadango", type: "Cluster", dimension: "unknown" },
    ];

    vi.spyOn(api, "fetchLocations").mockResolvedValue(mockLocations);

    render(<LocationList />);

    await waitFor(() => {
      expect(screen.getByText(/Earth \(C-137\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Abadango/i)).toBeInTheDocument();
    });
  });

  it("renders error message if fetch fails", async () => {
    vi.spyOn(api, "fetchLocations").mockRejectedValue(new Error("API down"));

    render(<LocationList />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load locations/i)).toBeInTheDocument();
    });
  });
});
