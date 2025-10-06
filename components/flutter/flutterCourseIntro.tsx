"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlutterCourseIntro: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-slate-900">
        Flutter Course: Course Introduction & Setup
      </h1>

      {/* Course Overview */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">1. Course Overview</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Goal:</strong> Learn Flutter & Dart to build cross-platform apps (iOS & Android).</li>
          <li><strong>What you will learn:</strong> Dart basics, Flutter widgets, state management, API integration, Firebase, and app deployment.</li>
          <li><strong>Projects:</strong> To-Do apps, Chat apps, Weather apps, and a Final Capstone App.</li>
        </ul>
      </Card>

      {/* Setup Flutter */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">2. Setting Up Flutter</h2>

        <h3 className="text-xl font-medium mb-2">Step 1: Install Flutter SDK</h3>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Go to <a href="https://flutter.dev/docs/get-started/install" className="text-blue-600 underline">Flutter official website</a> and download the SDK.</li>
          <li>Extract the ZIP folder to a suitable location (e.g., <code>C:\flutter</code>).</li>
        </ol>

        <h3 className="text-xl font-medium mt-4 mb-2">Step 2: Update Environment Variables</h3>
        <p className="text-gray-700 mb-2">
          Add the <code>flutter/bin</code> folder to your PATH variable.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Windows: Search “Environment Variables” → Edit PATH → Add <code>C:\flutter\bin</code></li>
          <li>Mac/Linux: Add <code>export PATH="$PATH:[PATH_TO_FLUTTER_DIRECTORY]/flutter/bin"</code> to <code>.bashrc</code> or <code>.zshrc</code></li>
        </ul>

        <h3 className="text-xl font-medium mt-4 mb-2">Step 3: Verify Installation</h3>
        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">flutter doctor</pre>
        <p className="text-gray-700 mt-1">Resolve any issues listed (Android SDK, Xcode, VS Code extensions).</p>
      </Card>

      {/* VS Code Setup */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">3. Install Code Editor</h2>
        <p className="text-gray-700 mb-2">Recommended: <a href="https://code.visualstudio.com/" className="text-blue-600 underline">Visual Studio Code</a></p>
        <p className="text-gray-700">Install Flutter & Dart extensions in VS Code for development support.</p>
      </Card>

      {/* Emulator Setup */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">4. Set Up Emulator / Device</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li><strong>Android Emulator:</strong> Open Android Studio → AVD Manager → Create virtual device → Start emulator</li>
          <li><strong>iOS Simulator (Mac only):</strong> Xcode → Preferences → Components → Select simulator</li>
        </ol>
        <p className="mt-2 text-gray-700"><code>flutter devices</code> can verify connected devices.</p>
      </Card>

      {/* First Flutter App */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">5. Create Your First Flutter App</h2>
        <p className="text-gray-700 mb-2">Run the following commands in terminal:</p>
        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 mb-2">
{`flutter create my_first_app
cd my_first_app
flutter run`}
        </pre>
        <p className="text-gray-700 mb-2">Explore the project structure:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><code>lib/main.dart</code> → Main Dart file</li>
          <li><code>pubspec.yaml</code> → Dependencies</li>
        </ul>
      </Card>

      {/* Exercise */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">6. Exercise</h2>
        <p className="text-gray-700 mb-2"><strong>Goal:</strong> Run the default Flutter app on your device/emulator.</p>
        <p className="text-gray-700 mb-2"><strong>Bonus Challenge:</strong> Change the default app text.</p>
        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`// lib/main.dart
child: Text('Hello, Flutter!')`}
        </pre>
        <p className="text-gray-700 mt-2">Run <code>flutter run</code> again to see the updated text.</p>
      </Card>

      
    </div>
  );
};

export default FlutterCourseIntro;
