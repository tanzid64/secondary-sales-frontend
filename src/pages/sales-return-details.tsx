import { Loader } from "@/components/loader";
import { axiosInstance } from "@/lib/axios";
import { ProductDetailType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FC } from "react";
import { useParams } from "react-router";

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
  if (!data) return <div>Loading...</div>;

  return (
    <Loader isLoading={isFetching}>
      <div className="w-full h-full px-8 text-sm leading-1">
        {/* Header */}
        <div className=" flex justify-between items-start">
          {/* Company Info */}
          <div className="space-y-2">
            <p className="text-lg">Company Info:</p>
            <p className="font-bold">#{data.outlet_id}</p>
            <p className="uppercase text-lg">{data.outlet_name}</p>
          </div>
          {/* Buttons */}
          {/* <div className="space-x-4">
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
          </div> */}
        </div>

        <div className="mt-8 flex justify-between items-end">
          {/* Invoice Info */}
          <div className="space-y-2">
            <p className="text-lg">Return Info:</p>
            <p>
              Inv Issue:{" "}
              {format(new Date(data?.return_date), "MMMM dd, yyyy 'at' h:mm a")}
            </p>
            <p>Invoice No: {data.inv_number}</p>
            <p>SR No: {data.sr_number}</p>
          </div>

          <div className="space-y-2">
            <p className="text-lg">Distributor:</p>
            <p className="font-bold">#{data.distributor_code}</p>
            <p className="uppercase">{data.distributor_name}</p>
          </div>
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
                <td className="font-bold px-2 py-1">Grand Total</td>
                <td>{data.grand_tot}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td className="font-bold px-2 py-1">Discount</td>
                <td>{data.discount}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td className="font-bold px-2 py-1">Special Discount</td>
                <td>{data.special_discount}</td>
              </tr>
              <tr>
                <td colSpan={3}></td>
                <td className="font-bold px-2 py-1">Amount After Discount</td>
                <td>{data.amount_after_discount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Loader>
  );
};

export default SalesReturnDetails;
