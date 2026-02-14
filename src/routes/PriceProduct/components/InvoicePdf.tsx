import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Box, Button } from "@mui/material";
import InvoiceDocument from "./InvoiceDocument";
import { InvoiceFormValues } from "../PriceProduct";

const InvoicePdf: React.FC<InvoiceFormValues> = ({ items }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Box sx={{ marginBottom: 2 }}>
        <PDFDownloadLink
          document={<InvoiceDocument items={items} />}
          fileName={`price.pdf`}
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
          <InvoiceDocument items={items} />
        </PDFViewer>
      </Box>
    </Box>
  );
};

export default InvoicePdf;
