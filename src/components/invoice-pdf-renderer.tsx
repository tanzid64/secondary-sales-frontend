import { RetailInvoiceDetailsType } from "@/lib/types";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import {
  PDFCompanyInfo,
  PDFDistributor,
  PDFFooter,
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
      <PDFHeader title="Invoice" />

      {/* Company Info */}
      <PDFCompanyInfo
        title="Bill To"
        name={invoice.outlet_name}
        id={invoice.outlet_id}
      />

      {/* Bill To and Ship To */}
      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>Invoice Info:</Text>
          <Text>
            Inv Issue:{" "}
            {format(new Date(invoice.inv_date), "MMMM dd, yyyy 'at' h:mm a")}
          </Text>
          <Text>Inv No: {invoice.inv_number}</Text>
          <Text>Challan No: {invoice.challan_number}</Text>
          <Text>Order No: {invoice.ord_number}</Text>
        </View>
        <PDFDistributor title="Distributor" name={invoice.distributor_name} />
      </View>

      {/* Invoice Info */}
      <View style={styles.row}>
        <Text>Delivery Status: {invoice.delivery_status_name}</Text>
        <Text>Payment Status: {invoice.pay_status}</Text>
        <Text>Cancellation Status: {invoice.cancel_status_name}</Text>
      </View>

      {/* Table */}
      <PDFInfoTable
        products={invoice.product_details}
        grand_tot={invoice.grand_tot}
        discount={invoice.discount}
        special_discount={invoice.special_discount}
        total_payable={invoice.total_payable}
      />

      {/* Footer */}
      <PDFFooter outlet_name={invoice.outlet_name} />

      {/* Signature */}
      <PDFSignature />
    </Page>
  </Document>
);

export default InvoicePDF;
