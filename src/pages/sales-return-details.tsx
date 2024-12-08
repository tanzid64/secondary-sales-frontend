import { DetailsTable } from "@/components/details-table";
import { Loader } from "@/components/loader";
import SalesReturnPDF from "@/components/sales-return-pdf-renderer";
import { buttonVariants } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { convertNumbers } from "@/lib/convert-numbers";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { FC } from "react";
import { Link, useParams } from "react-router";

const SalesReturnDetails: FC = () => {
  const params = useParams();
  const id = params.id;

  const { data, isFetching } = useQuery({
    queryKey: ["sales-return", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/get-sales-return-details/${id}`,
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
      <div className="w-full h-full px-8 text-sm leading-1">
        <h1 className="text-2xl my-8 w-full text-center">সেলস রিটার্ন</h1>
        {/* Header */}
        <div className=" flex justify-between items-start">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="text-lg">ক্রেতার নামঃ </p>
            <p className="font-bold sr-only">#{data.outlet_id}</p>
            <p className="uppercase text-lg">{data.outlet_name}</p>
          </div>
          {/* Buttons */}
          <div className="space-x-4">
            <PDFDownloadLink
              document={<SalesReturnPDF data={data} />}
              fileName={`Invoice_${data?.sr_number || "unknown"}.pdf`}
              className={buttonVariants({
                size: "sm",
                variant: "secondary",
              })}
            >
              <DownloadIcon className="size-4" />
              <span>Save</span>
            </PDFDownloadLink>

            <Link
              to={`/sales-return-print/${id}`}
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
            <p className="text-lg">রিটার্ন তথ্যঃ </p>
            <p>
              ইস্যু তারিখঃ{" "}
              {convertNumbers(
                format(new Date(data.return_date), "PP", { locale: bn }),
              )}
            </p>
            <p>
              ইনভয়েস নংঃ <span className="font-roboto"> {data.inv_number}</span>
            </p>
            <p>
              এস আর নংঃ <span className="font-roboto">{data.sr_number}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-lg">ডিস্ট্রিবিউটর তথ্যঃ</p>
            <p className="font-bold sr-only">#{data.distributor_code}</p>
            <p className="uppercase">{data.distributor_name}</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8">
          <DetailsTable
            products={data.product_details}
            grandTotal={data.grand_tot}
            discount={data.discount}
            specialDiscount={data.special_discount}
            totalPayable={data.amount_after_discount}
          />
        </div>
      </div>
    </Loader>
  );
};

export default SalesReturnDetails;
