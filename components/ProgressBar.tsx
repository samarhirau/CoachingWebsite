// components/ProgressBar.tsx
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedCount, totalCount, percentage }) => (
  <motion.div
    className="p-6 bg-[#1a3a6e]/80 rounded-2xl shadow-xl border border-[#2b5496] mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-xl font-semibold text-blue-300 flex items-center space-x-2">
        <Target className="w-5 h-5 text-blue-400" />
        <span>Your Learning Progress</span>
      </h2>
      <p className="text-lg font-bold text-blue-100">
        {completedCount} of {totalCount} Completed
      </p>
    </div>

    <div className="w-full h-3 bg-[#0a1930] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
      </motion.div>
    </div>
    <p className="text-right text-sm mt-2 text-green-300 font-medium">
      {percentage.toFixed(0)}% Complete
    </p>
  </motion.div>
);

export default ProgressBar;