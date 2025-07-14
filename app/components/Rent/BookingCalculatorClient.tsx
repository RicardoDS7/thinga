// components/BookingClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import DateRangePicker from './CalenderPicker';
import { Calendar, Calculator, Tag } from 'lucide-react';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface BookingCalculations {
  subtotal: number;
  serviceFee: number;
  taxes: number;
  total: number;
}

interface BookingDetails {
  dateRange: DateRange;
  numberOfDays: number;
  calculations: BookingCalculations;
  pricePerDay: number;
  currency: string;
}

interface BookingClientProps {
  pricePerDay: number;
  currency?: string;
  serviceFeeRate?: number;
  taxRate?: number; // as percentage (e.g., 10 for 10%)
  initialRange?: DateRange;
  onBookingChange?: (bookingDetails: {
    dateRange: DateRange;
    numberOfDays: number;
    calculations: BookingCalculations;
  }) => void;
  onReserve?: (bookingDetails: BookingDetails) => void;
}

export const BookingClient: React.FC<BookingClientProps> = ({
  pricePerDay,
  currency = 'ZAR',
  serviceFeeRate = 0.1, // 10% service fee
  taxRate = 0,
  initialRange = { startDate: null, endDate: null },
  onBookingChange,
  onReserve
}) => {
  const [dateRange, setDateRange] = useState<DateRange>(initialRange);
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [calculations, setCalculations] = useState<BookingCalculations>({
    subtotal: 0,
    serviceFee: 0,
    taxes: 0,
    total: 0
  });

  // Calculate number of nights between two dates
  const calculateDays = (startDate: Date, endDate: Date): number => {
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return Math.max(0, daysDifference);
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Update calculations when date range changes
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = calculateDays(dateRange.startDate, dateRange.endDate);
      setNumberOfDays(days);

      if (days > 0) {
        const subtotal = pricePerDay * days;
        const calculatedServiceFee = subtotal * serviceFeeRate;
        const taxAmount = (subtotal + calculatedServiceFee) * (taxRate / 100);
        const total = subtotal + calculatedServiceFee + taxAmount;

        const newCalculations: BookingCalculations = {
          subtotal,
          serviceFee: calculatedServiceFee,
          taxes: taxAmount,
          total
        };

        setCalculations(newCalculations);
        
        // Notify parent component of changes
        if (onBookingChange) {
          onBookingChange({
            dateRange,
            numberOfDays: days,
            calculations: newCalculations
          });
        }
      } else {
        const emptyCalculations: BookingCalculations = {
          subtotal: 0,
          serviceFee: 0,
          taxes: 0,
          total: 0
        };
        setCalculations(emptyCalculations);
        
        if (onBookingChange) {
          onBookingChange({
            dateRange,
            numberOfDays: 0,
            calculations: emptyCalculations
          });
        }
      }
    } else {
      setNumberOfDays(0);
      const emptyCalculations: BookingCalculations = {
        subtotal: 0,
        serviceFee: 0,
        taxes: 0,
        total: 0
      };
      setCalculations(emptyCalculations);
      
      if (onBookingChange) {
        onBookingChange({
          dateRange,
          numberOfDays: 0,
          calculations: emptyCalculations
        });
      }
    }
  }, [dateRange, pricePerDay, serviceFeeRate, taxRate, onBookingChange]);

  const handleDateChange = (newRange: DateRange) => {
    setDateRange(newRange);
  };

  const handleReserve = () => {
    const bookingDetails: BookingDetails = {
      dateRange,
      numberOfDays,
      calculations,
      pricePerDay,
      currency
    };
    
    if (onReserve) {
      onReserve(bookingDetails);
    } else {
      // Default behavior if no onReserve handler
      console.log('Reservation details:', bookingDetails);
      // You can add default reservation logic here
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      {/* Price Header */}
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-5 h-5 text-gray-600" />
        <span className="text-2xl font-semibold text-gray-900">
          {formatCurrency(pricePerDay)}
        </span>
        <span className="text-gray-500">per day</span>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <DateRangePicker
          onDateChange={handleDateChange}
          initialRange={dateRange}
        />
      </div>

      {/* Selected Dates Display */}
      {dateRange.startDate && dateRange.endDate && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'} selected
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {dateRange.startDate.toLocaleDateString()} - {dateRange.endDate.toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Price Breakdown */}
      {numberOfDays > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-gray-600" />
            <span className="text-lg font-semibold text-gray-900">Price Breakdown</span>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {formatCurrency(pricePerDay)} × {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}
            </span>
            <span className="font-medium">{formatCurrency(calculations.subtotal)}</span>
          </div>

          {/* Service Fee */}
          {calculations.serviceFee > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service fee</span>
              <span className="font-medium">{formatCurrency(calculations.serviceFee)}</span>
            </div>
          )}

          {/* Taxes */}
          {taxRate > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes ({taxRate}%)</span>
              <span className="font-medium">{formatCurrency(calculations.taxes)}</span>
            </div>
          )}

          {/* Divider */}
          <hr className="my-4" />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-xl">{formatCurrency(calculations.total)}</span>
          </div>

          {/* Reserve Button */}
          <button
            onClick={handleReserve}
            className="cursor-pointer w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition shadow-md hover:shadow-lg"
          >
            Reserve
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            You won&apos;t be charged yet
          </p>
        </div>
      )}

      {/* Empty State */}
      {numberOfDays === 0 && dateRange.startDate && dateRange.endDate && (
        <div className="text-center py-4 text-gray-500">
          <p>Please select valid dates to see pricing</p>
        </div>
      )}

      {/* No Dates Selected State */}
      {!dateRange.startDate && !dateRange.endDate && (
        <div className="text-center py-8 text-gray-400">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select your dates to see total pricing</p>
        </div>
      )}
    </div>
  );
};

export default BookingClient;