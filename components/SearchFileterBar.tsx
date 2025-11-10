// components/SearchFilterBar.tsx
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterFormat: string;
  setFilterFormat: (format: string) => void;
  formats: string[];
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  filterFormat,
  setFilterFormat,
  formats,
}) => (
  <motion.div
    className="flex flex-col sm:flex-row gap-4 p-5 bg-[#1a3a6e]/80 rounded-2xl shadow-xl border border-[#2b5496] mt-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    {/* Search Input */}
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
      <input
        type="text"
        placeholder="Search materials by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-3 pl-10 pr-4 bg-[#0a1930] border border-[#2b5496] rounded-xl text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
    </div>

    {/* Filter Dropdown */}
 <select
      value={filterFormat}
      onChange={(e) => setFilterFormat(e.target.value)}
      className="py-3 px-4 bg-[#0a1930] border border-[#2b5496] rounded-xl text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer w-full sm:w-auto"
    >
      <option value="all">All Formats</option>
      {/* ADDED CHECK HERE */}
      {formats && formats.map((format) => ( 
        <option key={format} value={format}>
          {format.toUpperCase()}
        </option>
      ))}
    </select>
  </motion.div>
);

export default SearchFilterBar;