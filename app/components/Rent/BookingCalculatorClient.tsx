// components/BookingClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import DateRangePicker from './CalenderPicker';
import { Calendar, Calculator, Tag, Shield, X, User, Mail, Phone, Loader2 } from 'lucide-react';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface BookingCalculations {
  subtotal: number;
  depositAmount: number;
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

interface ReservationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface BookingClientProps {
  pricePerDay: number;
  depositAmount?: number;
  currency?: string;
  serviceFeeRate?: number;
  taxRate?: number;
  initialRange?: DateRange;
  listingId?: string; // Add listing ID prop
  listingTitle?: string; // Add listing title prop
  category?: string; // Add category prop
  location?: string; // Add location prop
  ownerName?: string; // Add owner name prop
  onBookingChange?: (bookingDetails: {
    dateRange: DateRange;
    numberOfDays: number;
    calculations: BookingCalculations;
  }) => void;
  onReserve?: (bookingDetails: BookingDetails) => void;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface BookingCalculations {
  subtotal: number;
  depositAmount: number;
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
  depositAmount?: number; // default to 0 if not provided
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
  depositAmount = 0,
  currency = 'ZAR',
  serviceFeeRate = 0.1, // 10% service fee
  taxRate = 0,
  initialRange = { startDate: null, endDate: null },
  listingId = '',
  listingTitle = '',
  category = '',
  location = '',
  ownerName = '',
  onBookingChange,
  onReserve
}) => {
  const [dateRange, setDateRange] = useState<DateRange>(initialRange);
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<ReservationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [calculations, setCalculations] = useState<BookingCalculations>({
    subtotal: 0,
    depositAmount: 0,
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
    // Handle edge cases
    if (!amount || isNaN(amount) || !isFinite(amount)) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(0);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  };

  // Update calculations when date range changes
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = calculateDays(dateRange.startDate, dateRange.endDate);
      setNumberOfDays(days);

      if (days > 0) {
        const subtotal = Number(pricePerDay) * Number(days);
        const calculatedServiceFee = subtotal * Number(serviceFeeRate);
        const taxAmount = (subtotal + calculatedServiceFee) * (Number(taxRate) / 100);
        const total = subtotal + Number(depositAmount) + calculatedServiceFee + taxAmount;

        // Debug logging - remove in production
        console.log('Calculation debug:', {
          pricePerDay,
          days,
          depositAmount,
          serviceFeeRate,
          taxRate,
          subtotal,
          calculatedServiceFee,
          taxAmount,
          total
        });

        const newCalculations: BookingCalculations = {
          subtotal: Number(subtotal) || 0,
          depositAmount: Number(depositAmount) || 0,
          serviceFee: Number(calculatedServiceFee) || 0,
          taxes: Number(taxAmount) || 0,
          total: Number(total) || 0
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
          depositAmount: 0,
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
        depositAmount: 0,
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
  }, [dateRange, pricePerDay, depositAmount, serviceFeeRate, taxRate, onBookingChange]);

  const handleDateChange = (newRange: DateRange) => {
    setDateRange(newRange);
  };

  const handleReserve = () => {
    if (numberOfDays > 0 && dateRange.startDate && dateRange.endDate) {
      setShowModal(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateRange.startDate || !dateRange.endDate) {
      alert('Please select valid dates');
      return;
    }

    setIsSubmitting(true);

    try {
      const reservationData = {
        // User details
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        
        // Booking details
        listingId,
        listingTitle,
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
        numberOfDays,
        
        // Pricing breakdown
        pricePerDay,
        subtotal: calculations.subtotal,
        depositAmount,
        serviceFee: calculations.serviceFee,
        taxes: calculations.taxes,
        total: calculations.total,
        currency,
        
        // Optional listing details
        category,
        location,
        ownerName,
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Reservation request submitted successfully! You will receive a confirmation email shortly.');
        setShowModal(false);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        });
        
        if (onReserve) {
          const bookingDetails: BookingDetails = {
            dateRange,
            numberOfDays,
            calculations,
            pricePerDay,
            currency
          };
          onReserve(bookingDetails);
        }
      } else {
        throw new Error(result.error || 'Failed to submit reservation');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        {/* Price Header */}
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-gray-600" />
          <span className="text-2xl font-semibold text-gray-900">
            {formatCurrency(pricePerDay)}
          </span>
          <span className="text-gray-500">per day</span>
        </div>

        {/* Deposit Notice */}
        {depositAmount > 0 && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Security Deposit Required</span>
            </div>
            <p className="text-xs text-blue-700">
              A refundable deposit of {formatCurrency(depositAmount)} is required for this rental
            </p>
          </div>
        )}

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

            {/* Rental Cost (Subtotal) */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {formatCurrency(pricePerDay)} × {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}
              </span>
              <span className="font-medium">{formatCurrency(calculations.subtotal)}</span>
            </div>

            {/* Security Deposit */}
            {depositAmount > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">Security deposit</span>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    Refundable
                  </span>
                </div>
                <span className="font-medium">{formatCurrency(depositAmount)}</span>
              </div>
            )}

            {/* Service Fee */}
            {calculations.serviceFee > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-gray-600">Service fee</span>
                  <span className="text-xs text-gray-500">
                    {(serviceFeeRate * 100).toFixed(0)}% of rental cost
                  </span>
                </div>
                <span className="font-medium">{formatCurrency(calculations.serviceFee)}</span>
              </div>
            )}

            {/* Taxes */}
            {taxRate > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-gray-600">Taxes</span>
                  <span className="text-xs text-gray-500">
                    {taxRate}% on rental + service fee
                  </span>
                </div>
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

            {/* Deposit Notice in Total */}
            {depositAmount > 0 && (
              <div className="text-xs text-gray-500 text-right mt-1">
                Includes {formatCurrency(depositAmount)} refundable deposit
              </div>
            )}

            {/* Reserve Button */}
            <button
              onClick={handleReserve}
              className="cursor-pointer w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition shadow-md hover:shadow-lg"
            >
              Reserve
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              You won&apos;t be charged yet
              {depositAmount > 0 && (
                <span className="block mt-1">
                  Security deposit of {formatCurrency(depositAmount)} will be held and refunded after return
                </span>
              )}
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
            {depositAmount > 0 && (
              <p className="text-xs mt-2 text-blue-600">
                + {formatCurrency(depositAmount)} refundable deposit
              </p>
            )}
          </div>
        )}
      </div>

      {/* Reservation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[var(--color-bg)]/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Complete Your Reservation</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4">
              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{listingTitle}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{dateRange.startDate?.toLocaleDateString()} - {dateRange.endDate?.toLocaleDateString()}</p>
                  <p>{numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}</p>
                  <p className="font-semibold text-gray-900">Total: {formatCurrency(calculations.total)}</p>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="John"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Doe"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+27 123 456 7890"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  By submitting this reservation request, you agree to our terms of service and privacy policy. 
                  You will receive a confirmation email with further instructions.
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Reservation Request'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingClient;