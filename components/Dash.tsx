"use client";

import { useState, useEffect } from "react";
import { Search, AlertCircle } from "lucide-react";
import { CourseWithFiles, CourseFile } from "./types/index";
import { FileItem } from "./FileItem";
import { SkeletonLoader } from "./SkeltonLoading";
import { PDFPreviewModal } from "./FilePreviewModal";

interface DashboardProps {
  slug: string;
}

export const Dashboard = ({ slug }: DashboardProps) => {
  const [courses, setCourses] = useState<CourseWithFiles[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseWithFiles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [previewFile, setPreviewFile] = useState<CourseFile | null>(null);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/cloudinary/${slug}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();

      if (Array.isArray(data?.files)) {
        const course: CourseWithFiles = {
          id: slug,
          title: "All Resources",
          description: `Found ${data.files.length} resources`,
          category: "All",
          progress: 0,
          last_activity: new Date().toISOString(),
          files: data.files.map((f: any, index: number) => ({
            id: index.toString(),
            filename: f.name,
            file_type: f.format.toUpperCase(),
            file_url: f.url,
          })),
        };

        setCourses([course]);
      } else {
        setCourses([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [slug]);

  useEffect(() => {
    let filtered = courses;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedCategory]);

  const handlePreviewFile = (file: CourseFile) => setPreviewFile(file);
  const handleClosePreview = () => setPreviewFile(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <SkeletonLoader />}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-1">Error Loading Courses</h3>
              <p className="text-red-700">{error}</p>
              <button
                onClick={loadCourses}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && filteredCourses.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Courses Found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your search or filter criteria"
                : "No courses available at the moment"}
            </p>
          </div>
        )}

        {!loading && !error && filteredCourses.length > 0 && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredCourses.length} of {courses.length} course
              {courses.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) =>
                course.files!.map((file) => (
                  <FileItem key={file.id} file={file} onPreview={handlePreviewFile} />
                ))
              )}
            </div>
          </>
        )}
      </div>

      <PDFPreviewModal file={previewFile} onClose={handleClosePreview} />
    </div>
  );
};
