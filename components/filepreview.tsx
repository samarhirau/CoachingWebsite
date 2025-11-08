// 'use client';

// import React, { useState } from 'react';

// interface FilePreviewProps {
//   name: string;
//   url: string;   // Direct URL to file
//   format: string; // 'pdf', 'docx', 'doc', etc.
// }

// const FilePreview: React.FC<FilePreviewProps> = ({ name, url, format }) => {
//   const [error, setError] = useState<string | null>(null);

//   const renderPreview = () => {
//     const ext = format.toLowerCase();

//     if (ext === 'pdf') {
//       return (
//         <iframe
//           src={url}
//           title={name}
//           className="w-full h-[600px] border rounded"
//         />
//       );
//     }

//     if (ext === 'docx' || ext === 'doc') {
//       // Use Google Docs Viewer to preview Word files
//       const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
//         url
//       )}&embedded=true`;

//       return (
//         <iframe
//           src={viewerUrl}
//           title={name}
//           className="w-full h-[600px] border rounded"
//         />
//       );
//     }

//     return <p className="text-red-600">Preview not available for {format.toUpperCase()} files.</p>;
//   };

//   return (
//     <div className="p-4">
//       <h4 className="font-semibold mb-2">{name}</h4>
//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {renderPreview()}
//     </div>
//   );
// };

// export default FilePreview;



'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react'; // Using lucide-react spinner icon

interface FilePreviewProps {
  name: string;
  url: string;
  format: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ name, url, format }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError('Failed to load the file.');
  };

  const renderPreview = () => {
    const ext = format.toLowerCase();

    if (ext === 'pdf') {
      return (
        <iframe
          src={url}
          title={name}
          className="w-full h-[600px] border rounded"
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    }

    if (ext === 'docx' || ext === 'doc') {
      const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
        url
      )}&embedded=true`;

      return (
        <iframe
          src={viewerUrl}
          title={name}
          className="w-full h-[600px] border rounded"
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    }

    return <p className="text-red-600">Preview not available for {format.toUpperCase()} files.</p>;
  };

  return (
    <div className="p-4 relative">
      <h4 className="font-semibold mb-2">{name}</h4>

      {loading && (
        <div className="flex items-center justify-center h-[600px]">
          <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
        </div>
      )}

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {!error && renderPreview()}
    </div>
  );
};

export default FilePreview;

