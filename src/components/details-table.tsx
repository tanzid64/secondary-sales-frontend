import { convertNumbers } from "@/lib/convert-numbers";
import { ProductDetailType } from "@/lib/types";
import { FC } from "react";

interface DetailsTableProps {
  products: ProductDetailType[];
  grandTotal: string | number;
  discount: string | number;
  specialDiscount: string | number;
  totalPayable: string | number;
}

export const DetailsTable: FC<DetailsTableProps> = ({
  products,
  grandTotal,
  discount,
  specialDiscount,
  totalPayable,
}) => {
  return (
    <table className="border-0 w-full border-collapse border-spacing-0 mb-[20px] overflow-x-auto">
      <thead>
        <tr className="border-b border-[#D9D9D9]">
          <th className="th-header">#</th>
          <th className="th-header text-left">পণ্যের কোড</th>
          <th className="th-header text-left">পণ্যের নাম</th>
          <th className="th-header text-right">প্রতি ইউনিট মূল্য</th>
          <th className="th-header text-right">পরিমাণ</th>
          <th className="th-header text-right">মূল্য</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: ProductDetailType) => (
          <tr key={product.product_code}>
            <td className="p-[15px] font-tiro-bangla text-center">
              {convertNumbers(products.indexOf(product) + 1)}
            </td>
            <td className="p-[15px] font-tiro-bangla">
              {convertNumbers(product.product_code)}
            </td>
            <td className="p-[15px] font-tiro-bangla">
              {product.product_name}
            </td>
            <td className="td">{convertNumbers(product.ctn_price)}</td>
            <td className="td">{convertNumbers(product.pqty_in_ctn)}</td>
            <td className="td">{convertNumbers(product.line_total)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot className="text-base">
        <tr>
          <td colSpan={3} className="p-[15px]"></td>
          <td
            colSpan={2}
            className="px-[15px] text-right font-tiro-bangla border-t border-t-primary"
          >
            সর্বমোট
          </td>
          <td className="px-[15px] text-right font-tiro-bangla border-t border-t-primary">
            {convertNumbers(grandTotal)}
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="p-[15px]"></td>
          <td colSpan={2} className="px-[15px] text-right font-tiro-bangla">
            ডিসকাঊন্ট
          </td>
          <td className="px-[15px] text-right font-tiro-bangla">
            {convertNumbers(discount)}
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="p-[15px]"></td>
          <td colSpan={2} className="px-[15px] text-right font-tiro-bangla">
            বিশেষ ডিসকাঊন্ট
          </td>
          <td className="px-[15px] text-right font-tiro-bangla">
            {convertNumbers(specialDiscount)}
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="p-[15px]"></td>
          <td
            colSpan={2}
            className="px-[15px] text-right font-tiro-bangla border-t border-t-primary"
          >
            মোট টাকা
          </td>
          <td className="px-[15px] text-right font-tiro-bangla border-t border-t-primary">
            {convertNumbers(totalPayable)}
          </td>
        </tr>

      </tfoot>
    </table>
  );
};
