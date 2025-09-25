"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  PlayCircle,
  BookOpen,
  Trophy,
  TrendingUp,
  Calendar,
  Target,
  Award,
  Star,
} from "lucide-react"

export function ProgressTracker() {
  const [selectedWeek, setSelectedWeek] = useState(1)

  const courseModules = [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      lessons: 12,
      completedLessons: 12,
      duration: "2 weeks",
      status: "completed",
      score: 95,
      topics: ["HTML Structure", "CSS Styling", "Responsive Design", "Flexbox & Grid"],
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      lessons: 15,
      completedLessons: 15,
      duration: "3 weeks",
      status: "completed",
      score: 88,
      topics: ["Variables & Functions", "DOM Manipulation", "Events", "Async Programming"],
    },
    {
      id: 3,
      title: "React Development",
      lessons: 18,
      completedLessons: 14,
      duration: "4 weeks",
      status: "in-progress",
      score: null,
      topics: ["Components", "State & Props", "Hooks", "Context API"],
    },
    {
      id: 4,
      title: "Node.js & Backend",
      lessons: 16,
      completedLessons: 6,
      duration: "3 weeks",
      status: "in-progress",
      score: null,
      topics: ["Express.js", "APIs", "Database Integration", "Authentication"],
    },
    {
      id: 5,
      title: "Database Design",
      lessons: 10,
      completedLessons: 0,
      duration: "2 weeks",
      status: "locked",
      score: null,
      topics: ["SQL Basics", "MongoDB", "Data Modeling", "Optimization"],
    },
    {
      id: 6,
      title: "Deployment & DevOps",
      lessons: 8,
      completedLessons: 0,
      duration: "1 week",
      status: "locked",
      score: null,
      topics: ["Git & GitHub", "Cloud Deployment", "CI/CD", "Monitoring"],
    },
  ]

  const weeklyProgress = [
    { week: 1, hoursStudied: 25, lessonsCompleted: 8, quizScore: 92 },
    { week: 2, hoursStudied: 28, lessonsCompleted: 10, quizScore: 88 },
    { week: 3, hoursStudied: 22, lessonsCompleted: 7, quizScore: 95 },
    { week: 4, hoursStudied: 30, lessonsCompleted: 12, quizScore: 90 },
    { week: 5, hoursStudied: 26, lessonsCompleted: 9, quizScore: 87 },
    { week: 6, hoursStudied: 24, lessonsCompleted: 8, quizScore: 93 },
  ]

  const achievements = [
    { title: "First Steps", description: "Completed your first lesson", date: "Jan 15", earned: true },
    { title: "Quiz Master", description: "Scored 90+ on 5 quizzes", date: "Jan 22", earned: true },
    { title: "Consistent Learner", description: "7-day learning streak", date: "Jan 28", earned: true },
    { title: "Project Pioneer", description: "Submitted first project", date: "Feb 5", earned: false },
    { title: "Code Reviewer", description: "Reviewed 3 peer projects", date: "Feb 12", earned: false },
    { title: "Full Stack Hero", description: "Complete the full course", date: "Mar 15", earned: false },
  ]

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20"
      case "in-progress":
        return "bg-warning/10 text-warning border-warning/20"
      case "locked":
        return "bg-muted text-muted-foreground border-muted"
      default:
        return "bg-muted text-muted-foreground border-muted"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5" />
      case "in-progress":
        return <PlayCircle className="h-5 w-5" />
      case "locked":
        return <Clock className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="modules">Course Modules</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Course Modules */}
        <TabsContent value="modules" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Course Progress</h3>
            <Badge variant="secondary" className="text-sm">
              68% Complete
            </Badge>
          </div>

          <div className="grid gap-4">
            {courseModules.map((module) => (
              <Card key={module.id} className={`border-2 ${getStatusColor(module.status)}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(module.status)}`}>
                        {getStatusIcon(module.status)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{module.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {module.completedLessons}/{module.lessons} lessons • {module.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {module.score && <div className="text-lg font-bold text-success">{module.score}%</div>}
                      <Badge variant={module.status === "completed" ? "default" : "outline"}>
                        {module.status === "completed"
                          ? "Completed"
                          : module.status === "in-progress"
                            ? "In Progress"
                            : "Locked"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getProgressPercentage(module.completedLessons, module.lessons)}%</span>
                      </div>
                      <Progress
                        value={getProgressPercentage(module.completedLessons, module.lessons)}
                        className="h-2"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant={module.status === "locked" ? "outline" : "default"}
                        disabled={module.status === "locked"}
                        className={
                          module.status !== "locked" && module.status !== "completed" ? "gradient-primary" : ""
                        }
                      >
                        {module.status === "completed"
                          ? "Review"
                          : module.status === "in-progress"
                            ? "Continue"
                            : "Start"}
                      </Button>
                      {module.status !== "locked" && (
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Weekly Progress */}
        <TabsContent value="weekly" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Weekly Performance</h3>
            <div className="flex gap-2">
              {weeklyProgress.map((week) => (
                <Button
                  key={week.week}
                  size="sm"
                  variant={selectedWeek === week.week ? "default" : "outline"}
                  onClick={() => setSelectedWeek(week.week)}
                >
                  Week {week.week}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {weeklyProgress
              .filter((week) => week.week === selectedWeek)
              .map((week) => (
                <>
                  <Card key={`hours-${week.week}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{week.hoursStudied}h</div>
                          <div className="text-sm text-muted-foreground">Hours Studied</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card key={`lessons-${week.week}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-success/10 rounded-lg">
                          <BookOpen className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{week.lessonsCompleted}</div>
                          <div className="text-sm text-muted-foreground">Lessons Completed</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card key={`quiz-${week.week}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-warning/10 rounded-lg">
                          <Star className="h-6 w-6 text-warning" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{week.quizScore}%</div>
                          <div className="text-sm text-muted-foreground">Avg Quiz Score</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ))}
          </div>

          {/* Weekly Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive progress chart would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Your Achievements</h3>
            <Badge variant="secondary">
              {achievements.filter((a) => a.earned).length}/{achievements.length} Earned
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`${achievement.earned ? "border-warning/20" : "opacity-60"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        achievement.earned ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {achievement.earned ? <Trophy className="h-6 w-6" /> : <Award className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {achievement.earned ? `Earned on ${achievement.date}` : `Available ${achievement.date}`}
                        </span>
                      </div>
                    </div>
                    {achievement.earned && <CheckCircle className="h-5 w-5 text-success" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <h3 className="text-xl font-semibold">Learning Analytics</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-sm text-muted-foreground">Course Completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">91%</div>
                    <div className="text-sm text-muted-foreground">Avg Quiz Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">155h</div>
                    <div className="text-sm text-muted-foreground">Total Study Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-info/10 rounded-lg">
                    <Trophy className="h-6 w-6 text-info" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">Most Active Time</div>
                    <div className="text-sm text-muted-foreground">You learn best between 10 AM - 12 PM</div>
                  </div>
                  <Badge variant="outline">Morning Learner</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">Learning Streak</div>
                    <div className="text-sm text-muted-foreground">Current streak: 7 days</div>
                  </div>
                  <Badge variant="outline">Consistent</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">Preferred Content</div>
                    <div className="text-sm text-muted-foreground">You engage most with hands-on projects</div>
                  </div>
                  <Badge variant="outline">Practical Learner</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
