import InvoicePDF from "@/components/invoice/pdf-renderer";
import { axiosInstance } from "@/lib/axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router";

const InvoiceDetails: FC = () => {
  const params = useParams();
  const { id } = params;
  const invoiceId = parseInt(id as string);

  const { data: invoiceDetails, isFetching } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/get-retail-invoice-details/${Number(invoiceId)}`,
      );
      return res.data;
    },
  });

  console.log(invoiceDetails);
  return (
    <div className="">
      <PDFDownloadLink
        document={<InvoicePDF />}
        fileName={`Invoice_${
          invoiceDetails?.data?.inv_number || "unknown"
        }.pdf`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      ></PDFDownloadLink>
    </div>
  );
};

export default InvoiceDetails;
