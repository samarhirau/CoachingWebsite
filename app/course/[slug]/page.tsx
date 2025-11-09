// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams } from 'next/navigation';
// import dynamic from 'next/dynamic';
// import { Loader2, FolderDot } from 'lucide-react';
// import FileItem from '@/components/FileItem';

// interface FileItemType {
//   name: string;
//   url: string;
//   format: string;
// }

// const Page = () => {
//   const { slug } = useParams();
//   const [files, setFiles] = useState<FileItemType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchFiles = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/cloudinary/${slug}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       if (data && Array.isArray(data.files)) setFiles(data.files);
//       else throw new Error('Invalid response format');
//       setError(null);
//     } catch (err: any) {
//       setError(`Failed to load files. ${err.message}`);
//       setFiles([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [slug]);

//   useEffect(() => {
//     fetchFiles();
//   }, [fetchFiles]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0a1930] via-[#0e2550] to-[#162a60] text-white p-6 sm:p-10 font-sans">
//       <div className="max-w-5xl mx-auto">
//         <header className="mb-10 p-8 bg-[#102548]/70 backdrop-blur-xl rounded-3xl shadow-xl text-center border border-[#1a3a6e]">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-300 mb-3 animate-slideIn">
//             {slug?.toString().replace(/-/g, ' ').toUpperCase()} Materials
//           </h1>
//           <p className="text-blue-100 text-lg sm:text-xl">
//             Access your curated study and placement resources.
//           </p>
//         </header>

//         <section className="space-y-5">
//           {loading ? (
//             <div className="flex flex-col justify-center items-center p-12 bg-[#112850]/60 rounded-2xl shadow-lg animate-pulse">
//               <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-3" />
//               <p className="text-lg font-semibold text-blue-300">Loading resources...</p>
//             </div>
//           ) : error ? (
//             <div className="p-6 bg-red-500/20 border-l-4 border-red-400 text-red-200 rounded-2xl shadow-md">
//               <p className="font-bold text-lg">Error</p>
//               <p>{error}</p>
//             </div>
//           ) : files.length === 0 ? (
//             <div className="p-6 bg-yellow-500/20 border-l-4 border-yellow-400 text-yellow-200 rounded-2xl shadow-md">
//               <p className="font-bold text-lg">No Files Found</p>
//               <p>The folder seems empty or unavailable.</p>
//             </div>
//           ) : (
//             files.map((file, idx) => <FileItem key={idx} file={file} />)
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Page;


// app/study-materials/page.tsx
'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Frown, Loader2, Check, FileText, PlayCircle, Code, Briefcase } from 'lucide-react';

// --- 1. DATA AND TYPES --------------------------------------------------------

// Type definitions for a single material item
interface Material {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'code' | 'doc';
  icon: typeof FileText; // Type of the Lucide-React icon
  tags: string[];
}

// Map file types to their appropriate icon
const IconMap = {
  pdf: FileText,
  video: PlayCircle,
  code: Code,
  doc: Briefcase,
};

// Mock Study Material Data
const studyMaterials: Material[] = [
  {
    id: 'mat-1',
    title: 'Advanced React Hooks Deep Dive',
    description: 'A comprehensive guide to custom hooks, optimization, and common pitfalls.',
    type: 'pdf',
    icon: IconMap.pdf,
    tags: ['react', 'frontend', 'pdf'],
  },
  {
    id: 'mat-2',
    title: 'Tailwind CSS for Production',
    description: 'Video tutorial on using Tailwind with Next.js, purges, and component libraries.',
    type: 'video',
    icon: IconMap.video,
    tags: ['css', 'video', 'design'],
  },
  {
    id: 'mat-3',
    title: 'Next.js 14 App Router Workshop',
    description: 'Interactive code examples for server components, data fetching, and layouts.',
    type: 'code',
    icon: IconMap.code,
    tags: ['nextjs', 'code', 'fullstack'],
  },
  {
    id: 'mat-4',
    title: 'System Design Interview Prep - I',
    description: 'Document covering Load Balancers, Databases, and Scaling strategies.',
    type: 'doc',
    icon: IconMap.doc,
    tags: ['interview', 'system-design', 'doc'],
  },
  {
    id: 'mat-5',
    title: 'Framer Motion: Advanced Animations',
    description: 'A video course on creating complex staggered and exit animations.',
    type: 'video',
    icon: IconMap.video,
    tags: ['react', 'animation', 'video'],
  },
  {
    id: 'mat-6',
    title: 'Introduction to GraphQL',
    description: 'PDF notes on queries, mutations, subscriptions, and Apollo Client.',
    type: 'pdf',
    icon: IconMap.pdf,
    tags: ['backend', 'graphql', 'pdf'],
  },
];

const materialsIds = studyMaterials.map(m => m.id);

// --- 2. CUSTOM HOOK (useStudyProgress) ----------------------------------------

const STORAGE_KEY = 'studyMaterialsProgress';
type ProgressState = Record<string, boolean>;

const useStudyProgress = (materialIds: string[]) => {
  const [progress, setProgress] = useState<ProgressState>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load progress from localStorage on initial mount
  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEY);
      let initialProgress: ProgressState;

      if (storedProgress) {
        const parsedProgress: ProgressState = JSON.parse(storedProgress);
        
        // Filter out non-existent IDs and initialize missing ones to false
        initialProgress = materialIds.reduce((acc, id) => {
          acc[id] = parsedProgress[id] ?? false;
          return acc;
        }, {} as ProgressState);
      } else {
        // Initialize all materials as incomplete if no storage found
        initialProgress = materialIds.reduce((acc, id) => {
          acc[id] = false;
          return acc;
        }, {} as ProgressState);
      }
      setProgress(initialProgress);
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
      setIsLoaded(true); // Treat as loaded even if there was an error
    }
  }, [materialIds]);

  // 2. Persist progress to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && Object.keys(progress).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  // 3. Toggles the completion status for a given material ID
  const toggleCompletion = useCallback((id: string) => {
    setProgress(prevProgress => {
      const newProgress = {
        ...prevProgress,
        [id]: !prevProgress[id],
      };
      return newProgress;
    });
  }, []);

  // 4. Resets all progress
  const resetProgress = useCallback(() => {
    const resetState: ProgressState = materialIds.reduce((acc, id) => {
      acc[id] = false;
      return acc;
    }, {} as ProgressState);
    setProgress(resetState);
    localStorage.removeItem(STORAGE_KEY); 
  }, [materialIds]);

  return { progress, toggleCompletion, resetProgress, isLoaded };
};

// --- 3. COMPONENTS ------------------------------------------------------------

// A. ProgressBar Component
interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
}

const ProgressBar = ({ completedCount, totalCount }: ProgressBarProps) => {
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 mb-10 transition-all duration-500">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-blue-200 tracking-wider">
          STUDY PROGRESS
        </h2>
        <span className="text-2xl font-bold text-blue-300">
          {completedCount} / {totalCount}
        </span>
      </div>
      <div className="h-2.5 w-full bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

// B. MaterialCard Component
interface MaterialCardProps {
  material: Material;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

const MaterialCard = ({ material, isCompleted, onToggle }: MaterialCardProps) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;

    setIsToggling(true);
    // Simulate an async operation
    await new Promise(resolve => setTimeout(resolve, 500)); 
    onToggle(material.id);
    setIsToggling(false);
  };

  return (
    <motion.div
      className={`
        relative p-6 rounded-3xl backdrop-blur-lg shadow-2xl cursor-pointer 
        transition-all duration-300 ease-in-out
        ${isCompleted 
          ? 'bg-blue-900/40 border border-blue-400/30' 
          : 'bg-white/10 border border-white/20 hover:bg-white/20'
        }
      `}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, rotate: 0.5 }}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full ${isCompleted ? 'bg-blue-400/80' : 'bg-white/20'}`}>
          <material.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-1 ${isCompleted ? 'text-blue-200 line-through' : 'text-white'}`}>
            {material.title}
          </h3>
          <p className="text-sm text-gray-300 mb-4">{material.description}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          onClick={handleToggle}
          disabled={isToggling}
          className={`
            flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold 
            transition-all duration-300
            ${isCompleted
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            }
            disabled:opacity-70
          `}
          whileTap={{ scale: 0.95 }}
        >
          {isToggling ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : isCompleted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="flex items-center"
            >
              <Check className="w-5 h-5 mr-2" />
              Completed
            </motion.div>
          ) : (
            'Mark as Completed'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};


// --- 4. MAIN PAGE COMPONENT ---------------------------------------------------

const StudyMaterialsPage = () => {
  const { progress, toggleCompletion, resetProgress, isLoaded } = useStudyProgress(materialsIds);
  const [searchTerm, setSearchTerm] = useState('');

  // Progress Calculation
  const completedCount = useMemo(
    () => materialsIds.filter(id => progress[id]).length,
    [progress]
  );
  const totalCount = materialsIds.length;

  // Filtered Materials
  const filteredMaterials = useMemo(() => {
    if (!searchTerm) return studyMaterials;

    const lowerCaseSearch = searchTerm.toLowerCase();
    return studyMaterials.filter(material =>
      material.title.toLowerCase().includes(lowerCaseSearch) ||
      material.description.toLowerCase().includes(lowerCaseSearch) ||
      material.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
    );
  }, [searchTerm]);

  // Initial Loading State
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center 
        bg-gradient-to-br from-[#0A1930] via-[#0E2550] to-[#162A60] text-white">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
        <p className="text-xl font-semibold text-blue-300">Initializing Progress...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1930] via-[#0E2550] to-[#162A60] text-white p-4 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Study Vault 🚀
          </motion.h1>
          <p className="text-xl text-blue-200">Curated resources to accelerate your journey.</p>
        </header>

        {/* Progress Bar Section */}
        <ProgressBar completedCount={completedCount} totalCount={totalCount} />

        {/* Controls Section: Search Bar and Reset Button */}
        <section className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
            <input
              type="text"
              placeholder="Search materials by title, description, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>

          {/* Reset Progress Button */}
          <motion.button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all your study progress? This cannot be undone.')) {
                resetProgress();
              }
            }}
            className="flex items-center justify-center px-6 py-3 bg-red-600/80 hover:bg-red-700 rounded-xl font-semibold text-white shadow-lg transition-colors duration-300 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Progress
          </motion.button>
        </section>

        {/* Materials Grid/List */}
        <section>
          {filteredMaterials.length === 0 ? (
            // Empty State
            <motion.div
              className="p-12 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl text-center border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Frown className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
              <p className="text-xl font-bold text-yellow-200">No Materials Found</p>
              <p className="text-gray-300">Try adjusting your search query.</p>
            </motion.div>
          ) : (
            // Materials Grid
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filteredMaterials.map((material) => (
                  <motion.div
                    key={material.id}
                    layout // Enables smooth transitions when materials are filtered
                    transition={{ type: 'spring', stiffness: 70, damping: 10 }}
                  >
                    <MaterialCard
                      material={material}
                      isCompleted={progress[material.id] ?? false}
                      onToggle={toggleCompletion}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;