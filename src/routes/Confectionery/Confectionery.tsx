import {
  Box,
  styled,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import InvoicePdf from "./components/InvoicePdf";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/uk";
import dayjs from "dayjs";

dayjs.extend(updateLocale);
dayjs.updateLocale("uk", {
  months: [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ],
});
dayjs.locale("uk");

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

const initialValues: InvoiceFormValues = {
  name: "",
  invoiceNumber: 0,
  discount: 0,
  throughWhom: "",
  invoiceDate: dayjs(),
  items: [
    {
      id: 1,
      name: "Сітка для упакування овочів 2 кг червона",
      unit: "шт.",
      quantity: 1000,
      price: 2.47,
      sum: 2470.0,
    },
    {
      id: 2,
      name: "Сітка для упакування овочів 20 кг фіолетова",
      unit: "шт.",
      quantity: 1000,
      price: 2.47,
      sum: 2470.0,
    },
  ],
};

const Confectionery = () => {
  const [submittedData, setSubmittedData] = useState<InvoiceFormValues | null>(
    null,
  );

  const { handleSubmit, values, handleChange, setFieldValue } =
    useFormik<InvoiceFormValues>({
      initialValues,
      onSubmit: async (values) => {
        setSubmittedData(values);
      },
      validateOnChange: false,
      validateOnBlur: true,
    });

  const formatDateForDisplay = (
    date: dayjs.Dayjs | null | undefined,
  ): string => {
    if (!date) return "";
    const day = date.date();
    const month = date.format("MMMM");
    const year = date.year();
    return `"${day}" ${month} ${year}р.`;
  };

  const handleAddRow = () => {
    const newItem: InvoiceItem = {
      id:
        values.items.length > 0
          ? Math.max(...values.items.map((i) => i.id)) + 1
          : 1,
      name: "",
      unit: "шт.",
      quantity: 0,
      price: 0,
      sum: 0,
    };
    setFieldValue("items", [...values.items, newItem]);
  };

  const handleDeleteRow = (id: number) => {
    setFieldValue(
      "items",
      values.items.filter((item) => item.id !== id),
    );
  };

  const handleItemChange = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    const updatedItems = values.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        if (field === "quantity" || field === "price") {
          updatedItem.sum = Number(
            (Number(updatedItem.quantity) * Number(updatedItem.price)).toFixed(
              2,
            ),
          );
        }

        return updatedItem;
      }
      return item;
    });
    setFieldValue("items", updatedItems);
  };

  const totalSum = values.items.reduce((acc, item) => acc + item.sum, 0);

  return (
    <Box>
      <Title>Накладна</Title>
      <form onSubmit={handleSubmit}>
        <InvoiceBlock>
          <InvoiceItems>
            <InvoiceItemBLock>
              <InvoiceItemTitle>Номер накладної</InvoiceItemTitle>
              <TextField
                name="invoiceNumber"
                type="number"
                value={values.invoiceNumber || ""}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </InvoiceItemBLock>

            <InvoiceItemBLock>
              <InvoiceItemTitle>Прізвище та Ім'я</InvoiceItemTitle>
              <TextField
                name="name"
                value={values.name}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </InvoiceItemBLock>

            <InvoiceItemBLock>
              <InvoiceItemTitle>Через кого</InvoiceItemTitle>
              <TextField
                name="throughWhom"
                value={values.throughWhom}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </InvoiceItemBLock>

            <InvoiceItemBLock>
              <InvoiceItemTitle>Знижка</InvoiceItemTitle>
              <TextField
                name="discount"
                value={values.discount}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </InvoiceItemBLock>
          </InvoiceItems>
          <InvoiceCalendar>
            <Box sx={{ marginBottom: 2 }}>
              <label>
                Дата створення накладної
                <br />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="uk"
                >
                  <DateCalendar
                    value={values.invoiceDate}
                    onChange={(newValue) =>
                      setFieldValue("invoiceDate", newValue)
                    }
                    dayOfWeekFormatter={(day) => day.format("dd")}
                    slotProps={{
                      calendarHeader: {
                        format: "MMMM YYYY",
                      },
                    }}
                  />
                </LocalizationProvider>
              </label>
            </Box>
          </InvoiceCalendar>
        </InvoiceBlock>

        <Box>
          <Typography variant="h6" gutterBottom>
            Товари
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: "100%", overflow: "auto" }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold", width: "5%" }}>
                    N
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "35%" }}>
                    Найменування товару
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                    Од. виміру
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                    Кількість
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                    Ціна
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                    Сума
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "5%" }}>
                    Дії
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(item.id, "name", e.target.value)
                        }
                        placeholder="Назва товару"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(item.id, "unit", e.target.value)
                        }
                        placeholder="шт."
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "quantity",
                            Number(e.target.value),
                          )
                        }
                        inputProps={{ min: 0, step: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.price || ""}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "price",
                            Number(e.target.value),
                          )
                        }
                        inputProps={{ min: 0, step: 0.01 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.sum.toFixed(2)}
                        InputProps={{ readOnly: true }}
                        sx={{ backgroundColor: "#f9f9f9" }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteRow(item.id)}
                        disabled={values.items.length === 1}
                      >
                        <Box>Видалити</Box>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="right"
                    sx={{ fontWeight: "bold" }}
                  >
                    Разом:
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {totalSum.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleAddRow}
                    >
                      <Box>Додати</Box>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ marginBottom: 2, marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px" }}
          >
            Створити накладну
          </Button>
        </Box>
      </form>

      {submittedData && (
        <InvoicePdf
          {...submittedData}
          formattedDate={formatDateForDisplay(submittedData.invoiceDate)}
        />
      )}
    </Box>
  );
};

const Title = styled(Box)(() => ({
  fontSize: "22px",
  lineHeight: "24px",
  padding: "0 0 30px 0",
}));

const InvoiceBlock = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
}));

const InvoiceCalendar = styled(Box)(() => ({
  width: "320px",
  flex: "0 0 320px",
}));

const InvoiceItems = styled(Box)(({ theme }) => ({
  padding: "45px 25px 45px 25px",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  background: "#fff",
  "& .MuiTextField-root": {
    borderRadius: "4px",
    padding: 0,
    width: "100%",
  },
  "& input": {
    width: "100%",
    maxWidth: "100%",
    padding: "0 10px !important",
    border: `1px solid #c4c4c4 !important`,
    fontSize: "14px",
    lineHeight: "18px",
    color: "#000",
    minHeight: "40px",
    margin: 0,
    boxSizing: "border-box",
    borderRadius: "6px",
  },
  "& textarea::placeholder": {
    color: "#000",
  },
  "& fieldset": {
    border: "none",
    outline: "none !important",
  },
  "& input::placeholder": {
    color: "#000",
    opacity: "1",
  },
  "& input:focus": {
    outline: "none",
  },
}));

const InvoiceItemTitle = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "20px",
  padding: "0 0 5px 0",
}));

const InvoiceItemBLock = styled(Box)(({ theme }) => ({
  width: "48%",
  margin: "0 0 0 0",
}));

export default Confectionery;
