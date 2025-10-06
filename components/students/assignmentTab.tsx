import SubmissionModal from '@/components/students/submissionModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckCircle, Download, Loader2, Play } from 'lucide-react';
import { useCallback, useState } from 'react';






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

export default AssignmentsTab;