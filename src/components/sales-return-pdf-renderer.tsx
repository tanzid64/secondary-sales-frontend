import { SalesReturnDetailsType } from "@/lib/types";
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

const SalesReturnPDF = ({ data }: { data: SalesReturnDetailsType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeader title="Sales Return" />
      <PDFCompanyInfo
        title="Company Info"
        name={data.outlet_name}
        id={data.outlet_id}
      />

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
        <PDFDistributor
          title="Distributor"
          name={data.distributor_name}
          code={data.distributor_code}
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
      <PDFFooter outlet_name={data.outlet_name} />

      {/* Signature */}
      <PDFSignature />
    </Page>
  </Document>
);

export default SalesReturnPDF;
