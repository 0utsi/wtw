"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchHistory } from "@/hooks/use-weather-query";
import _ from "lodash";

export default function SearchStatistics() {
  const { data: searchHistory } = useSearchHistory();

  const statistics = React.useMemo(() => {
    if (!searchHistory || searchHistory.length === 0) {
      return {
        totalSearches: 0,
        mostSearchedPlace: "N/A",
        temperatureStats: {
          min: "N/A",
          max: "N/A",
          average: "N/A",
        },
      };
    }

    const validEntries = searchHistory.filter((item) => item.weatherRecord);

    const totalSearches = searchHistory.length;

    const mostSearchedPlace =
      _(validEntries).countBy("place").entries().maxBy(1)?.[0] || "N/A";

    const temperatures = validEntries
      .map((item) => item.weatherRecord!.temperature)
      .filter((temp) => !isNaN(temp));

    const temperatureStats =
      temperatures.length > 0
        ? {
            min: Math.min(...temperatures).toFixed(1),
            max: Math.max(...temperatures).toFixed(1),
            average: (
              temperatures.reduce((a, b) => a + b, 0) / temperatures.length
            ).toFixed(1),
          }
        : {
            min: "N/A",
            max: "N/A",
            average: "N/A",
          };

    return {
      totalSearches,
      mostSearchedPlace,
      temperatureStats,
    };
  }, [searchHistory]);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-4">
      <CardHeader>
        <CardTitle className="text-center">Statystyki</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-muted-foreground text-sm mb-2">Wyszukiwano</h3>
            <p className="text-2xl font-bold">{statistics.totalSearches} </p>
            <p>razy</p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-muted-foreground text-sm mb-2">
              Najczęstsze miasto
            </h3>
            <p className="text-xl font-semibold">
              {statistics.mostSearchedPlace}
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-muted-foreground text-sm mb-2">Temperatura</h3>
            <div className="grid grid-cols-2">
              <p className="font-semibold text-lg">Min:</p>
              <p className="text-md font-normal">
                {statistics.temperatureStats.min}
              </p>
              <p className="font-semibold text-lg">Max: </p>
              <p className="text-md font-normal">
                {statistics.temperatureStats.max}
              </p>
              <p className="font-semibold text-lg">Średnia:</p>
              <p className="text-md font-normal">
                {statistics.temperatureStats.average}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
