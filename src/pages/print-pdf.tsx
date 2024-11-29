import InvoicePDF from "@/components/invoice/pdf-renderer";
import { Loader } from "@/components/loader";
import { axiosInstance } from "@/lib/axios";
import { PDFViewer } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router";

const PrintPdf: FC = () => {
  const params = useParams();
  const { id } = params;
  const { data: invoice, isFetching } = useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/get-retail-invoice-details/${Number(id)}`,
      );
      return res.data.data;
    },
  });
  if (!invoice) return <div>Loading...</div>;
  return (
    <Loader isLoading={isFetching}>
      <PDFViewer width="100%" height="100%" className="h-screen">
        <InvoicePDF invoice={invoice} />
      </PDFViewer>
    </Loader>
  );
};

export default PrintPdf;
