import { convertNumbers } from "@/lib/convert-numbers";
import { ProductDetailType } from "@/lib/types";
import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC } from "react";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Italic.ttf", fontStyle: "italic" },
  ],
});

Font.register({
  family: "Trio Bangla",
  fonts: [
    {
      src: "/fonts/TiroBangla-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/TiroBangla-Italic.ttf",
      fontStyle: "italic",
    },
  ],
});
export const PDFStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Trio Bangla",
  },
  fontRoboto: {
    fontFamily: "Roboto",
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
    marginTop: 80,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
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
}> = ({ title, name }) => {
  return (
    <View style={styles.companyInfo}>
      <Text style={styles.boldText}>{title}:</Text>
      <Text style={styles.upperCase}>{name}</Text>
    </View>
  );
};

export const PDFDistributor: FC<{
  title: string;
  name: string;
}> = ({ title, name }) => {
  return (
    <View>
      <Text style={styles.boldText}>{title}:</Text>
      <Text>{name}</Text>
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
        <Text style={styles.tableCell}>পণ্যের কোড</Text>
        <Text style={styles.tableCell}>পণ্যের নাম</Text>
        <Text style={styles.tableCell}>প্রতি ইউনিট মূল্য</Text>
        <Text style={styles.tableCell}>পরিমাণ</Text>
        <Text style={styles.tableCell}>মূল্য</Text>
      </View>
      {products.map((product) => (
        <View style={styles.tableRow} key={product.product_code}>
          <Text style={styles.tableCell}>
            {convertNumbers(product.product_code)}
          </Text>
          <Text style={styles.tableCell}>{product.product_name}</Text>
          <Text style={styles.tableCell}>
            {convertNumbers(product.ctn_price)}
          </Text>
          <Text style={styles.tableCell}>
            {convertNumbers(product.pqty_in_ctn)}
          </Text>
          <Text style={styles.tableCell}>
            {convertNumbers(product.line_total)}
          </Text>
        </View>
      ))}

      {/* Subtotal and Total */}
      <View style={styles.noBorderRow}>
        <Text style={styles.noBorderCell} />
        <Text style={styles.noBorderCell} />
        <Text style={styles.rightAlignedCell}>সর্বমোট</Text>
        <Text style={styles.noBorderCell}>{convertNumbers(grand_tot)}</Text>
      </View>
      <View style={styles.noBorderRow}>
        <Text style={styles.noBorderCell} />
        <Text style={styles.noBorderCell} />
        <Text style={styles.rightAlignedCell}>ডিসকাঊন্ট</Text>
        <Text style={styles.noBorderCell}>{convertNumbers(discount)}</Text>
      </View>
      <View style={styles.noBorderRow}>
        <Text style={styles.noBorderCell} />
        <Text style={styles.noBorderCell} />
        <Text style={styles.rightAlignedCell}> বিশেষ ডিসকাঊন্ট</Text>
        <Text style={styles.noBorderCell}>
          {convertNumbers(special_discount)}
        </Text>
      </View>
      {total_payable && (
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>মোট টাকা</Text>
          <Text style={styles.noBorderCell}>
            {convertNumbers(total_payable)}
          </Text>
        </View>
      )}
      {amount_after_discount && (
        <View style={styles.noBorderRow}>
          <Text style={styles.noBorderCell} />
          <Text style={styles.noBorderCell} />
          <Text style={styles.rightAlignedCell}>মোট টাকা</Text>
          <Text style={styles.noBorderCell}>
            {convertNumbers(amount_after_discount)}
          </Text>
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
      <View>
        <Text>বিক্রেতার স্বাক্ষর</Text>
      </View>
      <View>
        <Text>ক্রেতার স্বাক্ষর</Text>
      </View>
    </View>
  );
};
