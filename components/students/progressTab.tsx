import { CardHeader } from "../ui/card";
import { Card, CardContent } from "../ui/card";
import { CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

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

export default ProgressTab;