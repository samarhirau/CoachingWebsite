"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


 function FinalProject() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        🚀 Final Project: Complete Cross-Platform App
      </h1>

      <div className="space-y-8">
        {/* 1. Introduction */}
        <Card className="p-6 shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            In this final project, you'll build a **cross-platform Flutter app** that combines:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
            <li>Beautiful **UI with advanced widgets**</li>
            <li>**State management** for dynamic data</li>
            <li>**API integration** (e.g., Weather, News, or To-Do backend)</li>
            <li>**Firebase Authentication & Firestore Database**</li>
            <li>**Animations & Transitions** for modern UX</li>
            <li>Deployment-ready for **Android, iOS, and Web**</li>
          </ul>
        </Card>

        {/* 2. Project Planning */}
        <Card className="p-6 shadow-lg border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4">2. Project Planning</h2>
          <p className="text-gray-700 mb-3">
            Before coding, plan your app structure:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Define screens: Home, Profile, Dashboard, Tasks, etc.</li>
            <li>Decide state management: setState, Provider, or Riverpod</li>
            <li>Choose APIs or Firebase collections for backend</li>
            <li>Design navigation: bottom navigation, drawer, or tabs</li>
          </ul>
        </Card>

        {/* 3. Core Features */}
        <Card className="p-6 shadow-lg border-t-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">3. Core Features</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Authentication (Email/Google) using Firebase</li>
            <li>CRUD operations on Firestore database (add, edit, delete items)</li>
            <li>API calls to fetch live data (Weather, News, or Tasks)</li>
            <li>Dynamic lists with ListView.builder</li>
            <li>Animated UI components (cards, transitions, buttons)</li>
          </ul>
        </Card>

        {/* 4. UI & Navigation */}
        <Card className="p-6 shadow-lg border-t-4 border-yellow-500">
          <h2 className="text-2xl font-semibold mb-4">4. UI & Navigation</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>BottomNavigationBar or TabBar for multiple screens</li>
            <li>Slivers for scrollable lists and headers</li>
            <li>Custom cards & profile widgets</li>
            <li>Hero animations between pages</li>
          </ul>
        </Card>

        {/* 5. State Management & API */}
        <Card className="p-6 shadow-lg border-t-4 border-pink-500">
          <h2 className="text-2xl font-semibold mb-4">5. State Management & API</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Use setState for local updates or Provider/Riverpod for global state</li>
            <li>Fetch live data with HTTP package and display it in UI</li>
            <li>Handle loading, errors, and empty states gracefully</li>
          </ul>
        </Card>

        {/* 6. Firebase Integration */}
        <Card className="p-6 shadow-lg border-t-4 border-indigo-500">
          <h2 className="text-2xl font-semibold mb-4">6. Firebase Integration</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Sign up/sign in with Email & Google</li>
            <li>Save user profile and app data to Firestore</li>
            <li>Stream data in real-time to update UI dynamically</li>
          </ul>
        </Card>

        {/* 7. Deployment */}
        <Card className="p-6 shadow-lg border-t-4 border-teal-500">
          <h2 className="text-2xl font-semibold mb-4">7. Deployment</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Build release APK or App Bundle for Android</li>
            <li>Archive and upload iOS app to App Store</li>
            <li>Deploy web version to Firebase Hosting, Vercel, or Netlify</li>
          </ul>
        </Card>

        {/* 8. Hands-on Mini Project */}
        <Card className="p-6 shadow-lg border-t-4 border-blue-600">
          <h2 className="text-2xl font-semibold mb-4">8. Mini Project Ideas</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Task Manager App:</strong> Manage tasks with Firebase, animated UI, and notifications</li>
            <li><strong>Weather Dashboard:</strong> Live weather API, animated cards, and profile management</li>
            <li><strong>Recipe / Food App:</strong> CRUD recipes, user auth, advanced UI components</li>
          </ul>
        </Card>

      
      </div>
    </div>
  );
}



export default FinalProject;