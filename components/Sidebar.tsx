// components/Sidebar.tsx
'use client';
import { BookOpen, ChevronRight, LayoutList } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MOCK_SECTIONS = [
  'Introduction to Course',
  'Module 1: React Basics',
  'Module 2: Advanced Hooks',
  'Project: E-Commerce Site',
  'Final Assessment & Placement Prep'
];

interface SidebarProps {
    slug: string | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ slug }) => {
    const formattedSlug = slug?.replace(/-/g, ' ') || 'Course Title';
    const [open, setOpen] = useState(true); // Always open on desktop

    return (
        <motion.div 
            className="fixed top-0 left-0 h-screen w-64 bg-[#102548] border-r border-[#1a3a6e] shadow-2xl p-4 hidden lg:block z-20"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="text-xl font-bold text-blue-300 flex items-center mb-6 pt-2">
                <BookOpen className="w-6 h-6 mr-2" />
                Study Hub
            </div>
            
            <h3 className="text-sm font-semibold uppercase text-blue-400 mb-4 border-b border-[#1a3a6e] pb-2">
                {formattedSlug}
            </h3>

            <nav className="space-y-2 overflow-y-auto h-[calc(100vh-100px)]">
                {MOCK_SECTIONS.map((section, index) => (
                    <motion.div 
                        key={index}
                        className={`p-3 rounded-lg flex justify-between items-center cursor-pointer transition-all duration-200 
                            ${index === 1 ? 'bg-blue-600/30 text-white' : 'hover:bg-[#1a3a6e] text-blue-100'}`}
                        whileHover={{ x: 5 }}
                    >
                        <div className="flex items-center space-x-3">
                            <LayoutList className="w-4 h-4 opacity-75" />
                            <span>{section}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                    </motion.div>
                ))}
            </nav>
        </motion.div>
    );
}

export default Sidebar;