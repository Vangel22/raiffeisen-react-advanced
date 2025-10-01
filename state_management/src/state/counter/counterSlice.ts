import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
  error: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementWithAmountAsync.pending, (state) => {
        console.log("Printing while pending", state);
        state.status = "loading";
        state.error = null;
      })
      .addCase(incrementWithAmountAsync.fulfilled, (state, action) => {
        console.log(state, action.payload);
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(incrementWithAmountAsync.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

// TODO: Decrement by amount

export const incrementWithAmountAsync = createAsyncThunk<
  number, // Return type
  number, // Argument type
  { rejectValue: string } // Reject value type
>("counter/incrementAsync", async (amount: number, { rejectWithValue }) => {
  try {
    console.log("Here", amount);
    await new Promise((res) => setTimeout(res, 3000));
    // we are simulating that we are awaiting data from some source for 3 seconds
    if (typeof amount !== "number" || isNaN(amount)) {
      throw new Error("Invalid amount: must be a number");
    }
    return amount;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
