import { convertNumbers } from '@/lib/convert-numbers';
import { ProductDetailType } from '@/lib/types';
import { FC } from 'react';

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
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="th-header">পণ্যের কোড</th>
          <th className="th-header">পণ্যের নাম</th>
          <th className="th-header">প্রতি ইউনিট মূল্য</th>
          <th className="th-header">পরিমাণ</th>
          <th className="th-header">মূল্য</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: ProductDetailType) => (
          <tr key={product.product_code}>
            <td className="td">{convertNumbers(product.product_code)}</td>
            <td className="td">{product.product_name}</td>
            <td className="td">{convertNumbers(product.ctn_price)}</td>
            <td className="td">{convertNumbers(product.pqty_in_ctn)}</td>
            <td className="td">{convertNumbers(product.line_total)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}></td>
          <td
            className="tfooter
                "
          >
            সর্বমোট
          </td>
          <td className="tfooter-content">
            {convertNumbers(grandTotal)}
          </td>
        </tr>
        <tr>
          <td colSpan={3}></td>
          <td
            className="tfooter
                "
          >
            ডিসকাঊন্ট
          </td>
          <td className="tfooter-content">
            {convertNumbers(discount)}
          </td>
        </tr>
        <tr>
          <td colSpan={3}></td>
          <td
            className="tfooter
                "
          >
            বিশেষ ডিসকাঊন্ট
          </td>
          <td className="tfooter-content">
            {convertNumbers(specialDiscount)}
          </td>
        </tr>
        <tr>
          <td colSpan={3}></td>
          <td
            className="tfooter
                "
          >
            মোট টাকা
          </td>
          <td className="tfooter-content">
            {convertNumbers(totalPayable)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
