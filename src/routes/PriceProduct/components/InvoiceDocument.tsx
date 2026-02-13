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
  discount,
  throughWhom,
}) => {
  const totalSum = items?.reduce((acc, item) => acc + item.sum, 0) || 0;
  const totalWithDiscount =
    discount && discount > 0 ? totalSum * (1 - discount / 100) : totalSum;
  const discountAmount =
    discount && discount > 0 ? totalSum * (discount / 100) : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.topInformation}>
            <View style={styles.topInformationLeft}>
              <Text style={styles.topInformationLeftText}>
                Постачальник ФОП Ященко М.П.{"\n"}
                Адреса Миколаївська обл. с.Крива Балка{"\n"}
                Р/рахунок{"\n"}
                UA203220010000026001330134639{"\n"}в АТ "УНІВЕРСАЛ БАНК"{"\n"}
                МФО 322001{"\n"}
                ЄДРПОУ 2966400778{"\n"}
                Тел./ф. 0675141144
              </Text>
            </View>
            <View style={styles.topInformationRight}>
              <Text style={styles.title}>НАКЛАДНА</Text>
              <View style={styles.topInformationNumberBLock}>
                <Text style={styles.topInformationNumberBLockNumberTitle}>
                  N
                </Text>
                <View style={styles.topInformationNumberBLockNumberValue}>
                  <Text>{invoiceNumber}</Text>
                </View>
              </View>
              <View style={styles.topInformationDateBLock}>
                <Text style={styles.topInformationBLockDateTitle}>від</Text>
                <View style={styles.topInformationBLockDateValue}>
                  <Text>{formattedDate}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.itemInformationAll}>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>Одержувач</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>{name || "Відсутні дані ПІБ"}</Text>
                </View>
                <Text style={styles.itemInformationText}>
                  назва, адреса, банківські реквізити
                </Text>
              </View>
            </View>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>Платник</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>{name || "Відсутні дані ПІБ"}</Text>
                </View>
                <Text style={styles.itemInformationText}>
                  назва, адреса, банківські реквізити
                </Text>
              </View>
            </View>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>Підстава</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>
                    Рахунок №{invoiceNumber} від {formattedDate}
                  </Text>
                </View>
                <Text style={styles.itemInformationText}>
                  N договору, наряду тощо
                </Text>
              </View>
            </View>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>Через кого </Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>{throughWhom || " "}</Text>
                </View>
                <Text style={styles.itemInformationText}>
                  ініціали, прізвище, N та дата видачі довіреності
                </Text>
              </View>
            </View>
          </View>

          {/* Динамічна таблиця товарів */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderNumber]}>
                <Text>N</Text>
              </View>
              <View
                style={[styles.tableHeaderBLock, styles.tableHeaderNameProduct]}
              >
                <Text>Найменування товару</Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderUnit]}>
                <Text>Одиниця виміру</Text>
              </View>
              <View
                style={[styles.tableHeaderBLock, styles.tableHeaderQuantity]}
              >
                <Text>Кількість</Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderPrice]}>
                <Text>Ціна</Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderSum]}>
                <Text>Сума</Text>
              </View>
            </View>

            {/* Рядки товарів */}
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

          {/* Таблиця підсумків */}
          <View style={styles.tableBottom} wrap={false}>
            <View style={styles.tableBottomItems}>
              <View style={styles.tableBottomItemFirst}>
                <Text>&nbsp;</Text>
              </View>
              <View style={styles.tableBottomItemSecond}>
                <Text>&nbsp;</Text>
              </View>
              <View style={styles.tableBottomItemTree}>
                <Text>&nbsp;</Text>
              </View>
            </View>
            {/* Разом без знижки */}
            <View style={styles.tableBottomItems}>
              <View style={styles.tableBottomItemFirst}>
                <Text>&nbsp;</Text>
              </View>
              <View style={styles.tableBottomItemSecond}>
                <Text>Разом</Text>
              </View>
              <View style={styles.tableBottomItemTree}>
                <Text>{totalSum.toFixed(2)}</Text>
              </View>
            </View>

            {/* Знижка (тільки якщо є) */}
            {discount && discount > 0 && (
              <>
                <View style={styles.tableBottomItems}>
                  <View style={styles.tableBottomItemFirst}>
                    <Text>&nbsp;</Text>
                  </View>
                  <View style={styles.tableBottomItemSecond}>
                    <Text>Знижка {discount}%</Text>
                  </View>
                  <View style={styles.tableBottomItemTree}>
                    <Text>-{discountAmount.toFixed(2)}</Text>
                  </View>
                </View>
              </>
            )}

            {/* Всього до сплати (зі знижкою або без) */}
            <View style={styles.tableBottomItems}>
              <View style={styles.tableBottomItemFirst}>
                <Text>
                  Всього (прописом) {numberToUkrainianWords(totalWithDiscount)}
                </Text>
              </View>
              <View style={styles.tableBottomItemSecond}>
                <Text>Всього до сплати</Text>
              </View>
              <View style={styles.tableBottomItemTree}>
                <Text>{totalWithDiscount.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.addressBottom}>
            Місце складання Миколаївська обл., с.Крива Балка , вул. Нова 48
          </Text>
          <View style={styles.bottomInformation}>
            <View style={styles.bottomInformationName}>
              <Text>Відвантажив Ященко М.П. </Text>
            </View>
            <View style={styles.bottomInformationCustomBlock}>
              <View style={styles.bottomInformationCustomBlockName}>
                <Text>Отримав(ла):</Text>
              </View>
              <View style={styles.bottomInformationCustomBlockSignature}>
                <Text></Text>
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
  topInformation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  topInformationLeft: {
    border: "1px solid #000",
    width: "50%",
    padding: "15px",
  },
  topInformationLeftText: {
    fontSize: "12px",
    lineHeight: "18px",
  },
  topInformationRight: {
    width: "50%",
    padding: "0 0 0 20px",
  },
  topInformationNumberBLock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topInformationNumberBLockNumberTitle: {
    width: "50%",
  },
  topInformationNumberBLockNumberValue: {
    border: "1px solid #000",
    width: "90px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topInformationDateBLock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 0 0 0",
    fontSize: "12px",
    lineHeight: "14px",
  },
  topInformationBLockDateTitle: {
    width: "30%",
  },
  topInformationBLockDateValue: {
    border: "1px solid #000",
    padding: "10px",
  },
  itemInformationAll: {
    padding: "0 0 0 0",
  },
  itemInformation: {
    display: "flex",
    flexDirection: "row",
    fontSize: "12px",
    lineHeight: "14px",
    padding: "15px 0 0 0",
  },
  itemInformationTitle: {
    flex: "0 0 200px",
  },
  itemInformationBlock: {
    width: "100%",
  },
  itemInformationBlockInformation: {
    borderBottom: "1px solid #000",
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
    padding: "15px 0 0 0",
    fontSize: "12px",
    lineHeight: "14px",
  },
  bottomInformationName: {
    width: "50%",
  },
  bottomInformationCustomBlock: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
  },
  bottomInformationCustomBlockName: {
    padding: "0",
  },
  bottomInformationCustomBlockSignature: {
    borderBottom: "1px solid #000000",
    width: "50%",
  },
});

export default InvoiceDocument;
