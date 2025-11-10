// components/FilePreviewModal.tsx
'use client';
import { X, FileText, Download, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileItemType {
  name: string;
  url: string;
  format: string;
}

interface FilePreviewModalProps {
  file: FileItemType;
  onClose: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {

  const renderContent = () => {
    const format = file.format.toLowerCase();
    
    // --- PDF Preview (Using iframe) ---
    if (format === 'pdf') {
      return (
        <iframe 
          src={file.url} 
          title={file.name} 
          className="w-full h-full border-none rounded-lg"
          allowFullScreen
        />
      );
    }
    
    // --- DOCX/Unsupported File Handler ---
    if (format === 'docx' || format === 'doc') {
      return (
        <div className="p-8 text-center bg-[#0a1930] rounded-lg h-full flex flex-col items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Browser Preview Not Supported</h3>
          <p className="text-blue-200 mb-6">
            Direct viewing of **.{format.toUpperCase()}** files in the browser requires external services.
            Please download the file to view its content.
          </p>
          <a
            href={file.url}
            download
            className="flex items-center space-x-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition duration-200"
            onClick={onClose}
          >
            <Download className="w-5 h-5" />
            <span>Download {file.name}</span>
          </a>
        </div>
      );
    }

    // --- Other File Types (Simple Placeholder) ---
    return (
      <div className="p-8 text-center bg-[#0a1930] rounded-lg h-full flex flex-col items-center justify-center">
        <FileText className="w-12 h-12 text-blue-400 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Generic File Preview</h3>
        <p className="text-blue-200 mb-6">
          Showing content for: **{file.name}**
        </p>
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition duration-200"
        >
          <Download className="w-5 h-5" />
          <span>Open in New Tab</span>
        </a>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-5xl h-5/6 bg-[#1a3a6e] rounded-xl shadow-2xl flex flex-col"
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
        >
          {/* Header */}
          <div className="p-4 border-b border-[#2b5496] flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-300 truncate">
              Preview: {file.name}
            </h2>
            <button 
                onClick={onClose}
                className="p-2 rounded-full bg-blue-600/30 hover:bg-blue-600 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Content Area */}
          <div className="flex-grow p-4 overflow-y-auto">
            {renderContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePreviewModal;