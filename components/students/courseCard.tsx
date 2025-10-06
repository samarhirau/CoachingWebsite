import { CardContent } from "../ui/card";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Clock, Users, Star, Play, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

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
                          <Link href={course.status === "Not Started" ? `/${course.slug}/enroll` : `/${course.slug}/`} className="flex items-center">
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

export default CourseCard;