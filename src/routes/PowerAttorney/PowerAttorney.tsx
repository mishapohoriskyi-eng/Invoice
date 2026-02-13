import { Box, styled, TextField, Button } from "@mui/material";
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

export interface InvoiceFormValues {
  name: string;
  invoiceNumber: number;
  supplierInvoiceNumber: number;
  invoiceDate?: dayjs.Dayjs | null;
}

const initialValues: InvoiceFormValues = {
  name: "",
  invoiceNumber: 0,
  supplierInvoiceNumber: 0,
  invoiceDate: dayjs(),
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

  return (
    <Box>
      <Title>Довіренність</Title>
      <form onSubmit={handleSubmit}>
        <InvoiceBlock>
          <InvoiceItems>
            <InvoiceItemBLock>
              <InvoiceItemTitle>Номер довіреності</InvoiceItemTitle>
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
              <InvoiceItemTitle>Від кого</InvoiceItemTitle>
              <TextField
                name="name"
                value={values.name}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </InvoiceItemBLock>

            <InvoiceItemBLock>
              <InvoiceItemTitle>Номер рахунку постачальника</InvoiceItemTitle>
              <TextField
                name="supplierInvoiceNumber"
                value={values.supplierInvoiceNumber}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </InvoiceItemBLock>
          </InvoiceItems>
          <InvoiceCalendar>
            <Box sx={{ marginBottom: 2 }}>
              <label>
                Дата створення довіреності
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

        <Box sx={{ marginBottom: 2, marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px" }}
          >
            Створити довіреність
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
