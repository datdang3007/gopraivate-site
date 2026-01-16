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
import { cn } from "@/lib/utils";

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
    <Card className="w-full shadow-sm border-border transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground mb-2 sm:mb-0">
          {title}
        </CardTitle>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset page on search
            }}
            placeholder="Search..."
            className="w-full sm:w-[300px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          <Button
            variant="outline"
            size="sm"
            disabled
            className="sm:ml-2 flex items-center gap-1.5 text-muted-foreground cursor-not-allowed opacity-50"
          >
            <Download size={16} />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      "font-semibold text-foreground",
                      column.className
                    )}
                  >
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
                    className="text-center text-muted-foreground py-12"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm">No data available</span>
                      {search && (
                        <span className="text-xs text-muted-foreground">
                          Try adjusting your search query
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="transition-colors duration-150 hover:bg-muted/50 cursor-pointer"
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn("text-foreground", column.className)}
                      >
                        {getCellValue(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination UI - modern style with enhanced interactions */}
        <div className="flex justify-end mt-6 items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="min-w-[80px] cursor-pointer transition-all duration-200 hover:bg-accent hover:border-primary/20 disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {paginationNumbers.map((num, idx) =>
              typeof num === "number" ? (
                <Button
                  key={num}
                  size="icon"
                  variant={num === page ? "default" : "ghost"}
                  className={cn(
                    "w-8 h-8 rounded-md transition-all duration-200 cursor-pointer",
                    num === page
                      ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
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
            className="min-w-[80px] cursor-pointer transition-all duration-200 hover:bg-accent hover:border-primary/20 disabled:cursor-not-allowed"
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
