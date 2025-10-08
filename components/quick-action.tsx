
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  MessageCircle,
  Phone,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/auth-provider";

export const QuickAction = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const { user } = useAuth();

  const handleClick = (action: string) => {
    setPendingAction(action);
    setIsConfirming(true);
  };

  const executeAction = async () => {
    if (!pendingAction) return;
    setIsConfirming(false);

    try {
      if (!user?._id) {
        toast.error("You must be logged in to perform this action.");
        return;
      }

      const res = await fetch("/api/quick-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: pendingAction,
          userId: user._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to store action");
      }

      
let userMessage = "";

  switch (pendingAction) {
    case "Start Live Chat with Counselor":
      userMessage = "Connecting you to a counselor...";
      break;
    case "Book Free Demo Class":
      userMessage = "Demo class booked successfully!";
      break;
    case "Request Callback":
      userMessage = "Our team will call you soon.";
      break;
    case "Download Course Brochure":
      userMessage = "Your course brochure is being downloaded.";
      break;
    default:
      userMessage = `${pendingAction} confirmed!`;
  }

  toast.success(userMessage);

      

      // console.log("✅ Action saved:", data);
    } catch (error) {
      console.error("❌ Error executing action:", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setPendingAction(null);
    }
  };

  const cancelAction = () => {
    setIsConfirming(false);
    setPendingAction(null);
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription>
            Need immediate assistance? Try these options for instant help.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full justify-start bg-transparent"
            variant="outline"
            onClick={() => handleClick("Start Live Chat with Counselor")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Start Live Chat with Counselor
          </Button>

          <Button
            className="w-full justify-start bg-transparent"
            variant="outline"
            onClick={() => handleClick("Book Free Demo Class")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Free Demo Class
          </Button>

          <Button
            className="w-full justify-start bg-transparent"
            variant="outline"
            onClick={() => handleClick("Request Callback")}
          >
            <Phone className="mr-2 h-4 w-4" />
            Request Callback
          </Button>

          <Button
            className="w-full justify-start bg-transparent"
            variant="outline"
            onClick={() => handleClick("Download Course Brochure")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Download Course Brochure
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {isConfirming && pendingAction && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-dialog-fade">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform animate-dialog-slide">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center">
                Confirm Action
              </h2>
              <p className="text-sm text-gray-600 text-center">
                Are you sure you want to proceed with: <br />
                <strong>{pendingAction}</strong>?
              </p>
            </div>
            <div className="mt-6 flex flex-col space-y-3">
              <button
                onClick={executeAction}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg h-12 hover:opacity-90 shadow-lg transition"
              >
                Yes, Confirm
              </button>
              <button
                onClick={cancelAction}
                className="w-full bg-gray-100 text-gray-800 rounded-lg h-12 hover:bg-gray-200 shadow-sm transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
