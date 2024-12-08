import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { RetailInvoiceType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { debounce } from "lodash";
import { EyeIcon, Loader2, X } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const RetailInvoicesPage: FC = () => {
  const navigate = useNavigate();
  // Filtering
  const [searchParams, setSearchParams] = useSearchParams({});
  useEffect(() => {
    setSearchParams({});
    setSearchQuery({ cursor: "", search: "" });
  }, []);

  const [searchQuery, setSearchQuery] = useState({
    cursor: searchParams.get("cursor") || "",
    search: searchParams.get("search") || "",
  });

  // Fetch Invoices
  const { data: retailInvoiceData, isFetching } = useQuery({
    queryKey: ["retail-order", searchQuery.cursor, searchQuery.search],
    queryFn: async () => {
      const params = new URLSearchParams({
        cursor: searchQuery.cursor,
        search: searchQuery.search,
      });

      const res = await axiosInstance.get(
        `/api/get-all-retail-invoices?${params.toString()}`,
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  // Table Construction
  const columns: ColumnDef<RetailInvoiceType>[] = useMemo(
    () => [
      {
        accessorKey: "inv_date",
        header: "Invoice Date",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "inv_number",
        header: "Invoice Num",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "ord_number",
        header: "Order Num",
        cell: (row) => row.getValue(),
      },

      {
        accessorKey: "challan_number",
        header: "Challan Num",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "outlet_name",
        header: "Outlet Name",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "distributor_name",
        header: "Dist Name",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "grand_tot",
        header: "Grand Total",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "discount",
        header: "Discount",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "special_discount",
        header: "Special Discount",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "total_payable",
        header: "Total Payable",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "pay_status",
        header: "Pay Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("pay_status") === "Paid",
              "bg-yellow-100 text-yellow-800":
                row.getValue("pay_status") === "Unpaid",
            })}
          >
            {row.getValue("pay_status")}
          </span>
        ),
      },
      {
        accessorKey: "delivery_status_name",
        header: "Delivery Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("delivery_status_name") === "Delivered",
              "bg-red-100 text-red-800":
                row.getValue("delivery_status_name") === "Cancelled",
              "bg-yellow-100 text-yellow-800": [
                "Pending",
                "Due",
                "Not Delivered",
              ].includes(row.getValue("delivery_status_name")),
              "bg-blue-100 text-blue-800":
                row.getValue("delivery_status_name") === "Paid",
            })}
          >
            {row.getValue("delivery_status_name")}
          </span>
        ),
      },
      {
        accessorKey: "cancel_status_name",
        header: "Cancellation Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("cancel_status_name") === "Not Cancelled",
              "bg-red-100 text-red-800":
                row.getValue("cancel_status_name") === "Cancelled",
            })}
          >
            {row.getValue("cancel_status_name")}
          </span>
        ),
      },
      {
        accessorKey: "id",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant={"link"}
              className="text-green-500 hover:text-green-600"
              onClick={() => {
                navigate(`/retail-invoices/${row.getValue("id")}`);
              }}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [],
  );

  // Handle Page change
  const handleNextPage = () => {
    if (retailInvoiceData?.data?.next_cursor) {
      const newCursor = retailInvoiceData.data.next_cursor;
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("cursor", newCursor);
        return params;
      });

      setSearchQuery((prev) => ({ ...prev, cursor: newCursor }));
    }
  };

  const handlePrevPage = () => {
    if (retailInvoiceData?.data?.prev_cursor) {
      const newCursor = retailInvoiceData.data.prev_cursor;
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("cursor", newCursor);
        return params;
      });

      setSearchQuery((prev) => ({ ...prev, cursor: newCursor }));
    }
  };

  // Debounced Search
  const debounceSearch = useCallback(
    debounce((value) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("search", value);
        params.delete("cursor");
        return params;
      });
    }, 500),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery((prev) => ({ ...prev, search: value }));
    debounceSearch(value);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="">
        <div className="flex flex-col gap-5 md:flex-row md:justify-between">
          <div className="">
            <CardTitle>Retail Invoices</CardTitle>
            <CardDescription>Manage your invoices and orders</CardDescription>
          </div>
          <div className=" flex flex-col gap-5 md:flex-row">
            <div className="relative">
              <Input
                placeholder="Search ..."
                className="w-full md:w-[300px]"
                value={searchQuery.search}
                onChange={handleSearchChange}
              />

              {searchQuery.search && isFetching && (
                <Loader2 className="size-4 text-green-500 cursor-pointer absolute right-2 top-[30%] animate-spin" />
              )}

              {searchQuery.search && !isFetching && (
                <X
                  className="size-4 text-red-500 cursor-pointer absolute right-2 top-[30%]"
                  onClick={() =>
                    handleSearchChange({
                      target: { value: "" },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={columns}
          data={retailInvoiceData?.data?.data || []}
          isFetching={isFetching}
          hasNextPage={!!retailInvoiceData?.data?.next_cursor}
          hasPreviousPage={!!retailInvoiceData?.data?.prev_cursor}
          onNextPage={handleNextPage}
          onPreviousPage={handlePrevPage}
          pageSize={10}
        />
      </CardContent>
    </Card>
  );
};

export default RetailInvoicesPage;
