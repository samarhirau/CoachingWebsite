"use client";
import React from "react";
import { Mail as MailIcon, Bell } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  pageTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, pageTitle }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md z-10">
      <button onClick={toggleSidebar} className="text-gray-500 lg:hidden hover:text-indigo-600 transition">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 hidden sm:block">{pageTitle}</h2>

      <div className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 w-32 sm:w-64"
        />
        <button className="p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-gray-100">
          <MailIcon className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <img className="h-9 w-9 rounded-full object-cover border-2 border-indigo-400" src="https://placehold.co/150x150/4f46e5/ffffff?text=AD" alt="Admin Profile" />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
        </div>
      </div>
    </header>
  );
};
