"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DartProgrammingBasics: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-slate-900">
        Flutter Course: Dart Programming Basics
      </h1>

      {/* Overview */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
        <p className="text-gray-700">
          Dart is the programming language used to build Flutter apps. It’s simple, object-oriented, and optimized for UI development.  
          In this module, you’ll learn about variables, functions, data types, conditionals, loops, and classes.
        </p>
      </Card>

      {/* Variables and Data Types */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">2. Variables and Data Types</h2>
        <p className="text-gray-700 mb-2">Dart supports different data types such as:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><code>int</code> – Integer values</li>
          <li><code>double</code> – Decimal numbers</li>
          <li><code>String</code> – Text</li>
          <li><code>bool</code> – True or False</li>
          <li><code>var</code> – Automatically infers data type</li>
        </ul>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 mt-3">
{`void main() {
  int age = 21;
  double height = 5.9;
  String name = 'Samar';
  bool isStudent = true;
  var city = 'Bhopal';

  print('Name: $name');
  print('Age: $age');
  print('Height: $height');
  print('City: $city');
  print('Student: $isStudent');
}`}
        </pre>
      </Card>

      {/* Operators */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">3. Operators</h2>
        <p className="text-gray-700 mb-3">
          Dart supports arithmetic, relational, logical, and assignment operators.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`void main() {
  int a = 10;
  int b = 3;

  print(a + b); // Addition
  print(a - b); // Subtraction
  print(a * b); // Multiplication
  print(a / b); // Division
  print(a % b); // Modulus
}`}
        </pre>
      </Card>

      {/* Conditional Statements */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">4. Conditional Statements</h2>
        <p className="text-gray-700 mb-3">
          Conditional statements help make decisions based on conditions.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`void main() {
  int score = 85;

  if (score >= 90) {
    print("Excellent!");
  } else if (score >= 75) {
    print("Good job!");
  } else {
    print("Keep trying!");
  }
}`}
        </pre>
      </Card>

      {/* Loops */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">5. Loops</h2>
        <p className="text-gray-700 mb-3">
          Dart provides several types of loops to repeat tasks.
        </p>

        <ul className="list-disc pl-6 text-gray-700 mb-2 space-y-1">
          <li><strong>for loop</strong> — used when you know how many times to iterate</li>
          <li><strong>while loop</strong> — runs until a condition is false</li>
          <li><strong>do-while loop</strong> — runs once before checking condition</li>
        </ul>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 mt-3">
{`void main() {
  for (int i = 1; i <= 5; i++) {
    print('Count: $i');
  }
}`}
        </pre>
      </Card>

      {/* Functions */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">6. Functions</h2>
        <p className="text-gray-700 mb-3">
          Functions are reusable blocks of code that perform specific tasks.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`void greet(String name) {
  print('Hello, $name!');
}

void main() {
  greet('Samar');
}`}
        </pre>
      </Card>

      {/* Classes and Objects */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">7. Classes and Objects</h2>
        <p className="text-gray-700 mb-3">
          Dart is an object-oriented language. Everything is an object, and every object is an instance of a class.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`class Student {
  String name;
  int age;

  Student(this.name, this.age);

  void display() {
    print('Name: $name, Age: $age');
  }
}

void main() {
  Student s1 = Student('Samar', 21);
  s1.display();
}`}
        </pre>
      </Card>

      {/* Exercise */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">8. Exercise</h2>
        <p className="text-gray-700 mb-2">
          ✅ Practice what you’ve learned by doing these small exercises:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Create a program that checks whether a number is even or odd.</li>
          <li>Write a function that takes two numbers and returns their sum.</li>
          <li>Create a class <code>Car</code> with properties <code>brand</code> and <code>year</code> and a method to display them.</li>
        </ul>
      </Card>

      
    </div>
  );
};

export default DartProgrammingBasics;
