"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlutterSimpleUIApp: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-slate-900">
        Flutter Course: Hands-on Project – Simple UI App
      </h1>

      {/* 1. Overview */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
        <p className="text-gray-700 mb-3">
          In this project, you’ll build a **Profile Page / Dashboard App** using Flutter.
          It will showcase your profile details, stats, and contact info in a beautiful UI layout.
        </p>
        <p className="text-gray-700">
          🎯 <strong>Goal:</strong> Understand layout structure and practice widgets like:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
          <li><code>Scaffold</code>, <code>AppBar</code></li>
          <li><code>CircleAvatar</code> for profile image</li>
          <li><code>Card</code> & <code>ListTile</code> for sections</li>
          <li>Styling with <code>Padding</code> and <code>Container</code></li>
        </ul>
      </Card>

      {/* 2. Folder Setup */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">2. Project Setup</h2>
        <p className="text-gray-700 mb-3">
          Create a new Flutter project:
        </p>
        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`flutter create profile_ui_app
cd profile_ui_app
flutter run`}
        </pre>
        <p className="text-gray-700 mt-3">
          Replace the <code>main.dart</code> content with the code below 👇
        </p>
      </Card>

      {/* 3. UI Implementation */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">3. UI Implementation</h2>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`import 'package:flutter/material.dart';

void main() {
  runApp(ProfileApp());
}

class ProfileApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: ProfilePage(),
    );
  }
}

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text("My Profile"),
        centerTitle: true,
        backgroundColor: Colors.blueAccent,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: 20),
            CircleAvatar(
              radius: 60,
              backgroundImage: AssetImage('assets/profile.jpg'),
            ),
            SizedBox(height: 10),
            Text(
              'Samar Hirau',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            Text(
              'Full Stack Developer',
              style: TextStyle(color: Colors.grey[700]),
            ),
            SizedBox(height: 20),

            // Stats Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildStatCard('Projects', '12'),
                  _buildStatCard('Followers', '3.2K'),
                  _buildStatCard('Rating', '4.8'),
                ],
              ),
            ),
            SizedBox(height: 20),

            // About Section
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Card(
                elevation: 3,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'About Me',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 10),
                      Text(
                        'I am a Flutter developer passionate about creating clean, modern apps with beautiful UI and smooth UX.',
                        style: TextStyle(fontSize: 15, color: Colors.grey[700]),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Contact Info
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  ListTile(
                    leading: Icon(Icons.email, color: Colors.blueAccent),
                    title: Text('samrhirau@gmail.com'),
                  ),
                  ListTile(
                    leading: Icon(Icons.phone, color: Colors.blueAccent),
                    title: Text('+91 9876543210'),
                  ),
                  ListTile(
                    leading: Icon(Icons.location_on, color: Colors.blueAccent),
                    title: Text('India'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String title, String value) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          children: [
            Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            Text(title, style: TextStyle(color: Colors.grey[700])),
          ],
        ),
      ),
    );
  }
}`}
        </pre>
      </Card>

      {/* 4. Output */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">4. Output Preview</h2>
        <p className="text-gray-700 mb-3">
          ✅ The app will show:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>A profile photo and name at the top</li>
          <li>Stats section showing projects, followers, and rating</li>
          <li>About section with a short bio</li>
          <li>Contact info with icons</li>
        </ul>
        <p className="text-gray-700 mt-3">
          🧠 This project strengthens your understanding of **layouts, styling, and widget composition** in Flutter.
        </p>
      </Card>

      {/* 5. Task */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">5. Your Task</h2>
        <p className="text-gray-700">
          Try to **customize** your dashboard:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
          <li>Add a button to edit profile details.</li>
          <li>Use different colors or icons.</li>
          <li>Add a “Follow” button that shows a Snackbar when clicked.</li>
        </ul>
      </Card>

      {/* 6. Summary */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">6. Summary</h2>
        <p className="text-gray-700">
          You built a **Flutter Profile Page** using widgets like:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><code>Scaffold</code> and <code>AppBar</code> for layout</li>
          <li><code>CircleAvatar</code> for images</li>
          <li><code>Card</code> & <code>ListTile</code> for information sections</li>
          <li>Styling using <code>Padding</code> and <code>Column</code></li>
        </ul>
        <p className="text-gray-700 mt-3">
          🏆 Great job! You’re now ready to move on to **State Management in Flutter** next.
        </p>
      </Card>

      
    </div>
  );
};

export default FlutterSimpleUIApp;
