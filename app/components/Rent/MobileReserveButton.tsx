// app/listings/[id]/MobileReserveButton.tsx (Client Component)
'use client';

import { useMemo } from 'react';
import { getCategoryIcon } from '@/app/components/categoryIcons';

interface MobileReserveButtonProps {
  price: number;
  category: string;
}

export default function MobileReserveButton({ 
  price, 
  category
}: MobileReserveButtonProps) {
  
  // Memoized icon to prevent re-rendering issues
  const categoryIcon = useMemo(() => getCategoryIcon(category), [category]);

  const handleReserveClick = () => {
    const bookingElement = document.getElementById('mobile-booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Optional: Focus on the first interactive element in the booking form
      setTimeout(() => {
        const firstInput = bookingElement.querySelector('input, button, select');
        if (firstInput instanceof HTMLElement) {
          firstInput.focus();
        }
      }, 500);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold text-gray-900">
            R{price.toLocaleString()}
            <span className="text-sm font-normal text-gray-600"> per day</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-emerald-500">{categoryIcon}</span>
            <span className="text-emerald-600 font-medium">
              {category}
            </span>
          </div>
        </div>
        <button 
          onClick={handleReserveClick}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
        >
          Reserve
        </button>
      </div>
    </div>
  );
}