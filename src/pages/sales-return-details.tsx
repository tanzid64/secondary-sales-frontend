import { DetailsTablePrint } from "@/components/details-table-print";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { banglaFormattedDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { FC, useRef } from "react";
import { useParams } from "react-router";
//@ts-ignore
import html2pdf from "html2pdf.js";

const SalesReturnDetails: FC = () => {
  const params = useParams();
  const id = params.id;

  const { data: returnData, isFetching } = useQuery({
    queryKey: ["sales-return", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/get-sales-return-details/${id}`,
      );
      return res.data.data;
    },
  });

  const orderRef = useRef<HTMLDivElement>(null);
  const options = {
    margin: [15, 15, 15, 15],
    filename: `SALES RETURN_${returnData?.sr_number || "unknown"}.pdf`,
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

  if (!returnData)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <Loader isLoading={isFetching}>
      <div className="p-[30px]">
        <div className="text-right space-x-4 p-4">
          <Button onClick={handleDownloadPDF} variant={"secondary"} size={"sm"}>
            <DownloadIcon className="size-4" />
            <span>Save PDF</span>
          </Button>

          <Button size={"sm"} variant="secondary" onClick={handlePrintPDF}>
            <PrinterIcon className="size-4" />
            <span>Print</span>
          </Button>
        </div>
        <hr className="m-[15px]" />

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
                <div className="w-1/2 text-right text-sm">
                  <p className="font-medium">ডিস্ট্রিবিউটরঃ</p>
                  <p className="uppercase">{returnData.distributor_name}</p>
                  <p>{returnData.distributor_address}</p>
                </div>
              </div>
            </header>

            <main className="pb-[50px]">
              <div className="flex justify-between mb-[20px]">
                <div className="w-1/2 text-left text-sm">
                  <p className=" font-medium">রিটার্ন তথ্যঃ</p>
                  <p className="">
                    ইস্যু তারিখঃ {banglaFormattedDate(returnData.return_date)}
                  </p>
                  <p className="">রিটার্ন নংঃ {returnData.sr_number}</p>
                  <p className="">ইনভয়েস নংঃ {returnData.inv_number}</p>
                </div>
                <div className="w-1/2 text-right text-sm">
                  <p className=" ">ক্রেতার নামঃ</p>
                  <p className="font-bold sr-only">#{returnData.outlet_id}</p>
                  <p className="uppercase ">{returnData.outlet_name}</p>
                  <p>{returnData.outlet_address}</p>
                  <p className="">মোবাইলঃ {returnData.outlet_phone}</p>
                </div>
              </div>

              {/* Details Table */}
              <DetailsTablePrint
                products={returnData.product_details}
                grandTotal={returnData.grand_tot}
                discount={returnData.discount}
                specialDiscount={returnData.special_discount}
                totalPayable={returnData.amount_after_discount}
              />
              {/* Footer & signature */}
              <footer className="mt-24 w-full text-center absolute bottom-0 left-0">
                <div className="flex items-center justify-between">
                  <p className="tfooter-signature">বিক্রেতার স্বাক্ষর</p>
                  <p className="tfooter-signature">ক্রেতার স্বাক্ষর</p>
                </div>
                <p className="text-[#777] border-t border-[#aaa] py-[8px] ">
                  Return details was created on a computer and is valid without
                  the signature and seal.
                </p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default SalesReturnDetails;
