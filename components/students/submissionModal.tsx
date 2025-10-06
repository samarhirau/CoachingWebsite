import { Card } from "../ui/card";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

const SubmissionModal = ({ assignment, onClose, onSubmit }) => {
  const [submissionContent, setSubmissionContent] = useState(
    assignment?.submissionContent || ''
  );

  if (!assignment) return null; // Prevent rendering if no assignment

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (onSubmit) await onSubmit(assignment.id, submissionContent);
    setIsLoading(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Submit: {assignment.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            {assignment.status === "in-progress"
              ? "Complete your work and submit the description below."
              : "Review or update your submission content."}
          </p>
          <textarea
            value={submissionContent}
            onChange={(e) => setSubmissionContent(e.target.value)}
            placeholder="Paste your code link, repository URL, or a summary of your work here..."
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
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
              {assignment.status === "submitted"
                ? "Update Submission"
                : "Submit Assignment"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionModal;
