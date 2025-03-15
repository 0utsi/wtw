"use client";

import { WeatherData } from "@/types/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CloudFogIcon,
  ThermometerIcon,
  WindIcon,
  LocateIcon,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeatherDialogProps {
  weatherData?: WeatherData | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WeatherDialog({
  weatherData,
  isOpen,
  onOpenChange,
}: WeatherDialogProps) {
  if (!weatherData) return null;

  const formattedDate = new Date(weatherData.createdAt).toLocaleString(
    "pl-PL",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const formattedPlace =
    weatherData.place.charAt(0).toUpperCase() + weatherData.place.slice(1);

  const formattedDescription =
    weatherData.description.charAt(0).toUpperCase() +
    weatherData.description.slice(1);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center justify-center gap-2">
            <LocateIcon width={20} height={20} />
            <p className="font-bold ">{formattedPlace}</p>
          </DialogTitle>
          <div className="text-center">
            <p className="text-md font-semibold">{formattedDate}</p>
            <div className="flex flex-row gap-1 items-center justify-center mt-2">
              <Globe size={16} className="text-blue-600" />
              <p className="text-sm font-normal">
                {weatherData.lat.toFixed(2)}, {weatherData.lng.toFixed(2)}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="py-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <ThermometerIcon className="w-6 h-6 mr-2 text-red-500" />
              <span className="text-4xl font-bold">
                {Math.round(weatherData.temperature)}°C
              </span>
            </div>
            <div className="text-lg font-medium">{formattedDescription}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <WindIcon className="w-5 h-5 text-blue-500" />
              <div className="text-sm text-muted-foreground">Wiatr</div>
              <div className="font-semibold">{weatherData.windSpeed} m/s</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <CloudFogIcon className="w-5 h-5 text-blue-400" />
              <div className="text-sm text-muted-foreground">Zachmurzenie</div>
              <div className="font-semibold">{weatherData.cloudiness}%</div>
            </div>
          </div>
        </div>

        <DialogFooter className="w-full text-center flex items-center sm:justify-center">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-[200px]  rounded-md cursor-pointer border-1 border-black hover:"
          >
            Zamknij
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
