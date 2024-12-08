import { convertNumbers } from "@/lib/convert-numbers";
import { SalesReturnDetailsType } from "@/lib/types";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import {
  PDFCompanyInfo,
  PDFDistributor,
  PDFHeader,
  PDFInfoTable,
  PDFStyles,
} from "./pdf-renderer";

// Define styles
const styles = PDFStyles;

const SalesReturnPDF = ({ data }: { data: SalesReturnDetailsType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeader title="সেলস রিটার্ন" />
      <PDFCompanyInfo title="ক্রেতার নামঃ" name={data.outlet_name} />

      {/* Bill To and Ship To */}
      <View style={styles.row}>
        <View>
          <Text style={styles.boldText}>Return Info:</Text>
          <Text>
            ইস্যু তারিখঃ{" "}
            {convertNumbers(
              format(new Date(data.return_date), "PP", { locale: bn }),
            )}
          </Text>
          <Text>
            ইনভয়েস নংঃ <Text style={styles.fontRoboto}>{data.inv_number}</Text>
          </Text>
          <Text>
            এস আর নংঃ <Text style={styles.fontRoboto}>{data.sr_number}</Text>
          </Text>
        </View>
        <PDFDistributor
          title="ডিস্ট্রিবিউটর তথ্যঃ"
          name={data.distributor_name}
        />
      </View>

      {/* Table */}
      <PDFInfoTable
        products={data.product_details}
        grand_tot={data.grand_tot}
        discount={data.discount}
        special_discount={data.special_discount}
        amount_after_discount={data.amount_after_discount}
      />

      {/* Footer */}

      {/* Signature */}
    </Page>
  </Document>
);

export default SalesReturnPDF;
