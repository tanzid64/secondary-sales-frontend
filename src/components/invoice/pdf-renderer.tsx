import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

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
});

const InvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>East Repair Inc.</Text>

      {/* Company Info */}
      <View style={styles.companyInfo}>
        <Text>1912 Harvest Lane</Text>
        <Text>New York, NY 12210</Text>
      </View>

      {/* Bill To and Ship To */}
      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>Bill To</Text>
          <Text>John Smith</Text>
          <Text>2 Court Square</Text>
          <Text>New York, NY 12210</Text>
        </View>
        <View>
          <Text style={styles.boldText}>Ship To</Text>
          <Text>John Smith</Text>
          <Text>3787 Pineview Drive</Text>
          <Text>Cambridge, MA 12210</Text>
        </View>
      </View>

      {/* Invoice Info */}
      <View style={styles.row}>
        <Text>Invoice #: US-001</Text>
        <Text>Invoice Date: 11/02/2019</Text>
        <Text>Due Date: 26/02/2019</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableCellHeader]}>
          <Text style={styles.tableCell}>QTY</Text>
          <Text style={styles.tableCell}>DESCRIPTION</Text>
          <Text style={styles.tableCell}>UNIT PRICE</Text>
          <Text style={styles.tableCell}>AMOUNT</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>Front and rear brake cables</Text>
          <Text style={styles.tableCell}>100.00</Text>
          <Text style={styles.tableCell}>100.00</Text>
        </View>

        {/* Subtotal and Total */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell} />
          <Text style={styles.tableCell} />
          <Text style={styles.tableCell}>Subtotal</Text>
          <Text style={styles.tableCell}>145.00</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell} />
          <Text style={styles.tableCell} />
          <Text style={styles.tableCell}>Sales Tax 6.25%</Text>
          <Text style={styles.tableCell}>9.06</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell} />
          <Text style={styles.tableCell} />
          <Text style={styles.tableCell}>TOTAL</Text>
          <Text style={styles.tableCell}>154.06</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Terms & Conditions</Text>
        <Text>Payment is due within 15 days</Text>
        <Text>Please make checks payable to: East Repair Inc.</Text>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>John Smith</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
