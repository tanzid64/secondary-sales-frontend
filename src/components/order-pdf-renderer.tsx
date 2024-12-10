import { RetailOrderDetailsType } from "@/lib/types";
import { Document } from "@react-pdf/renderer";

// Define styles

const OrderPDF = ({ order }: { order: RetailOrderDetailsType }) => (
  <Document></Document>
);

export default OrderPDF;
