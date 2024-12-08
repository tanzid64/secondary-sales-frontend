import { DetailsTable } from "@/components/details-table";
import InvoicePDF from "@/components/invoice-pdf-renderer";
import { Loader } from "@/components/loader";
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

const InvoiceDetails: FC = () => {
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

  if (!invoice)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <Loader isLoading={isFetching}>
      <div className="w-full h-full px-8 text-sm leading-1">
        <h1 className="text-2xl my-8 w-full text-center">Invoice</h1>
        {/* Header */}
        <div className=" flex justify-between items-start">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="text-xl font-hind-siliguri ">ক্রেতার নামঃ</p>
            <p className="font-bold sr-only">#{invoice.outlet_id}</p>
            <p className="uppercase text-lg">{invoice.outlet_name}</p>
          </div>
          {/* Buttons */}
          <div className="space-x-4">
            <PDFDownloadLink
              document={<InvoicePDF invoice={invoice} />}
              fileName={`Invoice_${invoice?.inv_number || "unknown"}.pdf`}
              className={buttonVariants({
                size: "sm",
                variant: "secondary",
              })}
            >
              <DownloadIcon className="size-4" />
              <span>Save</span>
            </PDFDownloadLink>

            <Link
              to={`/retail-invoices-print/${id}`}
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
            <p className="text-lg font-hind-siliguri font-medium">
              ইনভয়েস তথ্যঃ
            </p>
            <p>
              ইস্যু তারিখঃ{" "}
              {convertNumbers(
                format(new Date(invoice.inv_date), "PP", { locale: bn }),
              )}
            </p>
            <p>
              ইনভয়েস নংঃ{" "}
              <span className="font-roboto"> {invoice.inv_number}</span>
            </p>
            <p>
              অর্ডার নংঃ{" "}
              <span className="font-roboto">{invoice.ord_number}</span>
            </p>
            <p>
              চালান নংঃ{" "}
              <span className="font-roboto">{invoice.challan_number}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-hind-siliguri font-medium">
              ডিস্ট্রিবিউটরঃ
            </p>
            <p className="uppercase">{invoice.distributor_name}</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8">
          <DetailsTable
            products={invoice.product_details}
            grandTotal={invoice.grand_tot}
            discount={invoice.discount}
            specialDiscount={invoice.special_discount}
            totalPayable={invoice.total_payable}
          />
        </div>
        {/* Footer */}
        <div className="mt-24 flex w-full items-center justify-between">
          <p className="tfooter-signature">বিক্রেতার স্বাক্ষর</p>
          <p className="tfooter-signature">ক্রেতার স্বাক্ষর</p>
        </div>
      </div>
    </Loader>
  );
};

export default InvoiceDetails;
