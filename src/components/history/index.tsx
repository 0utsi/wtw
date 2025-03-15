"use client";

import SearchHistory from "./search-history";
import SearchStatistics from "./search-statistics";
import { useSearchHistory } from "@/hooks/use-weather-query";
import { HistorySkeleton, StatisticsSkeleton } from "../ui/skeleton";
import { MessageCircleWarningIcon } from "lucide-react";

export default function SearchHistoryDashboard() {
  const { data: searchHistory, isLoading, isError } = useSearchHistory();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        <HistorySkeleton />
        <StatisticsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <MessageCircleWarningIcon />
      </div>
    );
  }

  return (
    <div className="flex flex-col sizes-full pt-25">
      <SearchHistory data={searchHistory} />
      <SearchStatistics data={searchHistory} />
    </div>
  );
}
