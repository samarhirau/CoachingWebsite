"use client";
import React from "react";

interface DashboardStats {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  prefix?: string;
}

export const StatCard: React.FC<{ stat: DashboardStats }> = React.memo(({ stat }) => {
  const Icon = stat.icon;
  return (
    <div className={`p-5 rounded-xl shadow-lg text-white ${stat.color} transition duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{stat.title}</h3>
        <Icon className="w-8 h-8 opacity-75" />
      </div>
      <div className="mt-2">
        <p className="text-4xl font-bold">
          {stat.prefix}
          {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
        </p>
        <p className="text-sm mt-1 opacity-90">30% Increase in 30 Days</p>
      </div>
    </div>
  );
});
