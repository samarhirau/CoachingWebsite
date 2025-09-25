"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProgressTracker } from "@/components/progress-tracker"
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
} from "lucide-react"

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const studentData = {
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    course: "Full Stack Web Development",
    batch: "Batch 2024-A",
    joinDate: "January 15, 2024",
    progress: 68,
    completedModules: 8,
    totalModules: 12,
    nextClass: "React Hooks Deep Dive",
    nextClassTime: "Tomorrow, 10:00 AM",
  }

  const recentActivities = [
    { type: "completed", title: "JavaScript Fundamentals", time: "2 hours ago" },
    { type: "assignment", title: "React Component Assignment", time: "1 day ago" },
    { type: "quiz", title: "HTML/CSS Quiz", score: "95%", time: "3 days ago" },
    { type: "project", title: "Portfolio Website", time: "1 week ago" },
  ]

  const upcomingClasses = [
    { title: "React Hooks Deep Dive", date: "Tomorrow", time: "10:00 AM", instructor: "Priya Singh" },
    { title: "State Management with Redux", date: "Jan 25", time: "2:00 PM", instructor: "Amit Kumar" },
    { title: "API Integration", date: "Jan 27", time: "10:00 AM", instructor: "Priya Singh" },
  ]

  const assignments = [
    { title: "Build a Todo App", dueDate: "Jan 24", status: "pending", difficulty: "Medium" },
    { title: "Create REST API", dueDate: "Jan 28", status: "not-started", difficulty: "Hard" },
    { title: "Portfolio Website", dueDate: "Completed", status: "completed", difficulty: "Easy", score: "92%" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {studentData.name}!</h1>
                <p className="text-muted-foreground">
                  {studentData.course} • {studentData.batch}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{studentData.progress}%</div>
                      <div className="text-sm text-muted-foreground">Course Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{studentData.completedModules}</div>
                      <div className="text-sm text-muted-foreground">Modules Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Clock className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-sm text-muted-foreground">Hours This Week</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-info/10 rounded-lg">
                      <Trophy className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">A+</div>
                      <div className="text-sm text-muted-foreground">Current Grade</div>
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
                    <Calendar className="h-5 w-5" />
                    Next Class
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{studentData.nextClass}</h3>
                        <p className="text-sm text-muted-foreground">{studentData.nextClassTime}</p>
                      </div>
                      <Button className="gradient-primary">
                        <Play className="h-4 w-4 mr-2" />
                        Join Class
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Upcoming Classes</h4>
                      {upcomingClasses.slice(1, 3).map((class_, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <div className="font-medium text-sm">{class_.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {class_.date} at {class_.time}
                            </div>
                          </div>
                          <Badge variant="outline">{class_.instructor}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`p-1.5 rounded-full ${
                            activity.type === "completed"
                              ? "bg-success/10 text-success"
                              : activity.type === "quiz"
                                ? "bg-warning/10 text-warning"
                                : "bg-primary/10 text-primary"
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
                          <div className="text-sm font-medium">{activity.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {activity.score && `Score: ${activity.score} • `}
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Assignments</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>

            <div className="grid gap-4">
              {assignments.map((assignment, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            assignment.status === "completed"
                              ? "bg-success/10 text-success"
                              : assignment.status === "pending"
                                ? "bg-warning/10 text-warning"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {assignment.status === "completed" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <BookOpen className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                            <Badge
                              variant={
                                assignment.difficulty === "Easy"
                                  ? "secondary"
                                  : assignment.difficulty === "Medium"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {assignment.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {assignment.score && (
                          <div className="text-right">
                            <div className="font-semibold text-success">{assignment.score}</div>
                            <div className="text-xs text-muted-foreground">Score</div>
                          </div>
                        )}
                        <Button
                          variant={assignment.status === "completed" ? "outline" : "default"}
                          size="sm"
                          className={assignment.status !== "completed" ? "gradient-primary" : ""}
                        >
                          {assignment.status === "completed"
                            ? "View"
                            : assignment.status === "pending"
                              ? "Continue"
                              : "Start"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <ProgressTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
