"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useMemo } from "react";
import { SearchHistoryProps } from "@/types/common";

export default function SearchHistory({ data }: SearchHistoryProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const { currentItems, totalPages } = useMemo(() => {
    if (!data) {
      return {
        currentItems: [],
        totalPages: 0,
      };
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return {
      currentItems: data.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.ceil(data.length / itemsPerPage),
    };
  }, [data, currentPage]);

  const goToPreviousPage = React.useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = React.useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-[font2]">
          Historia wyszukiwania
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="font-[font1]">
          <TableHeader>
            <TableRow>
              <TableHead>Miejsce</TableHead>
              <TableHead>Wyszukano</TableHead>
              <TableHead>Temperatura</TableHead>
              <TableHead>Wiatr</TableHead>
              <TableHead>Pogoda</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.place}</TableCell>
                <TableCell>
                  {new Date(item.searchedAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {item.weatherRecord
                    ? `${item.weatherRecord.temperature.toFixed(1)}°C`
                    : "N/A"}
                </TableCell>
                <TableCell>{item.weatherRecord?.windSpeed} [m/s]</TableCell>
                <TableCell>
                  {item.weatherRecord?.description || "No Record"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={goToPreviousPage}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={goToNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
