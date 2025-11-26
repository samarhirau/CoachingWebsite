"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface FeesCollectionItem {
  _id: string;
  orderId: string;
  transactionId?: string;
  studentEmail: string;
  courseTitle: string;
  amount: number;
  status: string;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FeesCollectionView() {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(50);

 const { data, error, isLoading } = useSWR(
  `/api/fees?limit=${limit}&search=${encodeURIComponent(search)}`,
  fetcher,
  {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    dedupingInterval: 0,
    focusThrottleInterval: 0,
    fetcher: fetcher,
    keepPreviousData: false,
    suspense: false,
  }
);

  const feesData: FeesCollectionItem[] = Array.isArray(data) ? data : [];

  return (
    <div className="w-full p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search Email, Course, Order ID, Transaction ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
        <Input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="w-24"
        />
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Student Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            )}

            {!isLoading && feesData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No records found
                </TableCell>
              </TableRow>
            )}

            {feesData.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.orderId}</TableCell>
                <TableCell>{item.transactionId || "-"}</TableCell>
                <TableCell>{item.studentEmail}</TableCell>
                <TableCell>{item.courseTitle}</TableCell>
                <TableCell>₹{item.amount}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-semibold
                      ${item.status === "success" ? "bg-green-100 text-green-600" : ""}
                      ${item.status === "pending" ? "bg-yellow-100 text-yellow-600" : ""}
                      ${item.status === "failed" ? "bg-red-100 text-red-600" : ""}
                    `}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
