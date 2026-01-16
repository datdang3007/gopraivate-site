import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

export interface Column<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  key: string;
  header: string;
  accessor?: string | ((row: T) => React.ReactNode);
  className?: string;
}

export interface StatisticsTableProps<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  title: string;
  columns: Column<T>[];
  data: T[];
}

const ITEMS_PER_PAGE = 6;

// Helper for paginated array of page numbers (with ellipsis logic)
function getPaginationNumbers(current: number, total: number, delta = 2) {
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export const StatisticsTable = <T extends Record<string, unknown>>({
  title,
  columns,
  data,
}: StatisticsTableProps<T>) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const searchLower = search.toLowerCase();
    return data.filter((row) =>
      columns.some((column) => {
        const value =
          typeof column.accessor === "function"
            ? column.accessor(row)
            : column.accessor
            ? row[column.accessor]
            : row[column.key];
        return value && value.toString().toLowerCase().includes(searchLower);
      })
    );
  }, [search, data, columns]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  );
  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (column.accessor) {
      if (typeof column.accessor === "function") {
        return column.accessor(row);
      }
      // If accessor is a string, treat it as a key path
      return (row[column.accessor] as React.ReactNode) ?? "";
    }
    // Default: use column.key as the property name
    return (row[column.key] as React.ReactNode) ?? "";
  };

  // --- Pagination UI ---
  const paginationNumbers = getPaginationNumbers(page, totalPages);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset page on search
            }}
            placeholder="Search..."
            className="w-[300px]"
          />
          <Button
            variant="outline"
            size="sm"
            disabled
            className="ml-2 flex items-center gap-1 text-muted-foreground"
          >
            <Download size={16} className="mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-8"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.className}>
                      {getCellValue(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* Pagination UI - modern style, similar to your image */}
        <div className="flex justify-end mt-4 items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="min-w-[80px]"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <div className="flex items-center">
            {paginationNumbers.map((num, idx) =>
              typeof num === "number" ? (
                <Button
                  key={num}
                  size="icon"
                  variant={num === page ? "default" : "ghost"}
                  className={`mx-1 w-8 h-8 rounded transition ${
                    num === page
                      ? "bg-gray-900 text-white shadow"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setPage(num)}
                  aria-current={num === page ? "page" : undefined}
                >
                  {num}
                </Button>
              ) : (
                <span
                  key={`dots-${idx}`}
                  className="mx-1 w-8 h-8 text-center flex items-center justify-center text-muted-foreground select-none"
                  aria-hidden="true"
                >
                  ...
                </span>
              )
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="min-w-[80px]"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
