"use client";

import SearchHistory from "./search-history";
import SearchStatistics from "./search-statistics";
import { useSearchHistory } from "../../hooks/use-weather-query";
import { HistorySkeleton, StatisticsSkeleton } from "../ui/skeleton";

export default function SearchHistoryDashboard() {
  const { data: searchHistory, isLoading } = useSearchHistory();

  if (isLoading) {
    return (
      <div className="flex flex-col sizes-full pt-25">
        <HistorySkeleton />
        <StatisticsSkeleton />
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
