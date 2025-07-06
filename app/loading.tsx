// app/loading.tsx
"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      {/* You can also use a custom spinner or message */}
    </div>
  );
}
