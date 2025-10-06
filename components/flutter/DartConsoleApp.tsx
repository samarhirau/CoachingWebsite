"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DartConsoleApp: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-slate-900">
        Flutter Course: Hands-on Project – Basic Dart Console App
      </h1>

      {/* Project Overview */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">1. Project Overview</h2>
        <p className="text-gray-700 mb-3">
          In this hands-on project, you’ll build a simple Dart console app called <strong>“Student Info Manager”</strong>.  
          This app will collect user input, store data in a class, and display formatted information on the console.  
          You’ll use everything you’ve learned — variables, conditionals, loops, and OOP concepts.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Understand user input and console I/O</li>
          <li>Work with functions and loops</li>
          <li>Practice Dart class and object concepts</li>
        </ul>
      </Card>

      {/* Step 1: Setup */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">2. Step 1 – Setup the Project</h2>
        <p className="text-gray-700 mb-3">
          Open your terminal and create a new Dart project:
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`dart create student_info_app
cd student_info_app
dart run`}
        </pre>

        <p className="text-gray-700 mt-3">
          This will create a simple Dart console project with a <code>bin</code> folder containing the main Dart file.
        </p>
      </Card>

      {/* Step 2: Project Code */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">3. Step 2 – Write the Code</h2>
        <p className="text-gray-700 mb-3">
          Open <code>bin/student_info_app.dart</code> and replace the code with:
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`import 'dart:io';

class Student {
  String name;
  int age;
  String course;

  Student(this.name, this.age, this.course);

  void displayInfo() {
    print('\\n===== Student Information =====');
    print('Name: \$name');
    print('Age: \$age');
    print('Course: \$course');
  }
}

void main() {
  print('Enter your name:');
  String? name = stdin.readLineSync();

  print('Enter your age:');
  int? age = int.tryParse(stdin.readLineSync() ?? '');

  print('Enter your course:');
  String? course = stdin.readLineSync();

  if (name != null && age != null && course != null) {
    Student student = Student(name, age, course);
    student.displayInfo();
  } else {
    print('Invalid input. Please restart the program.');
  }
}`}
        </pre>

        <p className="text-gray-700 mt-3">
          This program takes input from the user and displays it in a formatted output.  
          You’ll notice the use of:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><code>stdin.readLineSync()</code> for taking input</li>
          <li><code>int.tryParse()</code> for converting string to number</li>
          <li>A <code>Student</code> class with a <code>displayInfo()</code> method</li>
        </ul>
      </Card>

      {/* Step 3: Run and Test */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">4. Step 3 – Run & Test</h2>
        <p className="text-gray-700 mb-3">Run your app using the command:</p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`dart run bin/student_info_app.dart`}
        </pre>

        <p className="text-gray-700 mt-3">
          Example output:
        </p>

        <pre className="bg-gray-50 p-3 rounded text-sm text-gray-800">
{`Enter your name:
Samar
Enter your age:
21
Enter your course:
Flutter Development

===== Student Information =====
Name: Samar
Age: 21
Course: Flutter Development`}
        </pre>
      </Card>

      {/* Step 4: Bonus Challenge */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">5. Bonus Challenge 🧠</h2>
        <p className="text-gray-700 mb-3">
          Enhance your console app by adding new features:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Ask for multiple students and store them in a list</li>
          <li>Add a menu: “1. Add Student  2. View Students  3. Exit”</li>
          <li>Use loops to keep the app running until the user exits</li>
          <li>Display a thank-you message before exit</li>
        </ul>

        <p className="text-gray-700 mt-3 italic">
          🎯 This challenge helps you strengthen loops, conditionals, and list handling in Dart.
        </p>
      </Card>

     
    </div>
  );
};

export default DartConsoleApp;
