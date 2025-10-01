import { create } from "zustand";

interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementWithAmountAsync: (amount: number) => Promise<void>;
}

type CounterStore = CounterState & CounterActions;

export const useCounterStore = create<CounterStore>((set, get) => ({
  // Initial state
  value: 0,
  status: "idle",
  error: null,

  // Actions
  increment: () => set((state) => ({ value: state.value + 1 })),

  decrement: () => set((state) => ({ value: state.value - 1 })),

  reset: () => set({ value: 0, status: "idle", error: null }),

  incrementWithAmountAsync: async (amount: number) => {
    try {
      // Set loading state
      set({ status: "loading", error: null });

      console.log("Here", amount);

      // Simulate async operation
      await new Promise((res) => setTimeout(res, 3000));

      // Validate amount
      if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Invalid amount: must be a number");
      }

      // Set success state
      set({ value: amount, status: "idle" });
    } catch (err) {
      console.log("Error: ", (err as Error).message);
      set({
        status: "failed",
        error: (err as Error).message || "An unknown error occurred",
      });
    }
  },
}));
