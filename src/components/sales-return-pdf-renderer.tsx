import { SalesReturnDetailsType } from "@/lib/types";
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

const SalesReturnPDF = ({ data }: { data: SalesReturnDetailsType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>Sales Return</Text>

      {/* Company Info */}
      <View style={styles.companyInfo}>
        <Text style={styles.boldText}>Company Info:</Text>
        <Text>{data.outlet_id}</Text>
        <Text>{data.outlet_name}</Text>
      </View>

      {/* Bill To and Ship To */}
      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>Return Info:</Text>
          <Text>
            Inv Issue:{" "}
            {format(new Date(data.return_date), "MMMM dd, yyyy 'at' h:mm a")}
          </Text>
          <Text>Inv No: {data.inv_number}</Text>
          <Text>SR No: {data.sr_number}</Text>
        </View>
        <View>
          <Text style={styles.boldText}>Distributor:</Text>
          <Text>{data.distributor_name}</Text>
          <Text>{data.distributor_code}</Text>
        </View>
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
        {data.product_details.map((product) => (
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
          <Text style={styles.noBorderCell}>{data.grand_tot}</Text>
        </View>
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Discount</Text>
          <Text style={styles.noBorderCell}>{data.discount}</Text>
        </View>
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Special Discount</Text>
          <Text style={styles.noBorderCell}>{data.special_discount}</Text>
        </View>
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Amount After Discount</Text>
          <Text style={styles.noBorderCell}>{data.amount_after_discount}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Terms & Conditions</Text>
        <Text>Please make checks payable to: {data.outlet_name}</Text>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>Approved By</Text>
      </View>
    </Page>
  </Document>
);

export default SalesReturnPDF;
