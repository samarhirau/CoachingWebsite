import { X, Download, ExternalLink } from "lucide-react";
import { CourseFile } from "./types/index";
import { useEffect } from "react";

interface DocxPreviewModalProps {
  file: CourseFile | null;
  onClose: () => void;
}

export const DocxPreviewModal = ({ file, onClose }: DocxPreviewModalProps) => {
  useEffect(() => {
    document.body.style.overflow = file ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [file]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (file) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [file, onClose]);

  if (!file) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const iframeSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file.file_url)}`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ExternalLink className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 truncate">{file.filename}</h3>
              <p className="text-sm text-gray-500">DOCX Document</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => window.open(file.file_url, "_blank")}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-gray-50">
          <iframe src={iframeSrc} className="w-full h-full border-0" title={file.filename} />
        </div>
      </div>
    </div>
  );
};
