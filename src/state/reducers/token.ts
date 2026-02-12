"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  value: string | null;
}

export const TOKEN_LOCAL_STORAGE_KEY = "TOKEN";

// Безпечна перевірка localStorage для SSR
const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  }
  return null;
};

const initialState: TokenState = {
  value: null, // Завжди починаємо з null для уникнення гідратації
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, action.payload);
      }
    },
    clearToken: (state) => {
      state.value = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      }
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

// Селектор буде експортований з store.ts
export default tokenSlice.reducer;