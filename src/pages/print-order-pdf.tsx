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
  if (!data) return <div>Loading...</div>;
  return (
    <Loader isLoading={isFetching}>
      <PDFViewer width="100%" height="100%" className="h-screen">
        <OrderPDF order={data} />
      </PDFViewer>
    </Loader>
  );
};

export default PrintOrderPDF;
