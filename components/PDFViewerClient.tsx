import { X, Download, ExternalLink } from 'lucide-react';
import { CourseFile } from './types/index';
import { useEffect } from 'react';

interface PDFPreviewModalProps {
  file: CourseFile | null;
  onClose: () => void;
}

export const PDFPreviewModal = ({ file, onClose }: PDFPreviewModalProps) => {
  useEffect(() => {
    if (file) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [file]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (file) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [file, onClose]);

  if (!file) return null;

  const handleDownload = () => {
    window.open(file.file_url, '_blank');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col animate-slideUp">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-red-100 rounded-lg">
              <ExternalLink className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {file.filename}
              </h3>
              <p className="text-sm text-gray-500">{file.file_type} Document</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-gray-50">
          <iframe
            src={file.file_url}
            className="w-full h-full border-0"
            title={file.filename}
          />
        </div>
      </div>
    </div>
  );
};
