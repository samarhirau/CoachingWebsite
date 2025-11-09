'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FileText, FileCheck, FileCode, FolderDot, Loader2 } from 'lucide-react';

interface FileItemType {
  name: string;
  url: string;
  format: string;
}

const FilePreview = dynamic(() => import('@/components/filepreview'), { ssr: false });

const getFileIcon = (format: string) => {
  switch (format.toLowerCase()) {
    case 'pdf':
      return <FileText className="text-red-400 w-8 h-8" />;
    case 'doc':
    case 'docx':
      return <FileCheck className="text-blue-300 w-8 h-8" />;
    case 'txt':
    case 'md':
      return <FileCode className="text-yellow-400 w-8 h-8" />;
    default:
      return <FolderDot className="text-gray-300 w-8 h-8" />;
  }
};

export default function FileItem({ file }: { file: FileItemType }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const icon = getFileIcon(file.format);

  useEffect(() => {
    document.body.style.overflow = previewOpen ? 'hidden' : 'auto';
  }, [previewOpen]);

  const handlePreviewClick = () => {
    setLoadingPreview(true);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(timer);
          return 90;
        }
        return p + 10;
      });
    }, 200);
    setPreviewOpen(true);
  };

  const handlePreviewLoad = () => {
    setProgress(100);
    setLoadingPreview(false);
    setTimeout(() => setProgress(0), 1000);
  };

  return (
    <>
      <div className="flex items-center p-5 bg-gradient-to-r from-[#112850] to-[#193a70] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-[#204080]/40">
        <div className="mr-4 flex-shrink-0">{icon}</div>
        <div className="flex-grow">
          <p className="font-semibold text-blue-100 group-hover:text-blue-300 truncate">{file.name}</p>
          <span className="text-sm text-gray-400 uppercase">{file.format} File</span>
        </div>
        <button
          onClick={handlePreviewClick}
          className="ml-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center shadow-md transition duration-300"
        >
          {loadingPreview && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
          Preview
        </button>
      </div>

      {loadingPreview && progress > 0 && progress < 100 && (
        <div className="w-full bg-[#0a1930] h-1 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-1 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-start overflow-auto p-6">
          <div className="bg-[#0d1d3a] rounded-3xl shadow-2xl w-full max-w-6xl mt-16 relative animate-fadeIn border border-blue-900">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-5 right-5 text-red-400 font-bold text-3xl hover:text-red-500 transition"
            >
              ×
            </button>
            <FilePreview name={file.name} format={file.format} url={file.url} onLoad={handlePreviewLoad} />
          </div>
        </div>
      )}
    </>
  );
}
