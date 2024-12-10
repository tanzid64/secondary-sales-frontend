import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { banglaFormattedDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { FC, useRef } from "react";
import { useParams } from "react-router";
import { DetailsTable } from "@/components/details-table";
//@ts-ignore
import html2pdf from "html2pdf.js";

const RetailOrderDetailsPage: FC = () => {
  const { id } = useParams();

  const { data: orderData, isFetching } = useQuery({
    queryKey: ["retail-order", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/get-retail-order-details/${Number(id)}`,
      );
      return res.data.data;
    },
  });

  const orderRef = useRef<HTMLDivElement>(null);
  const options = {
    margin: [15, 15, 15, 15],
    filename: `Order_${orderData?.ord_number || "unknown"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
  };

  const handleDownloadPDF = () => {
    if (!orderRef.current) return;
    html2pdf().from(orderRef.current).set(options).save();
  };

  const handlePrintPDF = async () => {
    if (!orderRef.current) return;
    const worker = html2pdf().from(orderRef.current).set(options).toPdf();

    // Access the jsPDF instance
    worker.get("pdf").then((pdf: any) => {
      pdf.autoPrint();
      const pdfBlobUrl = pdf.output("bloburl");
      window.open(pdfBlobUrl, "_blank");
    });
  };

  if (!orderData)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <Loader isLoading={isFetching}>
      <div className="p-[30px]">
        <div className="toolbar hidden-print text-right mb-2 space-x-4">
          <Button onClick={handleDownloadPDF} variant={"secondary"} size={"sm"}>
            <DownloadIcon className="size-4" />
            <span>Save PDF</span>
          </Button>

          <Button size={"sm"} variant="secondary" onClick={handlePrintPDF}>
            <PrinterIcon className="size-4" />
            <span>Print</span>
          </Button>
        </div>
        <hr />

        {/* The section we want to turn into PDF */}
        <div
          id="invoice"
          ref={orderRef}
          className="relative min-h-[1050px] p-[15px] overflow-auto"
        >
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
                  <p className="uppercase">{orderData.distributor_name}</p>
                  <p>{orderData.distributor_address}</p>
                </div>
              </div>
            </header>

            <main className="pb-[50px]">
              <div className="flex justify-between mb-[20px]">
                <div className="w-1/2 text-left">
                  <p className="text-xl font-hind-siliguri font-medium">
                    অর্ডার তথ্যঃ
                  </p>
                  <p className="text-xl">
                    ইস্যু তারিখঃ {banglaFormattedDate(orderData.ord_date)}
                  </p>
                  <p className="text-xl">
                    অর্ডার নংঃ{" "}
                    <span className="font-roboto text-base">
                      {orderData.ord_number}
                    </span>
                  </p>
                </div>
                <div className="w-1/2 text-right">
                  <p className="text-xl font-hind-siliguri ">ক্রেতার নামঃ</p>
                  <p className="font-bold sr-only">#{orderData.outlet_id}</p>
                  <p className="uppercase text-lg">{orderData.outlet_name}</p>
                  <p>{orderData.outlet_address}</p>
                  <p className="text-xl">
                    মোবাইলঃ{" "}
                    <span className="text-base">{orderData.outlet_phone}</span>
                  </p>
                </div>
              </div>

              {/* Details Table */}
              <DetailsTable
                products={orderData.product_details}
                grandTotal={orderData.grand_tot}
                discount={orderData.discount}
                specialDiscount={orderData.special_discount}
                totalPayable={orderData.total_payable}
              />

              <div className="mt-24 flex w-full items-center justify-between">
                <p className="tfooter-signature">বিক্রেতার স্বাক্ষর</p>
                <p className="tfooter-signature">ক্রেতার স্বাক্ষর</p>
              </div>
            </main>
            {/* Signature & footer */}
            <footer className="w-full text-center text-[#777] border-t border-[#aaa] py-[8px] absolute bottom-0">
              Order details was created on a computer and is valid without the
              signature and seal.
            </footer>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default RetailOrderDetailsPage;
