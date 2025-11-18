export interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  last_activity: string;
  description: string;
  created_at: string;
}

export interface CourseFile {
  id: string;
  course_id: string;
  filename: string;
  file_type: 'PDF' | 'DOCX';
  file_url: string;
  created_at: string;
}

export interface CourseWithFiles extends Course {
  files: CourseFile[];
}
