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
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import InvoicePdf from "./components/InvoicePdf";
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
  price1: string;
  price2: string;
  price3: string;
}

export interface InvoiceFormValues {
  items: InvoiceItem[];
}

const initialValues: InvoiceFormValues = {
  items: [
    {
      id: 1,
      name: "Сітка овочева- 2кг (22*33см)\n1 упаковка-1000 шт\nЗелена, червона, фіолетова\n",
      price1: "0.059",
      price2: "0.056",
      price3: "0.055",
    },
    {
      id: 2,
      name: "Сітка овочева- 5кг (28*40см)\n1 упаковка-500 шт\nЗелена, червона, фіолетова\n",
      price1: "0.07",
      price2: "0.068",
      price3: "0.067",
    },
    {
      id: 3,
      name: "Сітка овочева- 10кг (30*55см)\n1 упаковка-500 шт\nЗелена, червона, фіолетова\n",
      price1: "0.08",
      price2: "0.077",
      price3: "0.075",
    },
    {
      id: 4,
      name: "Сітка овочева -20кг (40*70см)\n1 упаковка-500 шт\nЗелена, червона, фіолетова\n",
      price1: "0.09",
      price2: "0.088",
      price3: "0.085",
    },
    {
      id: 5,
      name: "Сітка овочева- 40кг (50*80см)\n1 упаковка-500 шт\nЗелена, червона, фіолетова\n",
      price1: "0.127",
      price2: "0.123",
      price3: "0.121",
    },
  ],
};

const PriceProduct = () => {
  const [submittedData, setSubmittedData] = useState<InvoiceFormValues | null>(
    null,
  );

  const { handleSubmit, values, setFieldValue } = useFormik<InvoiceFormValues>({
    initialValues,
    onSubmit: async (values) => {
      setSubmittedData(values);
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <Box>
      <Title>Ціни</Title>
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography variant="h6" gutterBottom>
            *ЦІНИ В ДОЛАРАХ
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
                    Найменування розміру сітки
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                    Ціна 3000-10000 ШТ
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                    Ціна 10000-50000 ШТ
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                    Ціна 50000-100000 ШТ
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
                          setFieldValue(`items[${index}].name`, e.target.value)
                        }
                        placeholder="Назва товару"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="text"
                        value={item.price1}
                        onChange={(e) =>
                          setFieldValue(
                            `items[${index}].price1`,
                            e.target.value.replace(",", "."),
                          )
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="text"
                        value={item.price2}
                        onChange={(e) =>
                          setFieldValue(
                            `items[${index}].price2`,
                            e.target.value.replace(",", "."),
                          )
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="text"
                        value={item.price3}
                        onChange={(e) =>
                          setFieldValue(
                            `items[${index}].price3`,
                            e.target.value.replace(",", "."),
                          )
                        }
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                ))}
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
            Створити ціни
          </Button>
        </Box>
      </form>

      {submittedData && <InvoicePdf {...submittedData} />}
    </Box>
  );
};

const Title = styled(Box)(() => ({
  fontSize: "22px",
  lineHeight: "24px",
  padding: "0 0 30px 0",
}));

export default PriceProduct;
