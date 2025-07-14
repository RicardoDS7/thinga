
// app/components/Rent/CalenderPicker.tsx
"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DatePickerProps {
  onDateChange?: (dateRange: DateRange) => void;
  initialRange?: DateRange;
  minDate?: Date;
  maxDate?: Date;
}

const DateRangePicker: React.FC<DatePickerProps> = ({
  onDateChange,
  initialRange = { startDate: null, endDate: null },
  minDate = new Date(),
  maxDate = new Date(new Date().getFullYear() + 1, 11, 31)
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>(initialRange);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!selectedRange.startDate || !selectedRange.endDate) return false;
    return date >= selectedRange.startDate && date <= selectedRange.endDate;
  };

  const isDateInHoverRange = (date: Date) => {
    if (!selectedRange.startDate || !hoverDate || selectedRange.endDate) return false;
    const start = selectedRange.startDate;
    const end = hoverDate;
    return date.getTime() >= Math.min(start.getTime(), end.getTime()) && 
           date.getTime() <= Math.max(start.getTime(), end.getTime());
  };

  const isDateDisabled = (date: Date) => {
    return date < minDate || date > maxDate;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      // Start new selection
      const newRange = { startDate: date, endDate: null };
      setSelectedRange(newRange);
      setIsSelectingEnd(true);
    } else {
      // Complete the range
      const startDate = selectedRange.startDate;
      const endDate = date;
      
      const newRange = {
        startDate: startDate <= endDate ? startDate : endDate,
        endDate: startDate <= endDate ? endDate : startDate
      };
      
      setSelectedRange(newRange);
      setIsSelectingEnd(false);
      onDateChange?.(newRange);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const getDayClassName = (date: Date) => {
    const baseClass = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-all duration-200 relative";
    
    if (isDateDisabled(date)) {
      return `${baseClass} text-gray-300 cursor-not-allowed`;
    }
    
    const isStart = selectedRange.startDate && date.getTime() === selectedRange.startDate.getTime();
    const isEnd = selectedRange.endDate && date.getTime() === selectedRange.endDate.getTime();
    const isInRange = isDateInRange(date);
    const isInHoverRange = isDateInHoverRange(date);
    
    if (isStart || isEnd) {
      return `${baseClass} bg-black text-white font-semibold z-10`;
    }
    
    if (isInRange) {
      return `${baseClass} bg-gray-100 text-gray-900`;
    }
    
    if (isInHoverRange) {
      return `${baseClass} bg-gray-50 text-gray-900`;
    }
    
    return `${baseClass} text-gray-700 hover:bg-gray-100`;
  };

  const getRangeBackgroundClassName = (date: Date, index: number) => {
    if (!selectedRange.startDate) return "";
    
    const isStart = selectedRange.startDate && date.getTime() === selectedRange.startDate.getTime();
    const isEnd = selectedRange.endDate && date.getTime() === selectedRange.endDate.getTime();
    const isInRange = isDateInRange(date);
    const isInHoverRange = isDateInHoverRange(date);
    
    if (isInRange || isInHoverRange) {
      const dayOfWeek = index % 7;
      let bgClass = "absolute inset-0 bg-gray-100";
      
      if (isInHoverRange && !isInRange) {
        bgClass = "absolute inset-0 bg-gray-50";
      }
      
      if (isStart && dayOfWeek === 0) return `${bgClass} rounded-l-full`;
      if (isEnd && dayOfWeek === 6) return `${bgClass} rounded-r-full`;
      if (isStart) return `${bgClass} rounded-l-full`;
      if (isEnd) return `${bgClass} rounded-r-full`;
      
      return bgClass;
    }
    
    return "";
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="w-5 h-5 text-gray-500" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {selectedRange.startDate ? formatDate(selectedRange.startDate) : 'Rent from'}
          </span>
          <span className="text-gray-400">–</span>
          <span className="text-sm font-medium text-gray-700">
            {selectedRange.endDate ? formatDate(selectedRange.endDate) : 'Return on'}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-6 min-w-[320px]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map(day => (
              <div key={day} className="text-xs font-medium text-gray-500 text-center py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, index) => (
              <div key={index} className="relative">
                {date && (
                  <>
                    <div className={getRangeBackgroundClassName(date, index)} />
                    <div
                      className={getDayClassName(date)}
                      onClick={() => handleDateClick(date)}
                      onMouseEnter={() => setHoverDate(date)}
                      onMouseLeave={() => setHoverDate(null)}
                    >
                      {date.getDate()}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setSelectedRange({ startDate: null, endDate: null });
                setIsSelectingEnd(false);
              }}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear dates
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;