"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlutterLayoutsStyling: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-slate-900">
        Flutter Course: Layouts & Styling
      </h1>

      {/* Introduction */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-3">
          Layouts define how your widgets are positioned on the screen.  
          Styling helps you make them visually appealing. In Flutter, layout and styling are achieved through various widgets like 
          <strong> Row</strong>, <strong>Column</strong>, <strong>Container</strong>, <strong>Stack</strong>, and decoration properties.
        </p>
      </Card>

      {/* Row and Column */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">2. Row and Column</h2>
        <p className="text-gray-700 mb-3">
          <strong>Row</strong> arranges widgets horizontally, while <strong>Column</strong> arranges them vertically.  
          They are the foundation of most Flutter layouts.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Text('Name: Samar Hirau'),
    Text('Role: Full Stack Developer'),
    Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.code, color: Colors.blue),
        SizedBox(width: 8),
        Text('Building Flutter Apps'),
      ],
    ),
  ],
)`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ <strong>Tip:</strong> Use <code>mainAxisAlignment</code> and <code>crossAxisAlignment</code> to align items perfectly.
        </p>
      </Card>

      {/* Container Styling */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">3. Container Styling</h2>
        <p className="text-gray-700 mb-3">
          The <strong>Container</strong> widget is one of the most versatile widgets for layout and styling.  
          It allows you to set padding, margin, color, border, and decoration.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`Container(
  margin: EdgeInsets.all(16),
  padding: EdgeInsets.all(20),
  decoration: BoxDecoration(
    color: Colors.lightBlue[50],
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(
        color: Colors.grey.withOpacity(0.3),
        spreadRadius: 2,
        blurRadius: 5,
      ),
    ],
  ),
  child: Text(
    'Styled Container Example',
    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
  ),
)`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ <strong>Output:</strong> A rounded, shadowed container with styled text.
        </p>
      </Card>

      {/* Stack Widget */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">4. Stack Widget</h2>
        <p className="text-gray-700 mb-3">
          The <strong>Stack</strong> widget allows you to place widgets on top of each other — great for overlays, badges, and profile cards.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`Stack(
  alignment: Alignment.center,
  children: [
    Container(
      width: 200,
      height: 200,
      color: Colors.blue[200],
    ),
    Text(
      'Overlay Text',
      style: TextStyle(color: Colors.white, fontSize: 22),
    ),
  ],
)`}
        </pre>

        <p className="text-gray-700 mt-3">
          ✅ <strong>Use Case:</strong> Add text over images, icons on buttons, or layered card designs.
        </p>
      </Card>

      {/* Alignment and Spacing */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">5. Alignment & Spacing</h2>
        <p className="text-gray-700 mb-3">
          Flutter provides flexible alignment and spacing tools using <code>Center</code>, <code>Padding</code>, <code>SizedBox</code>, and <code>Align</code>.
        </p>

        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800">
{`Padding(
  padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
  child: Align(
    alignment: Alignment.topRight,
    child: Text('Aligned Text Example'),
  ),
)`}
        </pre>

        <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">
          <li><strong>Padding</strong> → Adds space inside a widget.</li>
          <li><strong>Margin</strong> → Adds space outside a widget (using Container).</li>
          <li><strong>SizedBox</strong> → Adds fixed space between widgets.</li>
        </ul>
      </Card>

      {/* Hands-on Challenge */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">6. Hands-on Challenge 💡</h2>
        <p className="text-gray-700 mb-3">
          Create a **Profile Card UI** using the concepts learned:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Use a <code>Container</code> with padding, rounded corners, and a drop shadow.</li>
          <li>Place an <code>Image</code> and name inside a <code>Column</code>.</li>
          <li>Add a <code>Row</code> with icons (email, phone).</li>
          <li>Use <code>Padding</code> and <code>SizedBox</code> for spacing.</li>
        </ul>
      </Card>

      {/* Summary */}
      <Card className="mb-6 p-6 shadow-lg border border-gray-200 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4">7. Summary</h2>
        <p className="text-gray-700">
          You now know how to structure and style your Flutter app layouts.  
          Mastering these widgets gives you full control over positioning and design.  
          Next, we’ll dive into **Navigation & Routing** to move between pages in your app.
        </p>
      </Card>

      
    </div>
  );
};

export default FlutterLayoutsStyling;
