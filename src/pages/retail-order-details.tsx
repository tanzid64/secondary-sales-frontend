import { Loader } from "@/components/loader";
import OrderPDF from "@/components/order-pdf-renderer";
import { buttonVariants } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { ProductDetailType } from "@/lib/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
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
      <div className="w-full h-full px-8 text-sm leading-1">
        <h1 className="text-2xl my-8 w-full text-center">Order</h1>
        {/* Header */}
        <div className=" flex justify-between items-start">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="text-lg">Company Info:</p>
            <p className="font-bold">#{data.outlet_id}</p>
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
            <p className="text-lg">Order Info:</p>
            <p>
              Order Issue:{" "}
              {format(new Date(data?.ord_date), "MMMM dd, yyyy 'at' h:mm a")}
            </p>
            <p>Order No: {data.ord_number}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center mt-8">
          <p>Delivery Status: {data.dlv_status}</p>
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
              {data.product_details.map((product: ProductDetailType) => (
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
            <tfoot className="bg-gray-100">
              <tr>
                <td colSpan={3}></td>
                <td  className="font-bold px-10 py-1 text-end
                ">Grand Total</td>
                <td>{data.grand_tot}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td  className="font-bold px-10 py-1 text-end
                ">Discount</td>
                <td>{data.discount}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td  className="font-bold px-10 py-1 text-end
                ">Special Discount</td>
                <td>{data.special_discount}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td  className="font-bold px-10 py-1 text-end
                ">Total Payable</td>
                <td>{data.total_payable}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Loader>
  );
};

export default RetailOrderDetailsPage;
