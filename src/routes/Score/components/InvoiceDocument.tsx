import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import PdfInterRegular from "../assets/fonts/Inter-Regular.otf";
import { InvoiceFormValues, InvoiceItem } from "../Score";
import { numberToUkrainianWords } from "../../../utils/numberToWords";

Font.register({
  family: "InterRegular",
  src: PdfInterRegular,
});

interface InvoiceDocumentProps extends InvoiceFormValues {
  formattedDate: string;
}

const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({
  name,
  invoiceNumber,
  items,
  formattedDate,
  edrpou,
}) => {
  const totalSum = items?.reduce((acc, item) => acc + item.sum, 0) || 0;
  const vat = (totalSum * 20) / 120;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.scoreTop}>
            <Text>
              Рахунок на оплату №{invoiceNumber} від {formattedDate}
            </Text>
          </View>

          <View style={styles.itemInformationAll}>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>Постачальник:</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>
                    Товариство з обмеженою відповідальністю "Проспера-Юг"{"\n"}
                    Р/р UA383220010000026002700000422, Банк АТ «Універсал Банк»,
                    МФО 322001,{"\n"}
                    Україна, 57154, Миколаївська область, Миколаївський район,
                    {"\n"}
                    с. Крива Балка, вул. Нова, 48,{"\n"}
                    тел.: 0675141144{"\n"}
                    37969609, ІПН 379696014231, № свід. 200101355,{"\n"}
                    філія{"\n"}
                    Платник внесків на загальній системі оподаткування
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>Покупець:</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>ФОП {name || "Відсутні дані ПІБ"}</Text>
                  <Text>ЄДРПОУ: {edrpou}</Text>
                </View>
              </View>
            </View>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>Договір:</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>Основний договір</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderNumber]}>
                <Text>N</Text>
              </View>
              <View
                style={[styles.tableHeaderBLock, styles.tableHeaderNameProduct]}
              >
                <Text>Товари (послуги)</Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderUnit]}>
                <Text>Кількість</Text>
              </View>
              <View
                style={[styles.tableHeaderBLock, styles.tableHeaderQuantity]}
              >
                <Text>Од.</Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderPrice]}>
                <Text>Ціна з ПДВ</Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderSum]}>
                <Text>Сума</Text>
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
                    <Text>{item.unit || "шт."}</Text>
                  </View>
                  <View
                    style={[styles.tableBodyBLock, styles.tableHeaderQuantity]}
                  >
                    <Text>{item.quantity}</Text>
                  </View>
                  <View
                    style={[styles.tableBodyBLock, styles.tableHeaderPrice]}
                  >
                    <Text>{item.price.toFixed(2)}</Text>
                  </View>
                  <View style={[styles.tableBodyBLock, styles.tableHeaderSum]}>
                    <Text>{item.sum.toFixed(2)}</Text>
                  </View>
                </View>
              ))}
          </View>
          <View style={styles.scoreResult}>
            <Text>Всього: {totalSum.toFixed(2)}</Text>
            <Text>У тому числі ПДВ: {vat.toFixed(2)}</Text>
          </View>
          <View style={styles.scoreBottomInformation}>
            <Text>
              Всього найменування {items.length}, на суму {totalSum} грн.
            </Text>
            <Text>{numberToUkrainianWords(totalSum)}.</Text>
            <Text>У т.ч. ПДВ: {numberToUkrainianWords(vat)}.</Text>
          </View>
          <View style={styles.bottomInformation}>
            <View style={styles.bottomInformationCustomBlock}>
              <View style={styles.bottomInformationCustomBlockName}>
                <Text>Виписав(а)</Text>
              </View>
              <View style={styles.bottomInformationScoreBlockSignature}>
                <View style={styles.bottomInformationCustomBlockSignature}>
                  <Text>&nbsp;</Text>
                </View>
                <Text>Ященко М.П.</Text>
              </View>
            </View>
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
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginBottom: 15,
  },
  divider: {
    borderBottom: "1px solid #000",
    marginVertical: 10,
  },
  itemInformationAll: {
    padding: "0 0 0 0",
  },
  itemInformation: {
    display: "flex",
    flexDirection: "row",
    fontSize: "11px",
    lineHeight: "17px",
    padding: "15px 0 0 0",
  },
  itemInformationTitle: {
    flex: "0 0 200px",
  },
  itemInformationBlock: {
    width: "100%",
  },
  itemInformationBlockInformation: {
    padding: "0",
  },
  itemInformationText: {
    fontSize: "10px",
    lineHeight: "12px",
    textAlign: "center",
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
    width: "42%",
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
    width: "8%",
  },
  tableHeaderSum: {
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
  tableBottom: {
    padding: "0 0 0 0",
    fontSize: "12px",
    lineHeight: "14px",
  },
  tableBottomItems: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #000000",
    borderLeft: "1px solid #000000",
  },
  tableBottomItemFirst: {
    width: "62%",
    borderRight: "1px solid #000000",
    padding: "5px",
  },
  tableBottomItemSecond: {
    width: "23%",
    borderRight: "1px solid #000000",
    padding: "5px",
  },
  tableBottomItemTree: {
    width: "15%",
    borderRight: "1px solid #000000",
    padding: "5px",
  },
  addressBottom: {
    fontSize: "12px",
    lineHeight: "14px",
    padding: "15px 0 0 0",
  },
  bottomInformation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: "35px 0 0 0",
    fontSize: "12px",
    lineHeight: "14px",
    width: "100%",
  },
  bottomInformationName: {
    width: "50%",
  },
  bottomInformationCustomBlock: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    justifyContent: "flex-end",
  },
  bottomInformationCustomBlockName: {
    padding: "0",
  },
  bottomInformationScoreBlockSignature: { width: "50%" },
  bottomInformationCustomBlockSignature: {
    borderBottom: "1px solid #000000",
    width: "100%",
  },
  scoreTop: {
    fontSize: "18px",
    lineHeight: "20px",
    borderBottom: "2px solid #000000",
    margin: "0 0 15px 0",
  },
  scoreResult: {
    fontSize: "11px",
    lineHeight: "20px",
    padding: "20px 0 0 0",
    textAlign: "right",
  },
  scoreBottomInformation: {
    fontSize: "11px",
    lineHeight: "20px",
    borderBottom: "2px solid #000000",
    padding: "40px 0 10px 0",
  },
});

export default InvoiceDocument;
