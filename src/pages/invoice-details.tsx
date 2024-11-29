import InvoicePDF from "@/components/invoice/pdf-renderer";
import { Loader } from "@/components/loader";
import { buttonVariants } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { ProductDetailType } from "@/lib/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
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

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <Loader isLoading={isFetching}>
      <div className="w-full h-full px-8 text-sm leading-1">
        {/* Header */}
        <div className=" flex justify-between items-start">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="text-lg">Bill To:</p>
            <p className="font-bold">#{invoice.outlet_id}</p>
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
              target="_blank"
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
            <p className="text-lg">Invoice Info:</p>
            <p>
              Inv Issue: {format(new Date(invoice.inv_date), "MMMM dd, yyyy")}
            </p>
            <p>Invoice No: {invoice.inv_number}</p>
            <p>Order No: {invoice.ord_number}</p>
            <p>Challan No: {invoice.challan_number}</p>
          </div>

          <div className="space-y-2">
            <p className="text-lg">Distributor:</p>
            <p className="uppercase">{invoice.distributor_name}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center mt-8">
          <p>Delivery Status: {invoice.delivery_status_name}</p>
          <p>Payment Status: {invoice.pay_status}</p>
          <p>Cancellation Status: {invoice.cancel_status_name}</p>
        </div>

        {/* Product Details */}
        <div className="mt-8">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1">
                  Product Code
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Product Name
                </th>
                <th className="border border-gray-300 px-2 py-1">Unit Price</th>
                <th className="border border-gray-300 px-2 py-1">Qty</th>
                <th className="border border-gray-300 px-2 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.product_details.map((product: ProductDetailType) => (
                <tr key={product.product_code}>
                  <td className="border border-gray-300 px-2 py-1">
                    {product.product_code}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {product.product_name}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {product.ctn_price}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {product.pqty_in_ctn}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {product.line_total}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}></td>
                <td className="font-bold px-2 py-1">Grand Total</td>
                <td>{invoice.grand_tot}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td className="font-bold px-2 py-1">Discount</td>
                <td>{invoice.discount}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td className="font-bold px-2 py-1">Special Discount</td>
                <td>{invoice.special_discount}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td className="font-bold px-2 py-1">Total Payable</td>
                <td>{invoice.total_payable}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col w-full justify-center items-center">
          <p>Terms & conditions</p>
          <p>Payment is due within 15 days</p>
          <p>Please make checks payable to: {invoice.outlet_name}</p>
        </div>
        {/* Signature */}
        <div className="mt-16 flex flex-col w-full  items-end">
          <p className="border-t p-2">Authorized Signature</p>
        </div>
      </div>
    </Loader>
  );
};

export default InvoiceDetails;
