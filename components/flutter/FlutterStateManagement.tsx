"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlutterStateManagement: React.FC = () => {

  


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-slate-900">
        Flutter Course: State Management
      </h1>

      {/* 1. Introduction */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">1. What is State Management?</h2>
        <p className="text-gray-700 mb-3">
          In Flutter, <strong>state</strong> means the data that can change over time —
          such as user input, theme, counter values, or API responses.
        </p>
        <p className="text-gray-700">
          <strong>State Management</strong> is how Flutter keeps your UI updated when data changes.
          For example, when you press a button to increase a counter, the UI must rebuild to show the new value.
        </p>
      </Card>

      {/* 2. StatefulWidget and setState */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">2. Managing State with setState()</h2>
        <p className="text-gray-700 mb-3">
          The easiest way to manage local state is using a <code>StatefulWidget</code> with the <code>setState()</code> method.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`import 'package:flutter/material.dart';

void main() {
  runApp(CounterApp());
}

class CounterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: CounterScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class CounterScreen extends StatefulWidget {
  @override
  _CounterScreenState createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int counter = 0;

  void incrementCounter() {
    setState(() {
      counter++;
    });
  }

  void decrementCounter() {
    setState(() {
      counter--;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Counter App')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Counter Value:', style: TextStyle(fontSize: 20)),
            Text('$counter', style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold)),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(onPressed: incrementCounter, child: Text('+')),
                SizedBox(width: 10),
                ElevatedButton(onPressed: decrementCounter, child: Text('-')),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ Each time you call <code>setState()</code>, Flutter rebuilds the widget with the new value.
        </p>
      </Card>

      {/* 3. Why We Need Advanced State Management */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">3. Why We Need Advanced State Management</h2>
        <p className="text-gray-700 mb-3">
          <code>setState()</code> works for small widgets, but in bigger apps (like e-commerce or dashboards),
          managing data across multiple screens becomes complex.
        </p>
        <p className="text-gray-700">
          That’s where packages like <strong>Provider</strong>, <strong>Riverpod</strong>,
          <strong>Bloc</strong>, and <strong>GetX</strong> help you share and update state globally.
        </p>
      </Card>

      {/* 4. Using Provider for Global State */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">4. Using Provider for Global State</h2>
        <p className="text-gray-700 mb-3">
          Provider helps you share data between widgets without passing values manually.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => CounterProvider(),
      child: MyApp(),
    ),
  );
}

class CounterProvider extends ChangeNotifier {
  int count = 0;

  void increment() {
    count++;
    notifyListeners();
  }

  void decrement() {
    count--;
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: CounterScreen());
  }
}

class CounterScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = Provider.of<CounterProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text('Provider Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
           Text('Count: \${counter.count}', style: TextStyle(fontSize: 30)),

            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(onPressed: counter.increment, child: Text('+')),
                SizedBox(width: 10),
                ElevatedButton(onPressed: counter.decrement, child: Text('-')),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ Here, <code>Provider</code> automatically updates all widgets listening to data changes.
        </p>
      </Card>

      {/* 5. Mini Project: Theme Toggle App */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">5. Mini Project: Theme Toggle App 🌙☀️</h2>
        <p className="text-gray-700 mb-3">
          Let’s create a simple app that toggles between Light and Dark theme using Provider.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`class ThemeProvider extends ChangeNotifier {
  bool isDark = false;

  void toggleTheme() {
    isDark = !isDark;
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return MaterialApp(
      theme: themeProvider.isDark ? ThemeData.dark() : ThemeData.light(),
      home: Scaffold(
        appBar: AppBar(title: Text('Theme Toggle')),
        body: Center(
          child: ElevatedButton(
            onPressed: themeProvider.toggleTheme,
            child: Text(themeProvider.isDark ? 'Switch to Light' : 'Switch to Dark'),
          ),
        ),
      ),
    );
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          🌗 Each button press toggles the entire app’s theme dynamically using global state.
        </p>
      </Card>

      {/* 6. Summary */}
      <Card className="p-6 mb-6 shadow-md border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4">6. Summary</h2>
        <p className="text-gray-700">
          You learned:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>How <code>setState()</code> updates local UI.</li>
          <li>When to use global state management like Provider.</li>
          <li>Created a <strong>Counter App</strong> and a <strong>Theme Toggle App</strong>.</li>
        </ul>
        <p className="text-gray-700 mt-3">
          🧩 Next, we’ll dive into **Networking & API Integration in Flutter** — where you’ll fetch live data and show it dynamically in your UI.
        </p>
      </Card>

      
    </div>
  );
};

export default FlutterStateManagement;
