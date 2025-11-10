// components/ShimmerLoader.tsx
import React from 'react';

const ShimmerLoader: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden p-6 rounded-xl border border-[#2b5496] bg-[#1a3a6e]/70 shadow-lg h-36"
        >
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-6 bg-[#2b5496] rounded w-3/4"></div>
            <div className="h-4 bg-[#2b5496] rounded w-1/2"></div>
            <div className="h-4 bg-[#2b5496] rounded w-full"></div>
          </div>
          {/* Shimmer Effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
      ))}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default ShimmerLoader;