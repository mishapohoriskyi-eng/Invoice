import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Box, Button } from "@mui/material";
import InvoiceDocument from "./InvoiceDocument";
import { InvoiceFormValues } from "../PriceProduct";

interface InvoicePdfProps extends InvoiceFormValues {
  formattedDate: string;
}

const InvoicePdf: React.FC<InvoicePdfProps> = ({
  name,
  invoiceNumber,
  discount,
  throughWhom,
  items,
  formattedDate,
}) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Box sx={{ marginBottom: 2 }}>
        <PDFDownloadLink
          document={
            <InvoiceDocument
              name={name}
              invoiceNumber={invoiceNumber}
              discount={discount}
              throughWhom={throughWhom}
              items={items}
              formattedDate={formattedDate}
            />
          }
          fileName={`${name || "nakladna"}-${invoiceNumber || "0"}.pdf`}
        >
          {({ loading }) => (
            <Button variant="contained" color="primary">
              {loading ? "Завантаження PDF..." : "Завантажити PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </Box>

      <Box sx={{ height: "800px", border: "1px solid #ccc" }}>
        <PDFViewer width="100%" height="100%">
          <InvoiceDocument
            name={name}
            invoiceNumber={invoiceNumber}
            discount={discount}
            throughWhom={throughWhom}
            items={items}
            formattedDate={formattedDate}
          />
        </PDFViewer>
      </Box>
    </Box>
  );
};

export default InvoicePdf;
