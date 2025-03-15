import HistoryPage from "@/components/history/search-history";
import SearchStatistics from "@/components/history/search-statistics";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 py-20">
      <HistoryPage /> <SearchStatistics />
    </div>
  );
}
