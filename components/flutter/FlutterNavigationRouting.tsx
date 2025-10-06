"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlutterNavigationRouting: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-slate-900">
        Flutter Course: Navigation & Routing
      </h1>

      {/* 1. Introduction */}
      <Card className="p-6 mb-6 shadow-md hover:shadow-lg border border-gray-200 transition">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-3">
          In every app, users move between screens — like Home, Profile, or
          Settings. This process is called <strong>navigation</strong>.  
          Flutter makes navigation simple using the <code>Navigator</code> widget and route system.
        </p>
        <p className="text-gray-700">
          Navigation in Flutter can be done in multiple ways:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
          <li><strong>Navigator.push()</strong> → Move to a new screen.</li>
          <li><strong>Navigator.pop()</strong> → Go back to the previous screen.</li>
          <li><strong>Named Routes</strong> → Define route names for cleaner navigation.</li>
        </ul>
      </Card>

      {/* 2. Basic Navigation */}
      <Card className="p-6 mb-6 shadow-md hover:shadow-lg border border-gray-200 transition">
        <h2 className="text-2xl font-semibold mb-4">2. Basic Navigation using Navigator</h2>
        <p className="text-gray-700 mb-3">
          The simplest way to navigate is by using <code>Navigator.push()</code> and <code>Navigator.pop()</code>.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(home: HomePage()));
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home Page')),
      body: Center(
        child: ElevatedButton(
          child: Text('Go to About Page'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => AboutPage()),
            );
          },
        ),
      ),
    );
  }
}

class AboutPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('About Page')),
      body: Center(
        child: ElevatedButton(
          child: Text('Back to Home'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ <strong>Output:</strong> Pressing the button takes you to a new page, and “Back to Home” returns to the previous one.
        </p>
      </Card>

      {/* 3. Named Routes */}
      <Card className="p-6 mb-6 shadow-md hover:shadow-lg border border-gray-200 transition">
        <h2 className="text-2xl font-semibold mb-4">3. Named Routes</h2>
        <p className="text-gray-700 mb-3">
          Named routes make navigation cleaner and more scalable for larger apps.  
          You define route names and use them with <code>Navigator.pushNamed()</code>.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': (context) => HomePage(),
      '/about': (context) => AboutPage(),
    },
  ));
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home Page')),
      body: Center(
        child: ElevatedButton(
          child: Text('Go to About Page'),
          onPressed: () {
            Navigator.pushNamed(context, '/about');
          },
        ),
      ),
    );
  }
}

class AboutPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('About Page')),
      body: Center(
        child: ElevatedButton(
          child: Text('Back to Home'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ <strong>Tip:</strong> Named routes are useful when your app grows and you have multiple screens.
        </p>
      </Card>

      {/* 4. Passing Data Between Screens */}
      <Card className="p-6 mb-6 shadow-md hover:shadow-lg border border-gray-200 transition">
        <h2 className="text-2xl font-semibold mb-4">4. Passing Data Between Screens</h2>
        <p className="text-gray-700 mb-3">
          You can send data between screens by passing arguments during navigation.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => ProfilePage(username: 'Samar'),
  ),
);

// On the next screen:
class ProfilePage extends StatelessWidget {
  final String username;
  ProfilePage({required this.username});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: Center(child: Text('Hello, $username!')),
    );
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ Useful for sending user data, IDs, or configuration info between screens.
        </p>
      </Card>

      {/* 5. Mini Project */}
      <Card className="p-6 mb-6 shadow-md hover:shadow-lg border border-gray-200 transition">
        <h2 className="text-2xl font-semibold mb-4">5. Mini Project: Two-Screen App 🧩</h2>
        <p className="text-gray-700 mb-3">
          Build a small app with two screens:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
          <li>Home Screen with a button “View Details”.</li>
          <li>Details Screen that shows a message and a back button.</li>
          <li>Use <code>Navigator.push</code> and <code>pop</code> for navigation.</li>
        </ul>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => DetailsPage()),
);

// Inside DetailsPage:
ElevatedButton(
  onPressed: () => Navigator.pop(context),
  child: Text('Go Back'),
);`}
        </pre>
      </Card>

      {/* 6. Summary */}
      <Card className="p-6 mb-6 shadow-md hover:shadow-lg border border-gray-200 transition">
        <h2 className="text-2xl font-semibold mb-4">6. Summary</h2>
        <p className="text-gray-700">
          You learned how to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
          <li>Navigate between screens using <code>Navigator.push</code> and <code>pop</code>.</li>
          <li>Use Named Routes for better scalability.</li>
          <li>Pass data between screens.</li>
        </ul>
        <p className="text-gray-700">
          Next, you’ll learn about **State Management in Flutter** — handling and updating app data dynamically.
        </p>
      </Card>

      
    </div>
  );
};

export default FlutterNavigationRouting;
