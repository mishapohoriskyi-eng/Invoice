import dayjs from "dayjs";

export interface InvoiceItem {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  sum: number;
}

export interface InvoiceFormValues {
  name: string;
  invoiceNumber: number;
  discount: number;
  throughWhom: string;
  invoiceDate?: dayjs.Dayjs | null;
  items: InvoiceItem[];
}
