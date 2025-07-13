"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Check, Eye, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ICustomerTable } from "@/lib/types";

const data: ICustomerTable[] = [
  {
    id: 20,
    customerCode: "sdfd",
    phone: "8600028290",
    companyName: "RB Indian Oil Rajasthan Chd",
    entityType: "Partnership/Limited Liability Partnership (LLP)",
    email: "rahulgrg58@gmail.com",
    applicationDate: "13-05-2025",
    status: "pending",
  },
  {
    id: 21,
    customerCode: "27AAECR1234A1Z9",
    phone: "9876543210",
    companyName: "Sharma Logistics Pvt Ltd",
    entityType: "Private Limited Company",
    email: "contact@sharmalogistics.in",
    applicationDate: "10-04-2025",
    status: "approved",
  },
  {
    id: 22,
    customerCode: "27AAECR1234A1Z9",
    phone: "9123456789",
    companyName: "Green Earth Traders",
    entityType: "Sole Proprietorship",
    email: "greenearth@gmail.com",
    applicationDate: "22-06-2025",
    status: "rejected",
  },
  {
    id: 23,
    customerCode: "08BBCCM5678L1Z2",
    phone: "9988776655",
    companyName: "Omkar Transport Solutions",
    entityType: "Partnership",
    email: "info@omkartransport.in",
    applicationDate: "05-07-2025",
    status: "pending",
  },
  {
    id: 24,
    customerCode: "09AABCU1234F1Z3",
    phone: "9090909090",
    companyName: "Rajdeep Industrial Suppliers",
    entityType: "Public Limited Company",
    email: "rajdeep@industries.com",
    applicationDate: "01-03-2025",
    status: "approved",
  },
  {
    id: 25,
    customerCode: "09AABCU5634F3Z3",
    phone: "8001234567",
    companyName: "North Star Maritime",
    entityType: "Limited Liability Partnership (LLP)",
    email: "northstar@maritime.in",
    applicationDate: "18-02-2025",
    status: "under review",
  },
];

const getStatusColor = (status: string) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    "under review": "bg-blue-100 text-blue-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};
// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<ICustomerTable>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "customerCode",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Customer Code
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("customerCode")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    maxSize: 100,
    cell: ({ row }) => <div className="capitalize">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "companyName",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("companyName")}</div>,
  },
  {
    accessorKey: "entityType",
    header: "Party Type",
    maxSize: 10,
    cell: ({ row }) => <div className="capitalize">{row.getValue("entityType")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "applicationDate",
    header: "Submission Date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("applicationDate")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(row.getValue("status"))}`}>{row.getValue("status")}</span>
    ),
  },
  // {
  //   accessorKey: "remarks",
  //   header: "Remarks",
  //   cell: ({ row }) => <div className="capitalize">{row.getValue("remarks")}</div>,
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    id: "actions",
    header: "Action", // Optional: hides header for action buttons
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="icon" title="Approve" className="bg-green-100 hover:bg-green-200 border-none text-green-700">
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Reject" className="bg-red-100 hover:bg-red-200 border-none text-red-900">
            <X className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="View" className="bg-blue-100 hover:bg-blue-200 border-none text-blue-900">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    // meta: {
    //   className: "sticky right-0 bg-white z-10", // for body cells
    //   headerClassName: "sticky right-0 bg-white z-20", // for header
    // },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
