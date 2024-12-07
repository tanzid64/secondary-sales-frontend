import { Loader } from "@/components/loader";
import OrderPDF from "@/components/order-pdf-renderer";
import { axiosInstance } from "@/lib/axios";
import { PDFViewer } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router";

const PrintOrderPDF: FC = () => {
  const params = useParams();
  const { id } = params;
  const { data, isFetching } = useQuery({
    queryKey: ["retail-order", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/get-retail-order-details/${Number(id)}`,
      );
      return res.data.data;
    },
  });
  if (!data)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  return (
    <Loader isLoading={isFetching}>
      <PDFViewer width="100%" height="100%" className="h-screen">
        <OrderPDF order={data} />
      </PDFViewer>
    </Loader>
  );
};

export default PrintOrderPDF;
