import { create } from "zustand";

interface FormatDateType {
  formattedDate: string;
  setFormattedDate: (date: string) => void;
}

export const useFormattedDate = create<FormatDateType>((set) => ({
  formattedDate: "",
  setFormattedDate: (date) => set({ formattedDate: date }),
}));
