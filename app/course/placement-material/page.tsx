
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import dynamic from 'next/dynamic';
// import { FileText, FileCheck, FileCode, FolderDot, Loader2 } from 'lucide-react';

// interface FileItemType {
//   name: string;
//   url: string;
//   format: string;
// }

// // Dynamically import FilePreview to avoid SSR issues
// const FilePreview = dynamic(() => import('@/components/filepreview'), { ssr: false });

// // Map file format to icon
// const getFileIcon = (format: string) => {
//   switch (format.toLowerCase()) {
//     case 'pdf':
//       return <FileText className="text-red-500 w-6 h-6" />;
//     case 'docx':
//     case 'doc':
//       return <FileCheck className="text-blue-500 w-6 h-6" />;
//     case 'txt':
//     case 'md':
//       return <FileCode className="text-yellow-500 w-6 h-6" />;
//     default:
//       return <FolderDot className="text-gray-500 w-6 h-6" />;
//   }
// };

// // FileItem Component
// const FileItem = ({ file }: { file: FileItemType }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [loadingPreview, setLoadingPreview] = useState(false);
//   const icon = getFileIcon(file.format);

//   useEffect(() => {
//     document.body.style.overflow = previewOpen ? 'hidden' : 'auto';
//   }, [previewOpen]);

//   const handlePreviewClick = () => {
//     setLoadingPreview(true);
//     setPreviewOpen(true);
//   };

//   const handlePreviewLoad = () => {
//     setLoadingPreview(false);
//   };

//   return (
//     <>
//       <div className="flex items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
//         <div className="mr-4 flex-shrink-0">{icon}</div>
//         <div className="flex-grow">
//           <p className="font-semibold text-gray-800 truncate">{file.name}</p>
//           <span className="text-sm text-gray-500 uppercase">{file.format} File</span>
//         </div>
//         <button
//           onClick={handlePreviewClick}
//           className="ml-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md flex items-center flex-shrink-0"
//         >
//           {loadingPreview && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
//           Preview
//         </button>
//       </div>

//       {previewOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start overflow-auto p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl mt-12 relative">
//             <button
//               onClick={() => setPreviewOpen(false)}
//               className="absolute top-4 right-4 text-red-500 font-bold text-2xl"
//             >
//               ×
//             </button>
//             <FilePreview
//               name={file.name}
//               format={file.format}
//               url={file.url}
//               onLoad={handlePreviewLoad}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// // Page Component
// export default function Page() {
//   const [files, setFiles] = useState<FileItemType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchFiles = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('/api/cloudinary/interview-pre');
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       if (data && Array.isArray(data.files)) setFiles(data.files);
//       else throw new Error('Invalid response format');
//       setError(null);
//     } catch (err: any) {
//       console.error(err);
//       setError(`Failed to load files. ${err.message}`);
//       setFiles([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchFiles();
//   }, [fetchFiles]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-8 p-6 bg-white rounded-2xl shadow-xl">
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-800 mb-2">
//             Interview Resources Hub
//           </h1>
//           <p className="text-gray-600">
//             Access your important documents and study materials below.
//           </p>
//         </header>

//         <section className="space-y-4">
//           {loading ? (
//             <div className="flex justify-center items-center p-12 bg-white rounded-xl shadow-lg">
//               <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mr-3" />
//               <p className="text-lg font-medium text-indigo-600">Loading resources...</p>
//             </div>
//           ) : error ? (
//             <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
//               <p className="font-bold">Error:</p>
//               <p>{error}</p>
//             </div>
//           ) : files.length === 0 ? (
//             <div className="p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-md">
//               <p className="font-bold">No Files Found</p>
//               <p>The server returned an empty list of resources.</p>
//             </div>
//           ) : (
//             files.map((file, idx) => <FileItem key={idx} file={file} />)
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { FileText, FileCheck, FileCode, FolderDot, Loader2 } from 'lucide-react';

interface FileItemType {
  name: string;
  url: string;
  format: string;
}

// Dynamic import for SSR-safe FilePreview
const FilePreview = dynamic(() => import('@/components/filepreview'), { ssr: false });

const getFileIcon = (format: string) => {
  switch (format.toLowerCase()) {
    case 'pdf':
      return <FileText className="text-red-500 w-8 h-8" />;
    case 'doc':
    case 'docx':
      return <FileCheck className="text-blue-500 w-8 h-8" />;
    case 'txt':
    case 'md':
      return <FileCode className="text-yellow-500 w-8 h-8" />;
    default:
      return <FolderDot className="text-gray-400 w-8 h-8" />;
  }
};

const FileItem = ({ file }: { file: FileItemType }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const icon = getFileIcon(file.format);

  useEffect(() => {
    document.body.style.overflow = previewOpen ? 'hidden' : 'auto';
  }, [previewOpen]);

  const handlePreviewClick = () => {
    setLoadingPreview(true);
    setPreviewOpen(true);
  };

  const handlePreviewLoad = () => setLoadingPreview(false);

  return (
    <>
      <div className="flex items-center p-5 bg-gradient-to-r from-white to-indigo-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group">
        <div className="mr-4 flex-shrink-0">{icon}</div>
        <div className="flex-grow">
          <p className="font-semibold text-gray-800 group-hover:text-indigo-700 truncate">{file.name}</p>
          <span className="text-sm text-gray-500 uppercase">{file.format} File</span>
        </div>
        <button
          onClick={handlePreviewClick}
          className="ml-4 px-5 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-md flex items-center transition duration-300"
        >
          {loadingPreview && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
          Preview
        </button>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-start overflow-auto p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mt-16 relative animate-fadeIn">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-5 right-5 text-red-500 font-bold text-3xl hover:text-red-600 transition"
            >
              ×
            </button>
            <FilePreview name={file.name} format={file.format} url={file.url} onLoad={handlePreviewLoad} />
          </div>
        </div>
      )}
    </>
  );
};

export default function Page() {
  const [files, setFiles] = useState<FileItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cloudinary/interview-pre');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data && Array.isArray(data.files)) setFiles(data.files);
      else throw new Error('Invalid response format');
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to load files. ${err.message}`);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 p-8 bg-indigo-50 rounded-3xl shadow-xl text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-3 animate-slideIn">
            Interview Resources Hub
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl">
            Access your important documents and study materials below.
          </p>
        </header>

        <section className="space-y-5">
          {loading ? (
            <div className="flex flex-col justify-center items-center p-12 bg-white rounded-2xl shadow-lg animate-pulse">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-3" />
              <p className="text-lg font-semibold text-indigo-600">Loading resources...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-2xl shadow-md">
              <p className="font-bold text-lg">Error</p>
              <p>{error}</p>
            </div>
          ) : files.length === 0 ? (
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-2xl shadow-md">
              <p className="font-bold text-lg">No Files Found</p>
              <p>The server returned an empty list of resources.</p>
            </div>
          ) : (
            files.map((file, idx) => <FileItem key={idx} file={file} />)
          )}
        </section>
      </div>
    </div>
  );
}

