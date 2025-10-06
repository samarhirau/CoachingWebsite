import { Card } from "../ui/card";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { BookOpen, CheckCircle, Clock, Calendar, Play, Star, TrendingUp, Trophy } from "lucide-react";

// Example student data; replace with real data or props as needed
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


export default OverviewTab;