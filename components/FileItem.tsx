import { FileText, Download } from 'lucide-react';
import { CourseFile } from './types/index';

interface FileItemProps {
  file: CourseFile;
  onPreview: (file: CourseFile) => void;
}

export const FileItem = ({ file, onPreview }: FileItemProps) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(file.file_url, '_blank');
  };

  const handleClick = () => {
    if (file.file_type === 'PDF') {
      onPreview(file);
    } else {
      window.open(file.file_url, '_blank');
    }
  };

 

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer group border border-gray-200 hover:border-blue-300 hover:shadow-sm"
    >
   
      <div className="flex items-center space-x-3 flex-1 min-w-0">

      <div className="text-gray-500 font-mono mr-3">.</div> 
        <div
          className={`p-2 rounded-lg ${
            file.file_type === 'PDF'
              ? 'bg-red-100 text-red-600'
              : 'bg-blue-100 text-blue-600'
          }`}
        >
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
            {file.filename}
          </p>
          <p className="text-xs text-gray-500">{file.file_type}</p>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
        title="Download"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
};
