import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import PdfInterRegular from "../assets/fonts/Inter-Regular.otf";
import { InvoiceFormValues } from "../PowerAttorney";
import { addDaysToFormattedDate } from "../../../utils/dateUtils";

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
  formattedDate,
  supplierInvoiceNumber,
}) => {
  const validUntilDate = addDaysToFormattedDate(formattedDate, 10);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.topInformation}>
            <View style={styles.topInformationLeft}>
              <Text style={styles.topInformationLeftText}>
                Одержувач:{"\n"}
                ТОВ «ПРОСПЕРА–ЮГ»{"\n"}
                Адреса с.Крива Балка, вул.Нова 48{"\n"}
                Ідентифікаційний код ЄДРПОУ: 37969609{"\n"}
                {"\n"}
                Платник:{"\n"}
                ТОВ «ПРОСПЕРА–ЮГ»{"\n"}
                Адреса: с.Крива Балка, вул.Нова 48{"\n"}
                Р/р UA383220010000026002700000422{"\n"}
                Банк АТ «Універсал Банк» МФО 322001
              </Text>
            </View>
            <View style={styles.topInformationRight}>
              <Text style={styles.title}>Типова форма № М-2</Text>
            </View>
          </View>
          <View style={styles.powerAttorneyTerm}>
            <Text>Дійсна до {validUntilDate}</Text>
            <Text>(термін довіреності на 10 днів)</Text>
          </View>
          <View style={styles.powerAttorneyTitle}>
            <Text>ДОВІРЕНІСТЬ № {invoiceNumber}</Text>
          </View>
          <View style={styles.powerAttorneyDate}>
            <Text>Дата видачі {formattedDate}</Text>
          </View>
          <View style={styles.itemInformationAll}>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>ВИДАНО:</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>Директору Ященко М.П.</Text>
                </View>
              </View>
            </View>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>ДОКУМЕНТ, ЩО ЗАСВІДЧУЄ ОСОБУ:</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text style={styles.textCenter}>паспорт</Text>
                </View>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>Серія № 4985667 від «22 липня» 2020р.</Text>
                </View>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>
                    Виданий 4829 Управління ДМС у Миколаївський області
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>НА ОТРИМАННЯ ВІД:</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>ТОВ «{name}»</Text>
                </View>
              </View>
            </View>
            <View style={styles.itemInformation}>
              <View style={styles.itemInformationTitle}>
                <Text>ЦІННОСТЕЙ ЗА:</Text>
              </View>
              <View style={styles.itemInformationBlock}>
                <View style={styles.itemInformationBlockInformation}>
                  <Text>
                    Рахунок № БТ-{supplierInvoiceNumber} від 17.12.2025р.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Динамічна таблиця товарів */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderNumber]}>
                <Text>№№ п/п</Text>
              </View>
              <View
                style={[styles.tableHeaderBLock, styles.tableHeaderNameProduct]}
              >
                <Text style={styles.tableIndentText}>
                  Найменування цінностей
                </Text>
              </View>
              <View style={[styles.tableHeaderBLock, styles.tableHeaderUnit]}>
                <Text>Одиниця виміру</Text>
              </View>
              <View
                style={[styles.tableHeaderBLock, styles.tableHeaderQuantity]}
              >
                <Text style={styles.tableIndentText}>Кількість (прописом)</Text>
              </View>
            </View>
            <View style={styles.tableBody} wrap={false}>
              <View style={[styles.tableBodyBLock, styles.tableHeaderNumber]}>
                <Text style={styles.tableIndentText}>1</Text>
              </View>
              <View
                style={[styles.tableBodyBLock, styles.tableHeaderNameProduct]}
              >
                <Text>
                  Поліетилен високої щільності (HDPE) марки HYPERZONE HY55430
                </Text>
              </View>
              <View style={[styles.tableBodyBLock, styles.tableHeaderUnit]}>
                <Text style={styles.tableIndentText}>Т</Text>
              </View>
              <View style={[styles.tableBodyBLock, styles.tableHeaderQuantity]}>
                <Text style={styles.tableIndentText}>
                  Одна тонна триста сімдесят п'ять кг
                </Text>
              </View>
            </View>
            <View style={styles.powerAttorneySignature}>
              <View style={styles.powerAttorneySignatureTitle}>
                <Text>Підпис</Text>
              </View>
              <View style={styles.powerAttorneySignatureBLock}>
                <View style={styles.powerAttorneySignatureLine}>
                  <Text>&nbsp;</Text>
                </View>
                <View style={styles.powerAttorneySignatureText}>
                  <Text>(зразок підпису особи, що одержала довіреність)</Text>
                </View>
              </View>
            </View>
            <View style={styles.powerAttorneyBottomInformation}>
              <Text>Керівник підприємства</Text>
              <Text>Головний бухгалтер</Text>
              <Text>М.П.</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
//
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
    textAlign: "right",
    padding: "20px 0 0 0",
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
    textAlign: "right",
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
    padding: "20px 0 0 0",
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
    width: "10%",
  },
  tableHeaderQuantity: {
    width: "35%",
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
  tableIndentText: {
    padding: "10px 0 0 0",
  },
  powerAttorneyBottomInformation: {
    fontSize: "11px",
    lineHeight: "26px",
    justifyContent: "flex-start",
    textAlign: "left",
    padding: "20px 0 0 0",
  },
  powerAttorneySignature: {
    fontSize: "11px",
    lineHeight: "13px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    padding: "20px 0 0 0",
    width: "100%",
  },
  powerAttorneySignatureTitle: {
    padding: "0 0 0 0",
  },
  powerAttorneySignatureBLock: {
    padding: "0 0 0 0",
    width: "50%",
    textAlign: "center",
  },
  powerAttorneySignatureLine: {
    borderBottom: "1px solid #000000",
  },
  powerAttorneySignatureText: {
    fontSize: "9px",
    lineHeight: "11px",
  },
  powerAttorneyTerm: {
    fontSize: "11px",
    lineHeight: "16px",
    textAlign: "right",
    padding: "20px 0 0 0",
  },
  powerAttorneyTitle: {
    fontSize: "14px",
    lineHeight: "16px",
    textAlign: "center",
    padding: "30px 0 0 0",
  },
  powerAttorneyDate: {
    fontSize: "11px",
    lineHeight: "13px",
    textAlign: "center",
    padding: "6px 0 0 0",
  },
  textCenter: {
    textAlign: "center",
  },
});

export default InvoiceDocument;
