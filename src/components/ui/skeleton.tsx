import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function HistorySkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="py-4">
        <Skeleton className="h-6 w-[200px] mx-auto" />
      </div>
      <div className="px-4">
        <div className="w-full border-collapse">
          <div className="grid grid-cols-5 border-b">
            {["Miejsce", "Wyszukano", "Temperatura", "Wiatr", "Pogoda"].map(
              (header) => (
                <div key={header} className="p-2 text-left font-medium">
                  <Skeleton className="h-4 w-20" />
                </div>
              )
            )}
          </div>
          <div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="grid grid-cols-5 border-b">
                {[...Array(5)].map((_, cellIndex) => (
                  <div key={cellIndex} className="p-2">
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 mt-6">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
}

function StatisticsSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-4 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="py-4">
        <Skeleton className="h-6 w-[150px] mx-auto" />
      </div>
      <div className="px-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Skeleton, HistorySkeleton, StatisticsSkeleton };
