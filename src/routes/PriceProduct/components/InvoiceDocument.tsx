import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import PdfInterRegular from "../assets/fonts/Inter-Regular.otf";
import { InvoiceFormValues, InvoiceItem } from "../PriceProduct";

Font.register({
  family: "InterRegular",
  src: PdfInterRegular,
});

const InvoiceDocument: React.FC<InvoiceFormValues> = ({ items }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderNumber]}>
                <Text>N</Text>
              </View>
              <View
                style={[styles.tableHeaderBLock, styles.tableHeaderNameProduct]}
              >
                <Text>Найменування розміру сітки</Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderUnit]}>
                <Text>Ціна 3000-10000 ШТ</Text>
              </View>
              <View
                style={[styles.tableHeaderBLock, styles.tableHeaderQuantity]}
              >
                <Text>Ціна 10000-50000 ШТ</Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderPrice]}>
                <Text>Ціна 50000-100000 ШТ</Text>
              </View>
            </View>

            {items &&
              items.map((item: InvoiceItem, index: number) => (
                <View style={styles.tableBody} wrap={false} key={item.id}>
                  <View
                    style={[styles.tableBodyBLock, styles.tableHeaderNumber]}
                  >
                    <Text>{index + 1}</Text>
                  </View>
                  <View
                    style={[
                      styles.tableBodyBLock,
                      styles.tableHeaderNameProduct,
                    ]}
                  >
                    <Text>{item.name || "—"}</Text>
                  </View>
                  <View style={[styles.tableBodyBLock, styles.tableHeaderUnit]}>
                    <Text>{item.price1}</Text>
                  </View>
                  <View
                    style={[styles.tableBodyBLock, styles.tableHeaderQuantity]}
                  >
                    <Text>{item.price2}</Text>
                  </View>
                  <View
                    style={[styles.tableBodyBLock, styles.tableHeaderPrice]}
                  >
                    <Text>{item.price3}</Text>
                  </View>
                </View>
              ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: "10px 0 0 0",
    fontFamily: "InterRegular",
    color: "#000000",
    fontSize: "14px",
    lineHeight: "18px",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  table: {
    padding: "26px 0 0 0",
    textAlign: "center",
  },
  tableHeader: {
    width: "100%",
    padding: "0 0 0 0",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderTop: "1px solid #000000",
    borderBottom: "1px solid #000000",
    borderLeft: "1px solid #000000",
  },
  tableHeaderBLock: {
    fontSize: "10px",
    padding: "5px 0 0 0",
    borderRight: "1px solid #000000",
    height: "100%",
  },
  tableHeaderNumber: {
    width: "5%",
  },
  tableHeaderNameProduct: {
    width: "50%",
    textAlign: "left",
    padding: "5px 0 0 2px",
  },
  tableHeaderUnit: {
    width: "15%",
  },
  tableHeaderQuantity: {
    width: "15%",
  },
  tableHeaderPrice: {
    width: "15%",
  },
  tableBody: {
    width: "100%",
    padding: "0 0 0 0",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #000000",
    borderLeft: "1px solid #000000",
  },
  tableBodyBLock: {
    fontSize: "10px",
    padding: "5px 0 0 0",
    borderRight: "1px solid #000000",
    height: "100%",
  },
});

export default InvoiceDocument;
