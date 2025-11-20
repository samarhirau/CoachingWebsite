
"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Edit, FileText } from "lucide-react";

interface FeesCollectionItem {
  id: string;
  rollNo: string;
  studentName: string;
  invoiceNumber: string;
  feesType: string;
  paymentType: string;
  status: "Paid" | "Pending" | "Unpaid";
  date: string;
  amount: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FeesCollectionView: React.FC = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const { data: fees = [], isLoading } = useSWR<FeesCollectionItem[]>(
    `/api/fees?limit=${limit}&search=${encodeURIComponent(search)}`,
    fetcher
  );

  const getStatusClass = (status: FeesCollectionItem["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 font-bold";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 font-bold";
      case "Unpaid":
        return "bg-red-100 text-red-800 font-bold";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Fees Collection</h2>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Show
            <select
              className="mx-2 p-1 border rounded-md bg-white"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            entries
          </div>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Roll No.",
                  "Student Name",
                  "Invoice Number",
                  "Fees Type",
                  "Payment Type",
                  "Status",
                  "Date",
                  "Amount",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : fees.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              ) : (
                fees.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.rollNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{item.invoiceNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.feesType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.paymentType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">${item.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeesCollectionView;

