import { RetailOrderDetailsType } from "@/lib/types";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import {
  PDFCompanyInfo,
  PDFFooter,
  PDFHeader,
  PDFInfoTable,
  PDFSignature,
  PDFStyles,
} from "./pdf-renderer";

// Define styles
const styles = PDFStyles;

const OrderPDF = ({ order }: { order: RetailOrderDetailsType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <PDFHeader title="Order" />

      {/* Company Info */}
      <PDFCompanyInfo
        title="Company Info"
        name={order.outlet_name}
        id={order.outlet_id}
      />

      {/* Bill To and Ship To */}
      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>Order Info:</Text>
          <Text>
            Ord Issue:{" "}
            {format(new Date(order.ord_date), "MMMM dd, yyyy 'at' h:mm a")}
          </Text>
          <Text>Order No: {order.ord_number}</Text>
        </View>
      </View>

      {/* Invoice Info */}
      <View style={styles.row}>
        <Text>Delivery Status: {order.dlv_status}</Text>
      </View>

      {/* Table */}
      <PDFInfoTable
        products={order.product_details}
        grand_tot={order.grand_tot}
        discount={order.discount}
        special_discount={order.special_discount}
        total_payable={order.total_payable}
      />

      {/* Footer */}
      <PDFFooter outlet_name={order.outlet_name} />

      {/* Signature */}
      <PDFSignature />
    </Page>
  </Document>
);

export default OrderPDF;
