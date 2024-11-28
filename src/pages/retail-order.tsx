import { DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { RetailOrderType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { debounce } from "lodash";
import { Loader2, X } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

interface RetailOrderPageProps {}

export const RetailOrderPage: FC<RetailOrderPageProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  useEffect(() => {
    setSearchParams({});
    setSearchQuery({ cursor: "", search: "", status: "" });
  }, []);
  const [searchQuery, setSearchQuery] = useState({
    cursor: searchParams.get("cursor") || "",
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
  });

  const { data: retailOrderData, isFetching } = useQuery({
    queryKey: [
      "retail-order",
      searchQuery.cursor,
      searchQuery.search,
      searchQuery.status,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        cursor: searchQuery.cursor,
        search: searchQuery.search,
        status: searchQuery.status,
      });

      const res = await axiosInstance.get(
        `/api/get-all-retail-orders?${params.toString()}`,
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  // Table
  const columns: ColumnDef<RetailOrderType>[] = useMemo(
    () => [
      {
        accessorKey: "ord_number",
        header: "Order No",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ord_date",
        header: "Order Date",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "outlet_name",
        header: "Outlet Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "outlet_code",
        header: "Outlet Code",
        cell: (info) => info.getValue(),
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
        accessorKey: "dlv_status",
        header: "Delivery Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("dlv_status") === "Delivered",
              "bg-yellow-100 text-yellow-800":
                row.getValue("dlv_status") === "Pending",
            })}
          >
            {row.getValue("dlv_status")}
          </span>
        ),
      },
    ],
    [],
  );

  const handleNextPage = () => {
    if (retailOrderData?.data?.next_cursor) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("cursor", retailOrderData.data.next_cursor);
        return params;
      });
    }
  };

  const handlePrevPage = () => {
    if (retailOrderData?.data?.prev_cursor) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("cursor", retailOrderData.data.prev_cursor);
        return params;
      });
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

  const handleStatusChange = (value: string) => {
    setSearchQuery((prev) => ({ ...prev, status: value }));
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("status", value);
      params.delete("cursor");
      return params;
    });
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="">
            <CardTitle>Retail Orders</CardTitle>
            <CardDescription>Manage your retail orders</CardDescription>
          </div>
          <div className="max-w-1/2 flex gap-2">
            <div className="relative">
              <Input
                placeholder="Search ..."
                className="w-[300px]"
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
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="due">Due</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={columns}
          data={retailOrderData?.data?.data || []}
          isFetching={isFetching}
          hasNextPage={!!retailOrderData?.data?.next_cursor}
          hasPreviousPage={!!retailOrderData?.data?.prev_cursor}
          onNextPage={handleNextPage}
          onPreviousPage={handlePrevPage}
          pageSize={10}
        />
      </CardContent>
    </Card>
  );
};
