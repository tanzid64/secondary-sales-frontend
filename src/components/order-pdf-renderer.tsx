import { RetailOrderDetailsType } from "@/lib/types";
import { banglaFormattedDate } from "@/lib/utils";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  PDFCompanyInfo,
  PDFHeader,
  PDFInfoTable,
  PDFStyles,
} from "./pdf-renderer";

// Define styles
const styles = PDFStyles;

const OrderPDF = ({ order }: { order: RetailOrderDetailsType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <PDFHeader title="অর্ডার" />

      {/* Company Info */}
      <PDFCompanyInfo title="ক্রেতার নাম" name={order.outlet_name} />

      {/* Bill To and Ship To */}
      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>অর্ডার তথ্যঃ</Text>
          <Text>ইস্যু তারিখঃ {banglaFormattedDate(order.ord_date)}</Text>
          <Text>
            অর্ডার নংঃ <Text style={styles.fontRoboto}>{order.ord_number}</Text>
          </Text>
        </View>
      </View>

      {/* Table */}
      <PDFInfoTable
        products={order.product_details}
        grand_tot={order.grand_tot}
        discount={order.discount}
        special_discount={order.special_discount}
        total_payable={order.total_payable}
      />

      {/* Signature */}
      {/* <PDFSignature /> */}
    </Page>
  </Document>
);

export default OrderPDF;
