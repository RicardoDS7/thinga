"use client";

import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  message: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ message, className }) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={tooltipRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="cursor-pointer w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center hover:bg-gray-300 focus:outline-none"
        aria-label="More info"
      >
        ?
      </button>

      {visible && (
        <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-3 max-w-xs w-[90vw] p-3 text-xs text-gray-700 bg-white border border-gray-300 rounded-xl shadow-lg transition-opacity duration-200">
          {message}
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-300"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
