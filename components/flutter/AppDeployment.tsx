"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

 function AppDeployment() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        🚀 Flutter App Deployment & Publishing
      </h1>

      <div className="space-y-8">
        {/* 1. Introduction */}
        <Card className="p-6 shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Deploying your Flutter app is the final step to make it available to users.
            Flutter supports **Android, iOS, and Web deployment**. In this module, we
           ’ll cover deployment steps, configuration, and best practices.
          </p>
        </Card>

        {/* 2. Android Deployment */}
        <Card className="p-6 shadow-lg border-t-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">2. Android Deployment</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Update <code>android/app/build.gradle</code> with app version and ID:</li>
          </ol>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
{`android {
  defaultConfig {
    applicationId "com.example.myapp"
    minSdkVersion 21
    targetSdkVersion 33
    versionCode 1
    versionName "1.0.0"
  }
}`}
          </pre>

          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-3" start={2}>
            <li>Build the APK or App Bundle:</li>
          </ol>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
{`# APK
flutter build apk --release

# App Bundle (recommended for Play Store)
flutter build appbundle --release`}
          </pre>

          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-3" start={3}>
            <li>Sign the APK or App Bundle using your keystore.</li>
            <li>Upload to <a href="https://play.google.com/console" className="text-blue-600 underline">Google Play Console</a>.</li>
          </ol>
        </Card>

        {/* 3. iOS Deployment */}
        <Card className="p-6 shadow-lg border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4">3. iOS Deployment</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Open the iOS project in Xcode: <code>ios/Runner.xcworkspace</code></li>
            <li>Set your **bundle identifier** and **team** in project settings.</li>
            <li>Configure app icons and launch screen.</li>
            <li>Build and archive the app using Xcode.</li>
            <li>Upload to <a href="https://appstoreconnect.apple.com/" className="text-blue-600 underline">App Store Connect</a> for review.</li>
          </ol>
        </Card>

        {/* 4. Web Deployment */}
        <Card className="p-6 shadow-lg border-t-4 border-yellow-500">
          <h2 className="text-2xl font-semibold mb-4">4. Web Deployment</h2>
          <p className="text-gray-700 mb-3">
            Flutter also supports building web apps. Steps:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
{`# Build web project
flutter build web --release

# Deploy folder "build/web" to any static hosting
# Examples: Firebase Hosting, Vercel, Netlify
firebase deploy --only hosting
# or
vercel --prod`}
          </pre>
        </Card>

        {/* 5. Tips & Best Practices */}
        <Card className="p-6 shadow-lg border-t-4 border-pink-500">
          <h2 className="text-2xl font-semibold mb-4">5. Tips & Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Test on multiple devices and screen sizes.</li>
            <li>Minimize app size by removing unused assets and packages.</li>
            <li>Enable obfuscation and ProGuard for Android to protect code.</li>
            <li>Use version control for release builds.</li>
            <li>Follow store guidelines for screenshots, icons, and descriptions.</li>
          </ul>
        </Card>

        {/* 6. Hands-on Mini Project */}
        <Card className="p-6 shadow-lg border-t-4 border-teal-500">
          <h2 className="text-2xl font-semibold mb-4">6. Hands-on Mini Project</h2>
          <p className="text-gray-700 mb-3">
            Deploy the previously built **Weather App / To-Do App / Dashboard App** to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Android Play Store (or APK for testing)</li>
            <li>iOS App Store (if available)</li>
            <li>Web via Firebase Hosting or Vercel</li>
          </ul>
        </Card>

        
      </div>
    </div>
  );
}


export default AppDeployment;