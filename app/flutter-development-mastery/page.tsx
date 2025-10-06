"use client";

import React, { useState, useMemo } from "react";
import FlutterCourseIntro from "@/components/flutter/flutterCourseIntro";
import DartProgrammingBasics from "@/components/flutter/DartProgrammingBasics";
import DartConsoleApp from "@/components/flutter/DartConsoleApp";
import FlutterWidgetsOverview from "@/components/flutter/FlutterWidgetsOverview";
import FlutterLayoutsStyling from "@/components/flutter/FlutterLayoutsStyling";
import FlutterNavigationRouting from "@/components/flutter/FlutterNavigationRouting";
import FlutterSimpleUIApp from "@/components/flutter/FlutterSimpleUIApp";
import FlutterStateManagement from "@/components/flutter/FlutterStateManagement";
import FormsValidation from "@/components/flutter/FormsValidation";
import HandsOnProject from "@/components/flutter/HandsOnProject";
import FirebaseIntegration from "@/components/flutter/FirebaseIntegration";
import AdvancedUIComponents from "@/components/flutter/AdvancedUIComponents";
import AppDeployment from "@/components/flutter/AppDeployment";
import FinalProject from "@/components/flutter/FinalProject";
import { Button } from "@/components/ui/button";

const courseStructure = {
  "1: Introduction & Dart Basics": {
    "Course Introduction & Setup": [
      "Installing Flutter & Dart SDK",
      "Setting up Android Studio / VS Code",
      "Running your first Flutter app",
    ],
    "Dart Programming Basics": [
      "Variables, Data Types, Operators",
      "Functions & Loops",
      "Classes, Objects & OOP Concepts",
    ],
    "Hands-on Project: Basic Dart Console App": [],
  },

  "2: Flutter Fundamentals": {
    "Flutter Widgets Overview": [
      "StatelessWidget vs StatefulWidget",
      "Text, Image, Button, Container",
    ],
    "Layouts & Styling": [
      "Row, Column, Stack, ListView",
      "Padding, Margin, BoxDecoration",
    ],
    "Navigation & Routing": ["Navigator.push & pop", "Named Routes"],
    "Hands-on Project: Simple UI App (Profile Page / Dashboard)": [],
  },

  "3: Intermediate Flutter": {
    "State Management": ["setState, Provider, Riverpod"],
    "Forms & Validation": ["TextFormField, Validators"],
    "API Integration": [
      "REST API with http package",
      "Fetching & displaying data",
    ],
    "Hands-on Project: Weather App / To-Do App": [],
  },

  "4: Advanced Concepts & Deployment": {
    "Animations & Transitions": ["AnimatedContainer, Hero Animations"],
    "Firebase Integration": ["Authentication, Firestore, Storage"],
    "Advanced UI Components": ["Custom Widgets, Slivers, TabBar"],
    "App Deployment": [
      "Building APK & IPA",
      "Publishing to Play Store / App Store",
    ],
    "Final Project: Complete Cross-Platform App": [],
  },
};

export default function FlutterCourse() {
  const allTopics = useMemo(() => {
    const topics: string[] = [];
    Object.values(courseStructure).forEach((week) =>
      Object.entries(week).forEach(([topic, subtopics]) => {
        topics.push(topic, ...subtopics);
      })
    );
    return topics;
  }, []);

  const [selectedTopic, setSelectedTopic] = useState(allTopics[0]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const progress = Math.round((completedTopics.length / allTopics.length) * 100);

  const handleMarkComplete = () => {
    if (!completedTopics.includes(selectedTopic)) {
      setCompletedTopics([...completedTopics, selectedTopic]);
    }

    const currentIndex = allTopics.indexOf(selectedTopic);
    if (currentIndex < allTopics.length - 1) {
      setSelectedTopic(allTopics[currentIndex + 1]);
    }
  };

  const renderContent = () => {
    switch (selectedTopic) {
      case "Course Introduction & Setup":
      case "Installing Flutter & Dart SDK":
      case "Setting up Android Studio / VS Code":
      case "Running your first Flutter app":
        return <FlutterCourseIntro />;
      case "Dart Programming Basics":
      case "Variables, Data Types, Operators":
      case "Functions & Loops":
      case "Classes, Objects & OOP Concepts":
        return <DartProgrammingBasics />;
      case "Hands-on Project: Basic Dart Console App":
        return <DartConsoleApp />;
      case "Flutter Widgets Overview":
      case "StatelessWidget vs StatefulWidget":
      case "Text, Image, Button, Container":
        return <FlutterWidgetsOverview />;
      case "Layouts & Styling":
      case "Row, Column, Stack, ListView":
      case "Padding, Margin, BoxDecoration":
        return <FlutterLayoutsStyling />;
      case "Navigation & Routing":
      case "Navigator.push & pop":
      case "Named Routes":
        return <FlutterNavigationRouting />;
      case "Hands-on Project: Simple UI App (Profile Page / Dashboard)":
        return <FlutterSimpleUIApp />;
      case "State Management":
      case "setState, Provider, Riverpod":
        return <FlutterStateManagement />;
      case "Forms & Validation":
      case "TextFormField, Validators":
        return <FormsValidation />;
      case "API Integration":
      case "REST API with http package":
      case "Fetching & displaying data":
        return <HandsOnProject />;
      case "Firebase Integration":
      case "Authentication, Firestore, Storage":
        return <FirebaseIntegration />;
      case "Advanced UI Components":
      case "Custom Widgets, Slivers, TabBar":
        return <AdvancedUIComponents />;
      case "App Deployment":
      case "Building APK & IPA":
      case "Publishing to Play Store / App Store":
        return <AppDeployment />;
      case "Final Project: Complete Cross-Platform App":
        return <FinalProject />;
      default:
        return <div className="p-8 text-gray-500">Select a topic 🚀</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold px-6 py-4 border-b text-blue-600 sticky top-0 bg-white z-10">
          📘 Course Curriculum
        </h2>
        {Object.entries(courseStructure).map(([week, topics]) => (
          <div key={week} className="border-b">
            <button
              className="w-full text-left px-6 py-3 font-semibold text-gray-800 hover:bg-gray-100 transition"
            >
              {week}
            </button>
            <ul className="pl-6 pb-3 space-y-1">
              {Object.entries(topics).map(([topicTitle, subtopics], topicIndex) => (
                <React.Fragment key={topicTitle}>
                  <li>
                    <button
                      onClick={() => setSelectedTopic(topicTitle)}
                      className={`w-full text-left px-4 py-2 rounded-md transition ${
                        selectedTopic === topicTitle
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : completedTopics.includes(topicTitle)
                          ? "text-green-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {String.fromCharCode(97 + topicIndex)}. {topicTitle}
                    </button>
                  </li>
                  {subtopics.map((subtopic) => (
                    <li key={subtopic} className="ml-4">
                      <button
                        onClick={() => setSelectedTopic(subtopic)}
                        className={`w-full text-left px-4 py-2 rounded-md transition ${
                          selectedTopic === subtopic
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : completedTopics.includes(subtopic)
                            ? "text-green-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        • {subtopic}
                      </button>
                    </li>
                  ))}
                </React.Fragment>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-2 bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-8">{renderContent()}</div>

        <div className="border-t bg-white p-4 flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            Progress: <span className="font-semibold">{progress}%</span>
          </p>
          <Button
            onClick={handleMarkComplete}
            disabled={completedTopics.includes(selectedTopic)}
          >
            {completedTopics.includes(selectedTopic)
              ? "✅ Completed"
              : "Mark as Complete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

