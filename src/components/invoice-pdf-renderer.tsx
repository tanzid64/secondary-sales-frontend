import { convertNumbers } from "@/lib/convert-numbers";
import { RetailInvoiceDetailsType } from "@/lib/types";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import {
  PDFCompanyInfo,
  PDFDistributor,
  PDFHeader,
  PDFInfoTable,
  PDFSignature,
  PDFStyles,
} from "./pdf-renderer";

// Define styles
const styles = PDFStyles;

const InvoicePDF = ({ invoice }: { invoice: RetailInvoiceDetailsType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <PDFHeader title="ইনভয়েস" />

      {/* Company Info */}
      <PDFCompanyInfo title="ক্রেতার নাম" name={invoice.outlet_name} />

      {/* Bill To and Ship To */}
      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>ইনভয়েস তথ্যঃ:</Text>
          <Text>
            ইস্যু তারিখঃ{" "}
            {convertNumbers(
              format(new Date(invoice.inv_date), "PP", { locale: bn }),
            )}
          </Text>
          <Text>
            ইনভয়েস নংঃ{" "}
            <Text style={styles.fontRoboto}>{invoice.inv_number}</Text>
          </Text>
          <Text>
            চালান নংঃ{" "}
            <Text style={styles.fontRoboto}>{invoice.challan_number}</Text>
          </Text>
          <Text>
            অর্ডার নংঃ{" "}
            <Text style={styles.fontRoboto}>{invoice.ord_number}</Text>
          </Text>
        </View>
        <PDFDistributor
          title="ডিস্ট্রিবিউটর তথ্যঃ"
          name={invoice.distributor_name}
        />
      </View>

      {/* Table */}
      <PDFInfoTable
        products={invoice.product_details}
        grand_tot={invoice.grand_tot}
        discount={invoice.discount}
        special_discount={invoice.special_discount}
        total_payable={invoice.total_payable}
      />

      {/* Signature */}
      <PDFSignature />
    </Page>
  </Document>
);

export default InvoicePDF;
