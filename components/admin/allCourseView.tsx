import React from 'react';
import { Briefcase, HardHat, Users } from 'lucide-react';


interface Course {
  id: number;
  name: string;
  code: string;
  duration: string;
  professor: string;
  studentsCount: number;
  image: string;
}


const initialCourseList: Course[] = [
  { id: 1, name: 'When is the Best Time to Take an Education Course?', code: 'EC001', duration: '12 Months', professor: 'Jack Ronan', studentsCount: 450, image: 'https://placehold.co/400x200/007bff/ffffff?text=Course+1' },
  { id: 2, name: 'Education Courses: A Guide to Unlocking Your Potential', code: 'EC002', duration: '12 Months', professor: 'Jimmy Morris', studentsCount: 210, image: 'https://placehold.co/400x200/28a745/ffffff?text=Course+2' },
  { id: 3, name: 'A Comprehensive Guide to Taking an Education Course', code: 'EC003', duration: '12 Months', professor: 'Konne Backfield', studentsCount: 115, image: 'https://placehold.co/400x200/ffc107/333333?text=Course+3' },
];






const AllCoursesView: React.FC<{ data: typeof initialCourseList }> = ({ data }) => (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
            <img src={course.image} alt={course.name} className="w-full h-40 object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/400x200/4f46e5/ffffff?text=${course.code}` }} />
            <div className="p-5">
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{course.name}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center"><Briefcase className="w-4 h-4 mr-2" /> Duration: <span className="font-medium ml-1">{course.duration}</span></p>
                <p className="flex items-center"><HardHat className="w-4 h-4 mr-2" /> Professor: <span className="font-medium ml-1">{course.professor}</span></p>
                <p className="flex items-center"><Users className="w-4 h-4 mr-2" /> Students: <span className="font-medium ml-1">{course.studentsCount}</span></p>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">Edit</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


export default AllCoursesView;