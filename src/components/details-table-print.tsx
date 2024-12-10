import { convertNumbers } from "@/lib/convert-numbers";
import { ProductDetailType } from "@/lib/types";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface DetailsTablePrintProps {
  products: ProductDetailType[];
  grandTotal: string | number;
  discount: string | number;
  specialDiscount: string | number;
  totalPayable: string | number;
}

export const DetailsTablePrint: FC<DetailsTablePrintProps> = ({
  products,
  grandTotal,
  discount,
  specialDiscount,
  totalPayable,
}) => {
  return (
    <>
      {/* Shadcn table */}
      <Table className="border text-xs">
        <TableHeader className="text-primary text-xs">
          <TableRow>
            <TableHead className="text-center w-[50px] text-primary border">
              #
            </TableHead>
            <TableHead className="text-center text-primary border w-[110px]">
              পণ্যের কোড
            </TableHead>
            <TableHead className="text-left text-primary border">
              পণ্যের নাম
            </TableHead>
            <TableHead className="text-center text-primary border w-[80px]">
              কার্টুন সাইজ (পিস)
            </TableHead>
            <TableHead className="text-center text-primary border w-[80px]">
              সাইজ/পিস
            </TableHead>
            <TableHead className="text-center w-[80px] text-primary">
              মূল্য/কার্টুন
            </TableHead>
            <TableHead className="text-center text-primary border w-[80px]">
              পরিমাণ/কার্টুন
            </TableHead>
            <TableHead className="text-right text-primary border w-[150px]">
              মূল্য
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center border">
                {convertNumbers(idx + 1)}
              </TableCell>
              <TableCell className="text-center border">
                {convertNumbers(product.product_code)}
              </TableCell>
              <TableCell className="text-left border">
                {product.product_name}
              </TableCell>
              <TableCell className="text-center border">
                {convertNumbers(product.ctn_size)}
              </TableCell>
              <TableCell className="text-center border">
                {convertNumbers(product.pqty_in_pcs)}
              </TableCell>
              <TableCell className="text-center border">
                {convertNumbers(product.ctn_price)}
              </TableCell>
              <TableCell className="text-center border">
                {convertNumbers(product.pqty_in_ctn)}
              </TableCell>
              <TableCell className="text-right border">
                {convertNumbers(product.line_total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-background">
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right border" colSpan={2}>
              সর্বমোট
            </TableCell>
            <TableCell className="text-right border">
              {convertNumbers(grandTotal)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right border" colSpan={2}>
              ডিসকাঊন্ট
            </TableCell>
            <TableCell className="text-right border">
              {convertNumbers(discount)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right border" colSpan={2}>
              {" "}
              বিশেষ ডিসকাঊন্ট
            </TableCell>
            <TableCell className="text-right border">
              {convertNumbers(specialDiscount)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right border" colSpan={2}>
              মোট টাকা
            </TableCell>
            <TableCell className="text-right border">
              {convertNumbers(totalPayable)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
