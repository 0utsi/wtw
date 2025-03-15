'use client'

import * as React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchHistory } from "@/hooks/use-weather-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from 'react';
import HistoryLoader from '../ui/history-loader';


export default function HistoryPage() {
  const { data: searchHistory, isLoading} = useSearchHistory();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;


  const { currentItems, totalPages } = useMemo(() => {
    if (!searchHistory) {
      return { 
        currentItems: [], 
        totalPages: 0 
      };
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    return {
      currentItems: searchHistory.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.ceil(searchHistory.length / itemsPerPage)
    };
  }, [searchHistory, currentPage, itemsPerPage]);

  const goToPreviousPage = React.useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = React.useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  if(isLoading) return 

  return (
    <Card className="w-full max-w-4xl mx-auto">
        {isLoading && <HistoryLoader />}
      <CardHeader>
        <CardTitle className='text-center'>Historia wyszukiwania</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
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
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {item.weatherRecord?.windSpeed} [m/s]
                </TableCell>
                <TableCell>
                  {item.weatherRecord?.description || 'No Record'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}