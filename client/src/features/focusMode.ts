"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getLocalItem } from "@/utils/storage";

export interface FocusModeState {
  value: string 
}

const initialState: FocusModeState = {
  value: getLocalItem("focusMode") ?? "off",
};

export const focusModeSlice = createSlice({
  name: 'focusMode',
  initialState,
  reducers: {
    toggleFocusMode: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
})

export const { toggleFocusMode } = focusModeSlice.actions;

export default focusModeSlice.reducer;
