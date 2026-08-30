"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getLocalItem } from "@/utils/storage";

export interface CounterState {
  value: string 
}

const initialState: CounterState = {
  value: getLocalItem("hideCapsLock") ?? "off",
};

export const hideCapsLockSlice = createSlice({
  name: 'hideCapsLock',
  initialState,
  reducers: {
    toggleHideCapsLock: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
})

export const { toggleHideCapsLock } = hideCapsLockSlice.actions;

export default hideCapsLockSlice.reducer;
