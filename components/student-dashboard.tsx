"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  CheckCircle,
  Star,
  MessageSquare,
  Download,
  Bell,
  Users,
  ArrowRight,
  ShieldCheck,
  Zap,
  Loader2,
  LogOut,
} from 'lucide-react';
import { ModernNavigation } from './modern-navigation';
import { useAuth } from '@/components/auth-provider';

import Link from 'next/link';
import router from 'next/router';
import LogoutConfirmation from '@/components/logout-btn';


// --- Global Constants (Mock Data) ---

// Mock Data for Assignments - Now with sequential IDs
const MOCK_ASSIGNMENTS = [
    { id: "a1", title: "Build a Todo App", dueDate: "Jan 24, 2025", status: "pending", difficulty: "Medium", progress: 0, submissionContent: null },
    { id: "a2", title: "Create REST API", dueDate: "Jan 28, 2025", status: "pending", difficulty: "Hard", progress: 0, submissionContent: null },
    { id: "a3", title: "Portfolio Website", dueDate: "Jan 18, 2025", status: "completed", difficulty: "Easy", progress: 100, score: "92%", submissionContent: "Initial commit of portfolio website." },
];

const STUDENT_DATA = {
    name: "Rahul Sharma",
    course: "Full Stack Web Development",
    batch: "Batch 2024-A",
    progress: 68,
    completedModules: 8,
    totalModules: 12,
    nextClass: "React Hooks Deep Dive",
    nextClassTime: "Tomorrow, 10:00 AM",
};

const RECENT_ACTIVITIES = [
    { type: "completed", title: "JavaScript Fundamentals", time: "2 hours ago" },
    { type: "assignment", title: "React Component Assignment", time: "1 day ago" },
    { type: "quiz", title: "HTML/CSS Quiz", score: "95%", time: "3 days ago" },
    { type: "project", title: "Portfolio Website", time: "1 week ago" },
];


interface Course {
  _id: string;
  title: string;
  status?: string;
  price?: number;
  originalPrice?: number;
  duration?: string;
  features?: string[];
  rating?: number,
}





// --- UTILITY COMPONENTS (Tailwind styled mocks for shadcn/ui) ---

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-5 border-b border-gray-100">
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>{children}</h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = 'default', size = 'default', onClick, className = '', disabled }) => {
    let baseStyle = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed";
    let sizeStyle = size === 'sm' ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base";
    let colorStyle = "";

    switch (variant) {
        case 'outline':
            colorStyle = "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
            break;
        case 'destructive':
            colorStyle = "bg-red-600 text-white hover:bg-red-700";
            break;
        case 'success':
            colorStyle = "bg-green-600 text-white hover:bg-green-700";
            break;
        default: // default/primary
            colorStyle = "bg-indigo-600 text-white hover:bg-indigo-700";
            if (className.includes('gradient-primary')) {
                 colorStyle = "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700";
            }
            break;
    }
    return (
        <button className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

const Badge = ({ children, variant = 'default', className = '' }) => {
    let colorStyle = "";
    switch (variant) {
        case 'secondary':
            colorStyle = "bg-gray-100 text-gray-600";
            break;
        case 'destructive':
            colorStyle = "bg-red-100 text-red-600";
            break;
        case 'success':
            colorStyle = "bg-green-100 text-green-600";
            break;
        case 'warning':
            colorStyle = "bg-yellow-100 text-yellow-600";
            break;
        default: // default/primary
            colorStyle = "bg-indigo-100 text-indigo-600";
            break;
    }
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorStyle} ${className}`}>
            {children}
        </span>
    );
};

const Progress = ({ value, className = '', indicatorClassName = 'bg-indigo-600' }) => (
    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
        <div
            className={`h-full transition-all duration-500 ${indicatorClassName}`}
            style={{ width: `${value}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin="0"
            aria-valuemax="100"
        ></div>
    </div>
);

// --- ASSIGNMENT SUBMISSION MODAL ---

const SubmissionModal = ({ assignment, onClose, onSubmit }) => {
    const [submissionContent, setSubmissionContent] = useState(assignment.submissionContent || '');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        await onSubmit(assignment.id, submissionContent);
        setIsLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Submit: {assignment.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-500">
                        {assignment.status === 'in-progress' 
                            ? "Complete your work and submit the description below."
                            : "Review or update your submission content."
                        }
                    </p>
                    <textarea
                        value={submissionContent}
                        onChange={(e) => setSubmissionContent(e.target.value)}
                        placeholder="Paste your code link, repository URL, or a summary of your work here..."
                        rows="6"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    ></textarea>
                    
                    <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSubmit} 
                            disabled={isLoading || !submissionContent.trim()}
                            className="gradient-primary"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <CheckCircle className="mr-2 h-4 w-4" />
                            )}
                            {assignment.status === 'submitted' ? 'Update Submission' : 'Submit Assignment'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


// --- ASSIGNMENTS TAB COMPONENT ---

const AssignmentsTab = ({ assignments, updateAssignment }) => {
    const [modalAssignment, setModalAssignment] = useState(null);

    const openSubmissionModal = (assignment) => {
        setModalAssignment(assignment);
    };
    
    // Functions updated to use the updateAssignment prop (local state setter)
    const startAssignment = useCallback(async (id) => {
        updateAssignment(id, {
            status: 'in-progress',
            progress: 5, // Start with a small percentage
        });
    }, [updateAssignment]);

    const mockWorkAndProgress = useCallback(async (id) => {
        const assignment = assignments.find(a => a.id === id);
        if (!assignment || assignment.status !== 'in-progress') return;

        const newProgress = Math.min(95, assignment.progress + 10);
        updateAssignment(id, {
            progress: newProgress,
        });
    }, [assignments, updateAssignment]);

    const submitAssignment = useCallback(async (id, content) => {
        updateAssignment(id, {
            status: 'submitted',
            progress: 100, // Submission implies completion
            submissionContent: content,
        });
    }, [updateAssignment]);

    // Since we removed Firebase, data is always "loaded" immediately
    const isLoadingData = false; 

    if (isLoadingData) {
        return (
            <div className="flex items-center justify-center p-12 text-gray-500">
                <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                Loading assignments...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">My Assignments ({assignments.filter(a => a.status !== 'completed').length} Pending)</h2>
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download All Instructions
                </Button>
            </div>

            <div className="grid gap-4">
                {assignments.map((assignment) => {
                    let actionButton;

                    switch (assignment.status) {
                        case 'completed':
                            actionButton = <Button variant="outline" size="sm" onClick={() => openSubmissionModal(assignment)}>View Score</Button>;
                            break;
                        case 'submitted':
                            actionButton = <Button size="sm" onClick={() => openSubmissionModal(assignment)} className="bg-blue-500 hover:bg-blue-600">Review</Button>;
                            break;
                        case 'in-progress':
                            actionButton = (
                                <div className="flex space-x-2">
                                    <Button size="sm" variant="success" onClick={() => mockWorkAndProgress(assignment.id)}>
                                        Continue Work ({assignment.progress}%)
                                    </Button>
                                    <Button size="sm" onClick={() => openSubmissionModal(assignment)} className="gradient-primary">
                                        Submit
                                    </Button>
                                </div>
                            );
                            break;
                        case 'pending':
                        default:
                            actionButton = <Button size="sm" onClick={() => startAssignment(assignment.id)} className="gradient-primary"><Play className="h-4 w-4 mr-2"/>Start</Button>;
                            break;
                    }

                    return (
                        <Card key={assignment.id} className="hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div
                                            className={`p-3 rounded-lg text-white ${assignment.status === 'completed' ? 'bg-green-600' : assignment.status === 'submitted' ? 'bg-blue-600' : assignment.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'}`}
                                        >
                                            {assignment.status === 'completed' ? <CheckCircle className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-lg truncate">{assignment.title}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                                <span>Due: {assignment.dueDate}</span>
                                                <Badge variant={assignment.difficulty === "Easy" ? "secondary" : assignment.difficulty === "Medium" ? "default" : "destructive"}>
                                                    {assignment.difficulty}
                                                </Badge>
                                                {assignment.status !== 'completed' && assignment.status !== 'pending' && (
                                                    <div className="flex items-center gap-2">
                                                        <Progress value={assignment.progress} className="w-24 h-2" indicatorClassName="bg-indigo-500" />
                                                        <span className="font-medium text-indigo-600">{assignment.progress}%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {assignment.score && (
                                            <div className="text-right pr-4 border-r border-gray-200">
                                                <div className="font-bold text-green-600 text-xl">{assignment.score}</div>
                                                <div className="text-xs text-gray-500">Score</div>
                                            </div>
                                        )}
                                        {actionButton}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {modalAssignment && (
                <SubmissionModal
                    assignment={modalAssignment}
                    onClose={() => setModalAssignment(null)}
                    onSubmit={submitAssignment}
                />
            )}
        </div>
    );
};


// --- OTHER TABS (Simplified/Combined) ---

const OverviewTab = () => {
    const progressText = `${STUDENT_DATA.completedModules} of ${STUDENT_DATA.totalModules} Modules`;
    
    // Removed userId display as authentication is removed.
    
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50/50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">{STUDENT_DATA.progress}%</div>
                      <div className="text-sm text-gray-500">Course Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{STUDENT_DATA.completedModules}</div>
                      <div className="text-sm text-gray-500">{progressText}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-50/50 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-sm text-gray-500">Hours This Week</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50/50 rounded-lg">
                      <Trophy className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">A+</div>
                      <div className="text-sm text-gray-500">Current Grade</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Next Class */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    Next Class
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-indigo-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-lg">{STUDENT_DATA.nextClass}</h3>
                        <p className="text-sm text-gray-600">{STUDENT_DATA.nextClassTime}</p>
                      </div>
                      <Button className="gradient-primary mt-3 sm:mt-0">
                        <Play className="h-4 w-4 mr-2" />
                        Join Class
                      </Button>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="font-medium text-gray-700">Recent Activity</h4>
                      {RECENT_ACTIVITIES.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 py-2 border-b last:border-0">
                          <div
                            className={`p-1.5 rounded-full ${
                              activity.type === "completed"
                                ? "bg-green-100 text-green-600"
                                : activity.type === "quiz"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-indigo-100 text-indigo-600"
                            }`}
                          >
                            {activity.type === "completed" ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : activity.type === "quiz" ? (
                              <Star className="h-3 w-3" />
                            ) : (
                              <BookOpen className="h-3 w-3" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-800">{activity.title}</div>
                            <div className="text-xs text-gray-500">
                              {activity.score && `Score: ${activity.score} • `}
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Module Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-gray-800">{STUDENT_DATA.completedModules} / {STUDENT_DATA.totalModules}</div>
                    <Progress value={STUDENT_DATA.progress} className="h-4" indicatorClassName="bg-green-500" />
                    <p className="text-sm text-gray-500 mt-2">You are {STUDENT_DATA.progress}% through the course.</p>
                    <Button variant="outline" className="w-full mt-3">View Detailed Report</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
        </div>
    );
};

// Course Card Component based on Screenshot (83).png
const CourseCard = ({ course }) => {
    let buttonText, buttonVariant, buttonIcon, progressColor, topBorderColor;

    switch (course.status) {
        case "In Progress":
            buttonText = "Continue Course";
            buttonVariant = "default";
            buttonIcon = <Play className="h-4 w-4 mr-2" />;
            progressColor = "bg-indigo-600";
            topBorderColor = "border-t-4 border-indigo-600";
            break;
        case "Completed":
            buttonText = "View Certificate";
            buttonVariant = "outline";
            buttonIcon = <ShieldCheck className="h-4 w-4 mr-2" />;
            progressColor = "bg-green-600";
            topBorderColor = "border-t-4 border-green-600";
            break;
        case "Not Started":
        default:
            buttonText = course.price !== "N/A" ? "Enroll Now" : "Start Course";
            buttonVariant = "default";
            buttonIcon = <ArrowRight className="h-4 w-4 ml-2" />;
            progressColor = "bg-gray-300";
            topBorderColor = "border-t-4 border-gray-300";
            break;
    }

    const enrollButtonClass = course.status === "Not Started" 
        ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white" 
        : "";

    return (
        <Card className={`shadow-xl hover:shadow-2xl transition-shadow duration-300 ${topBorderColor}`}>
            <CardContent className="p-6 space-y-4">
               
                <h3 className="text-xl font-bold min-h-[3rem] text-gray-800">{course.title}</h3>

                {/* Meta Info: Duration, Enrollment, Rating */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-indigo-500" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-indigo-500" />
                        <span>{course.enrollments} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{course.rating}</span>
                    </div>
                </div>

                <hr className="my-3 border-t border-gray-100" />

                {/* What You'll Learn Section */}
        
<div>
  <h4 className="font-semibold mb-2 text-gray-700">What you'll learn:</h4>
  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
    {(course.features || []).map((item, index) => (
      <li key={index} className="flex items-center gap-2 text-gray-500">
        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
</div>


                <div className="pt-4">
                    {/* Progress Bar for enrolled courses */}
                    {(course.status === "In Progress" || course.status === "Completed") && (
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1 text-sm font-medium">
                                <span className="font-semibold">{course.status}</span>
                                <span className={`font-bold ${course.status === "In Progress" ? "text-indigo-600" : "text-green-600"}`}>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" indicatorClassName={progressColor} />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        {/* Primary Action Button */}
                        <Button 
                            className={enrollButtonClass}
                            variant={buttonVariant}
                        >
                          <Link href='/overview'>
                            {buttonIcon}
                            {buttonText}
                            </Link>
                        </Button>

                        {/* Secondary 'Learn More' Button */}
                          <Button  variant="outline" className="flex-1 bg-transparent">
                      <Link href={`/courses/${course.slug}`}>Learn More</Link>
                    </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};



const MyCoursesTab = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) return

    const fetchCourses = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/enrollments?studentId=${user._id}`, {
          credentials: "include",
        })
        const data = await res.json()
        console.log("Fetched enrollments:", data)

        if (!res.ok) throw new Error(data?.error || "Failed to fetch courses")

        const enrolledCourses: Course[] = data.enrollments.map((e: any) => ({
          _id: e.course._id,
          slug : e.course.slug,
          title: e.course.title,
          status: e.course.status || "In Progress",
          price: e.course.price,
          originalPrice: e.course.originalPrice,
          duration: e.course.duration,
          features: e.course.features,
          enrollments: e.course.enrollments || ( 100 + Math.floor(Math.random() * 10)),
            rating: e.course.rating ,
          progress: e.progress || Math.floor(Math.random() * 100), // Random progress for demo
        }))

        setCourses(enrolledCourses)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [user])

  if (loading) return <p>Loading your courses...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          My Enrolled Courses ({courses.length})
        </h2>
        <Button variant="outline">
          <BookOpen className="h-4 w-4 mr-2" />
          Explore Catalog
        </Button>
      </div>

      {courses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center space-y-3">
            <Zap className="h-10 w-10 text-indigo-500 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">No Active Courses</h3>
            <p className="text-gray-500">
              It looks like you haven't started any courses yet. Enroll in a new course to begin your journey!
            </p>
            <Button className="gradient-primary">Explore New Courses</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}




const ProgressTab = ({ assignments }) => {
    const inProgressAssignments = assignments.filter(a => a.status === 'in-progress' || a.status === 'submitted');

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Overall Progress Dashboard</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Core Course Completion</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-extrabold text-indigo-600 mb-2">{STUDENT_DATA.progress}%</div>
                    <Progress value={STUDENT_DATA.progress} className="h-4" indicatorClassName="bg-indigo-600" />
                    <p className="text-sm text-gray-500 mt-2">You have completed **{STUDENT_DATA.completedModules}** out of **{STUDENT_DATA.totalModules}** core modules.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Assignment Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {inProgressAssignments.length === 0 ? (
                        <p className="text-gray-500">No active assignments to display progress for yet!</p>
                    ) : (
                        inProgressAssignments.map(assignment => (
                            <div key={assignment.id}>
                                <div className="flex justify-between items-center mb-1 text-sm font-medium">
                                    <span className="font-semibold text-gray-700">{assignment.title}</span>
                                    <span className={`font-bold ${assignment.progress === 100 ? 'text-green-600' : 'text-indigo-600'}`}>{assignment.progress}%</span>
                                </div>
                                <Progress value={assignment.progress} className="h-2" indicatorClassName={assignment.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'} />
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
};


// --- MAIN APP COMPONENT ---

const TABS = [
    { value: "overview", label: "Overview", component: OverviewTab },
    { value: "courses", label: "My Courses", component: MyCoursesTab },
    { value: "assignments", label: "Assignments", component: AssignmentsTab },
    { value: "progress", label: "Progress", component: ProgressTab },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  
  // Central function to update an assignment in local state
  const updateAssignment = useCallback((id, updates) => {
    setAssignments(prevAssignments => 
        prevAssignments.map(assignment => 
            assignment.id === id ? { ...assignment, ...updates } : assignment
        )
    );
  }, []);

  // Custom Tabs component to replace shadcn/ui Tabs
  const TabsList = ({ children, className }) => (
      <div className={`flex justify-start border-b border-gray-200 ${className}`}>{children}</div>
  );
  
  const TabsTrigger = ({ value, children }) => (
      <button 
          className={`px-4 py-3 text-base font-medium transition-colors duration-200 border-b-2 
              ${activeTab === value ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          onClick={() => setActiveTab(value)}
      >
          {children}
      </button>
  );
  
  const TabsContent = ({ value, children }) => (
      <div className={`pt-6 ${activeTab === value ? 'block' : 'hidden'}`}>{children}</div>
  );
    const { user ,logout} = useAuth()


const handleLogout = async () => {
  await logout();
  router.push("/");
};

    
   if (!user) return <p className='absolute top-1/2 left-1/2'>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
         <ModernNavigation />
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                {/* <p className="text-gray-500 text-sm">
                  {STUDENT_DATA.course} • {STUDENT_DATA.batch}
                </p> */}
              </div>
            </div>
            <div className="flex items-center gap-3">
        
<div className="flex justify-end mb-6 gap-3">
 

              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Support
              </Button>

               {/* <Button
    onClick={handleLogout}
    variant="outline"
    variant = "outline" size='sm'
  >
    <LogOut className="w-4 h-4 mr-2" />
    Logout
  </Button> */}

  <LogoutConfirmation/>

            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
              {TABS.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
              ))}
          </TabsList>

          {TABS.map(tab => (
              <TabsContent key={tab.value} value={tab.value}>
                  {/* Pass assignments state and update function to relevant tabs */}
                  {tab.value === 'assignments' && <AssignmentsTab assignments={assignments} updateAssignment={updateAssignment} />}
                  {tab.value === 'progress' && <ProgressTab assignments={assignments} />}
                  {tab.value !== 'assignments' && tab.value !== 'progress' && React.createElement(tab.component)}
              </TabsContent>
          ))}
        </div>
      </div>
    </div>
  )
}
