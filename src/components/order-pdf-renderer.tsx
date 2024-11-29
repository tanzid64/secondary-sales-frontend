import { RetailOrderDetailsType } from "@/lib/types";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  companyInfo: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    padding: 2,
  },
  tableCellHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
  },
  signature: {
    marginTop: 40,
    textAlign: "right",
  },
  noBorderRow: {
    flexDirection: "row",
    padding: 3,
    alignItems: "center",
  },
  noBorderCell: {
    flex: 1,
    textAlign: "center",
    padding: 0,

    alignItems: "flex-end",
  },
  rightAlignedCell: {
    flex: 1,
    textAlign: "right",
    padding: 2,
    paddingRight: 0,
    alignItems: "flex-end",
  },
});

const OrderPDF = ({ order }: { order: RetailOrderDetailsType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>Order Details</Text>

      {/* Company Info */}
      <View style={styles.companyInfo}>
        <Text style={styles.boldText}>Company Info:</Text>
        <Text>{order.outlet_id}</Text>
        <Text>{order.outlet_name}</Text>
      </View>

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
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableCellHeader]}>
          <Text style={styles.tableCell}>Product Code</Text>
          <Text style={styles.tableCell}>Product Name</Text>
          <Text style={styles.tableCell}>UNIT PRICE</Text>
          <Text style={styles.tableCell}>Qty</Text>
          <Text style={styles.tableCell}>AMOUNT</Text>
        </View>
        {order.product_details.map((product) => (
          <View style={styles.tableRow} key={product.product_code}>
            <Text style={styles.tableCell}>{product.product_code}</Text>
            <Text style={styles.tableCell}>{product.product_name}</Text>
            <Text style={styles.tableCell}>{product.ctn_price}</Text>
            <Text style={styles.tableCell}>{product.pqty_in_ctn}</Text>
            <Text style={styles.tableCell}>{product.line_total}</Text>
          </View>
        ))}

        {/* Subtotal and Total */}
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Grand Total</Text>
          <Text style={styles.noBorderCell}>{order.grand_tot}</Text>
        </View>
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Discount</Text>
          <Text style={styles.noBorderCell}>{order.discount}</Text>
        </View>
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Special Discount</Text>
          <Text style={styles.noBorderCell}>{order.special_discount}</Text>
        </View>
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Total Payable</Text>
          <Text style={styles.noBorderCell}>{order.total_payable}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Terms & Conditions</Text>
        <Text>Please make checks payable to: {order.outlet_name}</Text>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>Approved By</Text>
      </View>
    </Page>
  </Document>
);

export default OrderPDF;
