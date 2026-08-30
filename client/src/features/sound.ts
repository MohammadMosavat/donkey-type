"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getLocalItem } from "@/utils/storage";

export interface CounterState {
  value: string 
}

const initialState: CounterState = {
  value: getLocalItem("sound") ?? "off",
};

export const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    toggleSound: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
})

export const { toggleSound } = soundSlice.actions;

export default soundSlice.reducer;
