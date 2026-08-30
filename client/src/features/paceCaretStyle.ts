"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getLocalItem } from "@/utils/storage";

export interface CounterState {
  value: string 
}

const initialState: CounterState = {
  value: getLocalItem("paceCaretStyle") ?? "rightline",
};

export const paceCaretStyleSlice = createSlice({
  name: 'paceCaretStyle',
  initialState,
  reducers: {
    togglePaceCaretStyle: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
})

export const { togglePaceCaretStyle } = paceCaretStyleSlice.actions;

export default paceCaretStyleSlice.reducer;
