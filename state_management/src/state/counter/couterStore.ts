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
  incrementWithAmountAsync: (amount: number) => void;
}

type CounterStore = CounterState & CounterActions;

export const useCounterStore = create<CounterStore>((set, get) => {
  return {
    value: 0,
    status: "idle",
    error: null,
    increment: () => {
      set((state) => ({ value: state.value + 1 }));
    },
    decrement: () => {
      set((state) => ({ value: state.value - 1 }));
    },
    reset: () => {
      set({ value: 0 });
    },
    incrementWithAmountAsync: (amount: number) => {
      setTimeout(() => {
        set((state) => ({ value: state.value + amount }));
      }, 2000);
    },
  };
});
