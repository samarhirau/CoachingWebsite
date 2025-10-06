"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlutterWidgetsOverview: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-slate-900">
        Flutter Course: Flutter Widgets Overview
      </h1>

      {/* Introduction */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-3">
          Everything in Flutter is a <strong>widget</strong> — from layout to styling, even the app itself!  
          Widgets are the basic building blocks of a Flutter app’s UI.  
          They describe <em>what</em> your UI should look like and how it should behave.
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><strong>Stateless Widgets</strong> → Static content that doesn’t change.</li>
          <li><strong>Stateful Widgets</strong> → Dynamic content that can change when the user interacts.</li>
          <li>Widgets can be combined to build complex layouts.</li>
        </ul>
      </Card>

      {/* Stateless Widget */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">2. Stateless Widget</h2>
        <p className="text-gray-700 mb-3">
          A <strong>StatelessWidget</strong> is immutable — once created, it cannot change its data or appearance.  
          It’s ideal for UI that doesn’t need to update dynamically.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Stateless Widget Example')),
        body: Center(
          child: Text(
            'Hello, Flutter!',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ <strong>Output:</strong> A simple screen showing “Hello, Flutter!” centered on the screen.
        </p>
      </Card>

      {/* Stateful Widget */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">3. Stateful Widget</h2>
        <p className="text-gray-700 mb-3">
          A <strong>StatefulWidget</strong> can change its UI dynamically based on user interaction or data updates.  
          It uses a separate <code>State</code> class to manage changes.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int counter = 0;

  void incrementCounter() {
    setState(() {
      counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Stateful Widget Example')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('You pressed the button $counter times.',
                  style: TextStyle(fontSize: 20)),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: incrementCounter,
                child: Text('Increase Counter'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ <strong>Output:</strong> A counter that increases every time the button is pressed.
        </p>
      </Card>

      {/* Common Widgets */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">4. Commonly Used Flutter Widgets</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Text</strong> — Displays simple text.
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm text-gray-800">
{`Text('Welcome to Flutter!')`}
            </pre>
          </li>

          <li>
            <strong>Container</strong> — Used for layout, padding, margin, color, and borders.
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm text-gray-800">
{`Container(
  padding: EdgeInsets.all(16),
  color: Colors.blue[100],
  child: Text('Inside Container'),
)`}
            </pre>
          </li>

          <li>
            <strong>Image</strong> — Displays local or network images.
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm text-gray-800">
{`Image.network('https://flutter.dev/images/flutter-logo-sharing.png')`}
            </pre>
          </li>

          <li>
            <strong>Row & Column</strong> — Layout widgets to arrange items horizontally or vertically.
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm text-gray-800">
{`Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Text('Column Example'),
    Icon(Icons.star, color: Colors.orange),
  ],
)`}
            </pre>
          </li>
        </ul>
      </Card>

      {/* Exercise */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">5. Exercise 🧩</h2>
        <p className="text-gray-700 mb-3">
          Practice creating and combining widgets to understand how Flutter UI is built.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Create a <code>StatelessWidget</code> that displays your name and a hobby.</li>
          <li>Create a <code>StatefulWidget</code> that toggles text color when a button is pressed.</li>
          <li>Combine <code>Row</code>, <code>Column</code>, and <code>Container</code> to make a simple profile card.</li>
        </ul>
      </Card>

      {/* Wrap Up */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">6. Summary</h2>
        <p className="text-gray-700">
          In this lesson, you learned about Flutter’s most important concept — <strong>widgets</strong>.  
          Every Flutter app is built using widgets that can be customized and combined to create beautiful, responsive UIs.  
          In the next module, you’ll learn about <strong>Layouts & Styling</strong> to structure your widgets properly on screen.
        </p>
      </Card>

      
    </div>
  );
};

export default FlutterWidgetsOverview;
