export interface UserType {
  id: number;
  emp_id: number;
  name: number;
  email: string;
  phone: string;
  user_type: string;
  email_varified_at: boolean | null;
  is_active: boolean | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RetailOrderType {
  id: number;
  outlet_id: number;
  ord_number: string;
  ord_date: Date;
  grand_tot: string;
  discount: string;
  special_discount: string;
  total_payable: string;
  dlv_status:
    | "Pending"
    | "Delivered"
    | "Cancelled"
    | "Not Delivered"
    | "Due"
    | "Paid";
  outlet_name: string;
  outlet_code: string;
}

export interface RetailInvoiceType {
  id: number;
  order_id: string;
  ord_number: string;
  inv_number: string;
  inv_date: Date;
  challan_number: string;
  grand_tot: string;
  discount: string;
  special_discount: string;
  total_payable: string;
  pay_status: "Paid" | "Unpaid";
  delivery_status: number | boolean;
  delivery_status_name: "Not Delivered" | "Delivered";
  cancel_status: number | boolean;
  cancel_status_name: "Not Cancelled" | "Cancelled";
  outlet_id: number;
  outlet_name: string;
  distri_id: number;
  distributor_name: string;
}

export interface ProductDetailType {
  inv_details_id: number;
  product_id: number;
  product_name: string;
  product_code: string;
  root_category: number;
  root_category_name: string;
  category: number;
  product_cat_name: string;
  vol: string;
  ctn_size: number;
  pqty_in_ctn: number;
  pqty_in_pcs: number;
  line_total: string;
  ctn_price: string;
  pcs_price: string;
  image: string;
}

export interface RetailInvoiceDetailsType extends RetailInvoiceType {
  product_details: ProductDetailType[];
  offer_details: any[];
}

export interface SalesReturnType {
  id: number;
  sr_number: string;
  inv_number: string;
  return_date: Date;
  grand_tot: string;
  discount: string;
  special_discount: string;
  outlet_id: number;
  outlet_name: string;
  outlet_code: string;
  distributor_id: number;
  distributor_name: string;
  distributor_code: string;
}

export interface SalesReturnDetailsType extends SalesReturnType {
  amount_after_discount: number;
  product_details: ProductDetailType[];
}
