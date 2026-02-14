import { create } from "zustand";
import { InvoiceItem } from "../types/invoceType";

interface InvoiceStore {
  name: string;
  invoiceNumber: number;
  discount: number;
  throughWhom: string;
  items: InvoiceItem[];
  setInvoiceData: (data: Partial<InvoiceStore>) => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  name: "",
  invoiceNumber: 0,
  discount: 0,
  throughWhom: "",
  items: [],

  setInvoiceData: (data) => set(data),
}));
