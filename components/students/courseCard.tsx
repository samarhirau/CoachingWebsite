"use client";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, Users, Star, CheckCircle, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Module {
  name: string;
  completed?: boolean;
}

interface Course {
  title: string;
  slug: string;
  description?: string;
  duration: string;
  type?: string | "Free";
  progress?: number;
  status?: "In Progress" | "Completed" | "Not Started";
  popular?: boolean;
  enrollments?: number;
  rating?: number;
  modules?: Module[];
}

interface CourseCardStudentProps {
  course: Course;
}

const CourseCardStudent: React.FC<CourseCardStudentProps> = ({ course }) => {
  const isCompleted = course.status === "Completed";

  const modules = (course.modules || []).map((module) => ({
    ...module,
    completed: module.completed ?? Math.random() > 0.5,
  }));

  return (
    <Card className="relative hover:shadow-xl transition-shadow rounded-2xl border border-gray-100 overflow-hidden">
      {/* Popular Badge */}
      {course.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs">
          Most Popular
        </Badge>
      )}

      {/* Card Header */}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          {course.type && <Badge variant="secondary">{course.type}</Badge>}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" /> {course.duration}
          </div>
        </div>

        <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
        {course.description && (
          <CardDescription className="text-gray-600 text-sm">{course.description}</CardDescription>
        )}
      </CardHeader>

      {/* Card Content */}
      <CardContent className="space-y-4">
        {/* Enrollments & Rating */}
        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-indigo-500" /> {course.enrollments || 0}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-400" /> {course.rating || 0}
          </div>
        </div>

        {/* Progress Bar */}
        {(course.status === "In Progress" || isCompleted) && (
          <div>
            <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
              <span>{course.status}</span>
              <span>{course.progress || 0}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div
                className={`h-full rounded-full ${isCompleted ? "bg-green-500" : "bg-indigo-500"}`}
                style={{ width: `${course.progress || 0}%`, transition: "width 0.5s ease-in-out" }}
              />
            </div>
          </div>
        )}

        {/* Modules List */}
        {modules.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Modules:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {modules.map((module, i) => (
                <li key={i} className="flex items-center gap-2">
                  {module.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  )}
                  {module.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <Button
          className={`w-full flex items-center justify-center gap-2 mt-2 ${
            isCompleted ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white`}
        >
          <Link
            href={`/course/${course.slug}`}
            className="flex items-center gap-2 w-full justify-center"
          >
            {isCompleted ? "View Certificate" : "Continue Course"}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCardStudent;
