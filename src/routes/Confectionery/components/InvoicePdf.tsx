import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Box, Button } from "@mui/material";
import InvoiceDocument from "./InvoiceDocument";
import { useInvoiceStore } from "../../../store/invoiceStore";

const InvoicePdf = () => {
  const { name, invoiceNumber } = useInvoiceStore();

  return (
    <Box sx={{ marginTop: 4 }}>
      <Box sx={{ marginBottom: 2 }}>
        <PDFDownloadLink
          document={<InvoiceDocument />}
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
          <InvoiceDocument />
        </PDFViewer>
      </Box>
    </Box>
  );
};

export default InvoicePdf;
