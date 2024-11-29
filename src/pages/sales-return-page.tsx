import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { SalesReturnType } from "@/lib/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { debounce } from "lodash";
import { EyeIcon, Loader2, X } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";

const SalesReturn: FC = () => {
  const navigate = useNavigate();
  // Filtering
  const [searchParams, setSearchParams] = useSearchParams({});
  const [searchQuery, setSearchQuery] = useState({
    cursor: searchParams.get("cursor") || "",
    search: searchParams.get("search") || "",
  });
  useEffect(() => {
    setSearchParams({});
    setSearchQuery({ cursor: "", search: "" });
  }, []);

  const { data: salesReturnData, isFetching } = useQuery({
    queryKey: ["retail-order", searchQuery.cursor, searchQuery.search],
    queryFn: async () => {
      const params = new URLSearchParams({
        cursor: searchQuery.cursor,
        search: searchQuery.search,
      });

      const res = await axiosInstance.get(
        `/api/get-all-sales-returns?${params.toString()}`,
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  // Table Construction
  const columns: ColumnDef<SalesReturnType>[] = useMemo(
    () => [
      {
        accessorKey: "inv_number",
        header: "Invoice Num",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "sr_number",
        header: "SR Num",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "return_date",
        header: "Return Date",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "outlet_id",
        header: "Outlet ID",
        cell: (row) => row.getValue(),
      },

      {
        accessorKey: "outlet_name",
        header: "Outlet Name",
        cell: (row) => row.getValue(),
      },
      {
        accessorKey: "distributor_code",
        header: "Dist Code",
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

  const handleNextPage = () => {
    if (salesReturnData?.data?.next_cursor) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("cursor", salesReturnData.data.next_cursor);
        return params;
      });
    }
  };

  const handlePrevPage = () => {
    if (salesReturnData?.data?.prev_cursor) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("cursor", salesReturnData.data.prev_cursor);
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
  return  (
    <Card className="border-none shadow-none">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="">
            <CardTitle>Retail Invoices</CardTitle>
            <CardDescription>Manage your invoices and orders</CardDescription>
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
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={columns}
          data={salesReturnData?.data?.data || []}
          isFetching={isFetching}
          hasNextPage={!!salesReturnData?.data?.next_cursor}
          hasPreviousPage={!!salesReturnData?.data?.prev_cursor}
          onNextPage={handleNextPage}
          onPreviousPage={handlePrevPage}
          pageSize={10}
        />
      </CardContent>
    </Card>
  );
};

export default SalesReturn;
