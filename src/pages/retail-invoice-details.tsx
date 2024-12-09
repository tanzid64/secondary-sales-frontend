import { DetailsTable } from "@/components/details-table";
import InvoicePDF from "@/components/invoice-pdf-renderer";
import { Loader } from "@/components/loader";
import { buttonVariants } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { banglaFormattedDate } from "@/lib/utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
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

  console.log(invoice);

  return (
    <Loader isLoading={isFetching}>
      {/*  */}
      <div id="invoice" className="p-[30px]">
        <div className="toolbar hidden-print">
          <div className="text-right mb-2">
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
          <hr />
        </div>
        <div className="relative min-h-[680px] p-[15px] overflow-auto">
          <div className="min-w-[600px]">
            <header className="py-[10px] mb-[20px] border-b border-[#3989c6]">
              <div className="flex justify-between items-center">
                <div className="w-1/2">
                  <a target="_blank" href="#">
                    <img
                      src="/savoy_logo.png"
                      alt="logo"
                      className="size-20"
                      data-holder-rendered="true"
                    />
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <p className="text-lg font-hind-siliguri font-medium">
                    ডিস্ট্রিবিউটরঃ
                  </p>
                  <p className="uppercase">{invoice.distributor_name}</p>
                </div>
              </div>
            </header>

            <main className="pb-[50px]">
              <div className="flex justify-between mb-[20px]">
                <div className="w-1/2 text-left">
                  <p className="text-xl font-hind-siliguri font-medium">
                    ইনভয়েস তথ্যঃ
                  </p>
                  <p>ইস্যু তারিখঃ {banglaFormattedDate(invoice.inv_date)}</p>
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
                    <span className="font-roboto">
                      {invoice.challan_number}
                    </span>
                  </p>
                </div>
                <div className="w-1/2 text-right">
                  <p className="text-xl font-hind-siliguri ">ক্রেতার নামঃ</p>
                  <p className="font-bold sr-only">#{invoice.outlet_id}</p>
                  <p className="uppercase text-lg">{invoice.outlet_name}</p>
                </div>
              </div>

              {/* Details Table */}
              <DetailsTable
                products={invoice.product_details}
                grandTotal={invoice.grand_tot}
                discount={invoice.discount}
                specialDiscount={invoice.special_discount}
                totalPayable={invoice.total_payable}
              />
              <div className="mt-24 flex w-full items-center justify-between">
                <p className="tfooter-signature">বিক্রেতার স্বাক্ষর</p>
                <p className="tfooter-signature">ক্রেতার স্বাক্ষর</p>
              </div>
            </main>
            <footer className="w-full text-center text-[#777] border-t border-[#aaa] py-[8px]">
              Invoice was created on a computer and is valid without the
              signature and seal.
            </footer>
          </div>
          <div></div>
        </div>
      </div>
    </Loader>
  );
};

export default InvoiceDetails;
