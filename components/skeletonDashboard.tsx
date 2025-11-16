"use client";

export default function SkeletonDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Top Navigation Placeholder */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
            <div>
              <div className="h-5 w-40 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-28 bg-gray-200 rounded-md"></div>
            <div className="h-9 w-28 bg-gray-200 rounded-md"></div>
            <div className="h-9 w-24 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 border-b pb-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-28 bg-gray-200 rounded-md"></div>
          ))}
        </div>

        {/* Main Content Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-white rounded-xl shadow-sm border p-4 space-y-3"
            >
              <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
