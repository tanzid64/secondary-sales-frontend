import { RetailInvoiceDetailsType } from "@/lib/types";
import { Document, Page } from "@react-pdf/renderer";
import { PDFHeader, PDFInfoTable, PDFStyles } from "./pdf-renderer";

// Define styles

const InvoicePDF = ({ invoice }: { invoice: RetailInvoiceDetailsType }) => (
  <Document>
    <Page size="A4" style={PDFStyles.page} >
      {/* Header */}
      <PDFHeader distributorName={invoice.distributor_name} />
      {/* Table */}
      <PDFInfoTable
        products={invoice.product_details}
        grand_tot={invoice.grand_tot}
        discount={invoice.discount}
        special_discount={invoice.special_discount}
        total_payable={invoice.total_payable}
      />
    </Page>
  </Document>
);

export default InvoicePDF;
