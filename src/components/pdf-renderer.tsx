import { convertNumbers } from "@/lib/convert-numbers";
import { ProductDetailType } from "@/lib/types";
import { Font, Image, StyleSheet, Text, View } from "@react-pdf/renderer";
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

const primaryColor = "#3989c6";

export const PDFStyles = StyleSheet.create({
  page: {
    padding: 30,
  },
  // Header
  header: {
    paddingVertical: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: primaryColor,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distributorText: {
    fontSize: 16,
    fontFamily: "Trio Bangla",
    fontWeight: "normal",
  },
  textRight: {
    textAlign: "right",
  },
  upperCase: {
    textTransform: "uppercase",
  },
  logo: {
    width: 50,
    height: 50,
  },
  // Table
  tableWrapper: {
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  thHeader: {
    padding: 15,
    fontFamily: "Trio Bangla",
    fontWeight: "normal",
    fontSize: 12,
  },
  thLeft: {
    textAlign: "left",
  },
  thRight: {
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  td: {
    padding: 15,
    fontFamily: "Trio Bangla",
    fontSize: 12,
  },
  tdRight: {
    textAlign: "right",
  },
  tdLeft: {
    textAlign: "left",
  },
  tdCenter: {
    textAlign: "center",
  },

  footerRow: {
    flexDirection: "row",
  },
  footerCell: {
    paddingHorizontal: 15,
    fontFamily: "Trio Bangla",
    fontSize: 12,
  },
  footerLabelCell: {
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#000",
    textAlign: "center",
  },
  footerValueCell: {
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#000",
    textAlign: "right",
  },

  noBorderRow: {
    flexDirection: "row",
  },
  noBorderCell: {
    padding: 15,
    fontFamily: "Trio Bangla",
    fontSize: 12,
  },
  footerNoBorderCell: {
    textAlign: "right",
    padding: 15,
    fontFamily: "Trio Bangla",
    fontSize: 12,
  },
});

const styles = PDFStyles;

export const PDFHeader: FC<{ distributorName: string }> = ({
  distributorName,
}) => {
  return (
    <View style={styles.header}>
      <view style={styles.headerContainer}>
        <view>
          <Image style={styles.logo} src="/savoy_logo.png" />
        </view>
        <view>
          <Text style={styles.distributorText}>ডিস্ট্রিবিউটর তথ্যঃ</Text>
          <Text style={styles.upperCase}>{distributorName}</Text>
        </view>
      </view>
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
    <View style={styles.tableWrapper}>
      {/* Table Header */}
      <View style={[styles.headerRow, styles.table]}>
        <Text style={[styles.thHeader, styles.tdCenter, { flex: 0.5 }]}>#</Text>
        <Text style={[styles.thHeader, styles.thLeft, { flex: 1 }]}>
          পণ্যের কোড
        </Text>
        <Text style={[styles.thHeader, styles.thLeft, { flex: 1 }]}>
          পণ্যের নাম
        </Text>
        <Text style={[styles.thHeader, styles.thRight, { flex: 1 }]}>
          প্রতি ইউনিট মূল্য
        </Text>
        <Text style={[styles.thHeader, styles.thRight, { flex: 1 }]}>
          পরিমাণ
        </Text>
        <Text style={[styles.thHeader, styles.thRight, { flex: 1 }]}>
          মূল্য
        </Text>
      </View>

      {/* Table Body */}
      {products.map((product, idx) => (
        <View style={[styles.row, styles.table]} key={product.product_code}>
          <Text style={[styles.td, styles.tdCenter, { flex: 0.5 }]}>
            {convertNumbers(idx + 1)}
          </Text>
          <Text style={[styles.td, styles.tdLeft, { flex: 1 }]}>
            {convertNumbers(product.product_code)}
          </Text>
          <Text style={[styles.td, styles.tdLeft, { flex: 1 }]}>
            {product.product_name}
          </Text>
          <Text style={[styles.td, styles.tdRight, { flex: 1 }]}>
            {convertNumbers(product.ctn_price)}
          </Text>
          <Text style={[styles.td, styles.tdRight, { flex: 1 }]}>
            {convertNumbers(product.pqty_in_ctn)}
          </Text>
          <Text style={[styles.td, styles.tdRight, { flex: 1 }]}>
            {convertNumbers(product.line_total)}
          </Text>
        </View>
      ))}

      {/* Footer (Totals) */}
      {/* সারমোট Row */}
      <View style={[styles.footerRow, styles.table]}>
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, styles.footerLabelCell, { flex: 1 }]}>
          সর্বমোট
        </Text>
        <Text style={[styles.footerCell, styles.footerValueCell, { flex: 1 }]}>
          {convertNumbers(grand_tot)}
        </Text>
      </View>

      {/* ডিসকাঊন্ট Row */}
      <View style={[styles.noBorderRow, styles.table]}>
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, { flex: 1, textAlign: "center" }]}>
          ডিসকাঊন্ট
        </Text>
        <Text style={[styles.footerCell, styles.textRight, { flex: 1 }]}>
          {convertNumbers(discount)}
        </Text>
      </View>

      {/* বিশেষ ডিসকাঊন্ট Row */}
      <View style={[styles.noBorderRow, styles.table]}>
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, { flex: 1 }]} />
        <Text style={[styles.footerCell, { flex: 1, textAlign: "center" }]}>
          বিশেষ ডিসকাঊন্ট
        </Text>
        <Text style={[styles.footerCell, styles.textRight, { flex: 1 }]}>
          {convertNumbers(special_discount)}
        </Text>
      </View>

      {/* মোট টাকা Row */}
      {total_payable && (
        <View style={[styles.footerRow, styles.table]}>
          <Text style={[styles.footerCell, { flex: 1 }]} />
          <Text style={[styles.footerCell, { flex: 1 }]} />
          <Text style={[styles.footerCell, { flex: 1 }]} />
          <Text
            style={[styles.footerCell, styles.footerLabelCell, { flex: 1 }]}
          >
            মোট টাকা
          </Text>
          <Text
            style={[styles.footerCell, styles.footerValueCell, { flex: 1 }]}
          >
            {convertNumbers(total_payable)}
          </Text>
        </View>
      )}

      {amount_after_discount && (
        <View style={[styles.footerRow, styles.table]}>
          <Text style={[styles.footerCell, { flex: 1 }]} />
          <Text style={[styles.footerCell, { flex: 1 }]} />
          <Text style={[styles.footerCell, { flex: 1 }]} />
          <Text
            style={[styles.footerCell, styles.footerLabelCell, { flex: 1 }]}
          >
            মোট টাকা
          </Text>
          <Text
            style={[styles.footerCell, styles.footerValueCell, { flex: 1 }]}
          >
            {convertNumbers(amount_after_discount)}
          </Text>
        </View>
      )}
    </View>
  );
};
