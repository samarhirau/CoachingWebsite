import { Clock, FolderOpen } from 'lucide-react';
import { CourseWithFiles } from '../types/index';
import { FileItem } from '@/components/FileItem';
import { CourseFile } from '../types/index';

interface CourseCardProps {
  course: CourseWithFiles;
  onPreviewFile: (file: CourseFile) => void;
}

const categoryColors: Record<string, string> = {
  Programming: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Design: 'bg-pink-100 text-pink-700 border-pink-200',
  'Data Science': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Marketing: 'bg-orange-100 text-orange-700 border-orange-200',
  Business: 'bg-slate-100 text-slate-700 border-slate-200',
};

export const CourseCard = ({ course, onPreviewFile }: CourseCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
            {course.title}
          </h3>
        </div>

        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getCategoryColor(
            course.category
          )}`}
        >
          {course.category}
        </span>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Progress</span>
            <span className="text-xs font-bold text-blue-600">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          <span>Last activity: {formatDate(course.last_activity)}</span>
        </div>

        <div className="mt-auto">
          {course.files && course.files.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FolderOpen className="w-4 h-4 mr-2 text-blue-600" />
                Files ({course.files.length})
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {course.files.map((file) => (
                  <FileItem key={file.id} file={file} onPreview={onPreviewFile} />
                ))}
              </div>
            </div>
          )}

          {(!course.files || course.files.length === 0) && (
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-400 text-center py-2">No files available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
