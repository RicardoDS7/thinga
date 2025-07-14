// components/DatePickerClient.tsx
'use client';

import React, { useState } from 'react';
import DateRangePicker from './Rent/CalenderPicker';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DatePickerClientProps {
  initialRange?: DateRange;
  onDateChange?: (dateRange: DateRange) => void;
}

export const DatePickerClient: React.FC<DatePickerClientProps> = ({
  initialRange = { startDate: null, endDate: null },
  onDateChange
}) => {
  const [dateRange, setDateRange] = useState<DateRange>(initialRange);

  const handleDateChange = (newRange: DateRange) => {
    setDateRange(newRange);
    onDateChange?.(newRange);
  };

  return (
    <div>
      <DateRangePicker
        onDateChange={handleDateChange}
        initialRange={dateRange}
      />
      
      {dateRange.startDate && dateRange.endDate && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Selected Range:</p>
          <p className="font-medium">
            {dateRange.startDate.toLocaleDateString()} - {dateRange.endDate.toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};
export default DatePickerClient;