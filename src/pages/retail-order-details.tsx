import { DetailsTable } from "@/components/details-table";
import { Loader } from "@/components/loader";
import OrderPDF from "@/components/order-pdf-renderer";
import { buttonVariants } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { banglaFormattedDate } from "@/lib/utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { FC } from "react";
import { Link, useParams } from "react-router";

const RetailOrderDetailsPage: FC = () => {
  const { id } = useParams();

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
      <div className="w-full h-full px-8 text-sm leading-1 font-tiro-bangla">
        <h1 className="text-2xl my-8 w-full text-center">অর্ডার</h1>
        {/* Header */}
        <div className=" flex justify-between items-start">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="text-lg">ক্রেতার নামঃ</p>
            <p className="font-bold sr-only">#{data.outlet_id}</p>
            <p className="uppercase text-lg">{data.outlet_name}</p>
          </div>
          {/* Buttons */}
          <div className="space-x-4">
            <PDFDownloadLink
              document={<OrderPDF order={data} />}
              fileName={`Invoice_${data?.ord_number || "unknown"}.pdf`}
              className={buttonVariants({
                size: "sm",
                variant: "secondary",
              })}
            >
              <DownloadIcon className="size-4" />
              <span>Save</span>
            </PDFDownloadLink>

            <Link
              to={`/retail-order-print/${id}`}
              className={buttonVariants({
                size: "sm",
                variant: "secondary",
              })}
            >
              <PrinterIcon className="size-4" />
              <span>Print</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-end">
          {/* Invoice Info */}
          <div className="space-y-2">
            <p className="text-lg">অর্ডার তথ্যঃ </p>
            <p>
              অর্ডার ইস্যুঃ {" "}
              {banglaFormattedDate(data.ord_date)}
            </p>
            <p>অর্ডার নংঃ  {data.ord_number}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center mt-8">
          <p>ডেলিভারী স্টাটাসঃ  {data.dlv_status}</p>
        </div>

        {/* Product Details */}
        <div className="mt-8">
          <DetailsTable
            products={data.product_details}
            grandTotal={data.grand_tot}
            discount={data.discount}
            specialDiscount={data.special_discount}
            totalPayable={data.total_payable}
          />
        </div>
      </div>
    </Loader>
  );
};

export default RetailOrderDetailsPage;
