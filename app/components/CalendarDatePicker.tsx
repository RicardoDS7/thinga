"use client";

import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export function CalendarDateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full border px-4 py-2 rounded-lg text-left text-gray-700 flex items-center justify-between">
          {range?.from ? (
            `${format(range.from, "MMM dd")} - ${format(range.to ?? range.from, "MMM dd")}`
          ) : (
            "Select rental dates"
          )}
          <CalendarIcon className="w-4 h-4 ml-2" />
        </PopoverTrigger>

        <PopoverContent className="p-2 bg-white z-50">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
