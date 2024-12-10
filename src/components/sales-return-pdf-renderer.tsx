import { SalesReturnDetailsType } from "@/lib/types";
import { Document } from "@react-pdf/renderer";

// Define styles

const SalesReturnPDF = ({ data }: { data: SalesReturnDetailsType }) => (
  <Document></Document>
);

export default SalesReturnPDF;
