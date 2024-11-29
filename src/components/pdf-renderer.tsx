import { ProductDetailType } from "@/lib/types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC } from "react";

export const PDFStyles = StyleSheet.create({
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
  upperCase: {
    textTransform: "uppercase",
  },
});

const styles = PDFStyles;

export const PDFHeader: FC<{ title: string }> = ({ title }) => {
  return <Text style={styles.header}>{title}</Text>;
};

export const PDFCompanyInfo: FC<{
  title: string;
  name: string;
  id: number;
}> = ({ title, name, id }) => {
  return (
    <View style={styles.companyInfo}>
      <Text style={styles.boldText}>{title}:</Text>
      <Text>{id}</Text>
      <Text style={styles.upperCase}>{name}</Text>
    </View>
  );
};

export const PDFDistributor: FC<{
  title: string;
  name: string;
  code?: string;
}> = ({ title, name, code }) => {
  return (
    <View>
      <Text style={styles.boldText}>{title}:</Text>
      <Text>{name}</Text>
      <Text>{code}</Text>
    </View>
  );
};

interface PDFInfoTableProps {
  products: ProductDetailType[];
  grand_tot: string;
  discount: string;
  special_discount: string;
  total_payable?: string;
  amount_after_discount?: number;
}

export const PDFInfoTable: FC<PDFInfoTableProps> = ({
  products,
  grand_tot,
  discount,
  special_discount,
  total_payable,
  amount_after_discount,
}) => {
  return (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableCellHeader]}>
        <Text style={styles.tableCell}>Product Code</Text>
        <Text style={styles.tableCell}>Product Name</Text>
        <Text style={styles.tableCell}>UNIT PRICE</Text>
        <Text style={styles.tableCell}>Qty</Text>
        <Text style={styles.tableCell}>AMOUNT</Text>
      </View>
      {products.map((product) => (
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
        <Text style={styles.noBorderCell}>{grand_tot}</Text>
      </View>
      <View style={styles.noBorderRow}>
        <Text style={styles.noBorderCell} />
        <Text style={styles.noBorderCell} />
        <Text style={styles.rightAlignedCell}>Discount</Text>
        <Text style={styles.noBorderCell}>{discount}</Text>
      </View>
      <View style={styles.noBorderRow}>
        <Text style={styles.noBorderCell} />
        <Text style={styles.noBorderCell} />
        <Text style={styles.rightAlignedCell}>Special Discount</Text>
        <Text style={styles.noBorderCell}>{special_discount}</Text>
      </View>
      {total_payable && (
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Amount After Discount</Text>
          <Text style={styles.noBorderCell}>{total_payable}</Text>
        </View>
      )}
      {amount_after_discount && (
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>Amount After Discount</Text>
          <Text style={styles.noBorderCell}>{amount_after_discount}</Text>
        </View>
      )}
    </View>
  );
};

export const PDFFooter: FC<{ outlet_name: string }> = ({ outlet_name }) => {
  return (
    <View style={styles.footer}>
      <Text>Terms & Conditions</Text>
      <Text style={styles.upperCase}>{outlet_name}</Text>
    </View>
  );
};

export const PDFSignature: FC = () => {
  return (
    <View style={styles.signature}>
      <Text>Approved By</Text>
    </View>
  );
};
