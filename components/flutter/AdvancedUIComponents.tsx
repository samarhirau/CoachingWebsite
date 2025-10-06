"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

 function AdvancedUIComponents() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        ✨ Advanced UI Components in Flutter
      </h1>

      <div className="space-y-8">
        {/* 1. Introduction */}
        <Card className="p-6 shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Flutter offers a rich set of widgets for building highly interactive apps.
            In this module, you'll learn **custom widgets**, **slivers**, **cards**, **tabs**, **charts**, and more.
          </p>
        </Card>

        {/* 2. Custom Cards */}
        <Card className="p-6 shadow-lg border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4">2. Custom Cards</h2>
          <p className="text-gray-700 mb-3">
            Cards are great for displaying information. You can customize them with gradients, shadows, and animations:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
{`Card(
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
  elevation: 5,
  child: Container(
    padding: EdgeInsets.all(16),
    decoration: BoxDecoration(
      gradient: LinearGradient(colors: [Colors.blue, Colors.purple]),
      borderRadius: BorderRadius.circular(15),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Flutter Card', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
        SizedBox(height: 10),
        Text('Custom UI with gradient & shadow', style: TextStyle(color: Colors.white70)),
      ],
    ),
  ),
)`}
          </pre>
        </Card>

        {/* 3. Slivers & Scroll Effects */}
        <Card className="p-6 shadow-lg border-t-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">3. Slivers & Scroll Effects</h2>
          <p className="text-gray-700 mb-3">
            Slivers allow advanced scroll effects in Flutter. Example: SliverAppBar:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
{`CustomScrollView(
  slivers: [
    SliverAppBar(
      expandedHeight: 200,
      floating: true,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        title: Text('Sliver AppBar'),
        background: Image.network('https://picsum.photos/400', fit: BoxFit.cover),
      ),
    ),
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) => ListTile(title: Text('Item #\$index')),
        childCount: 20,
      ),
    ),
  ],
)`}
          </pre>
        </Card>

        {/* 4. Tab Bars & Bottom Navigation */}
        <Card className="p-6 shadow-lg border-t-4 border-yellow-500">
          <h2 className="text-2xl font-semibold mb-4">4. Tab Bars & Bottom Navigation</h2>
          <p className="text-gray-700 mb-3">
            Flutter provides built-in widgets for tabbed navigation and bottom navigation bars.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
{`DefaultTabController(
  length: 3,
  child: Scaffold(
    appBar: AppBar(
      bottom: TabBar(
        tabs: [
          Tab(icon: Icon(Icons.home)),
          Tab(icon: Icon(Icons.settings)),
          Tab(icon: Icon(Icons.person)),
        ],
      ),
      title: Text('Tab Example'),
    ),
    body: TabBarView(
      children: [
        Center(child: Text('Home Page')),
        Center(child: Text('Settings Page')),
        Center(child: Text('Profile Page')),
      ],
    ),
  ),
)`}
          </pre>
        </Card>

        {/* 5. Charts & Data Visualization */}
        <Card className="p-6 shadow-lg border-t-4 border-pink-500">
          <h2 className="text-2xl font-semibold mb-4">5. Charts & Data Visualization</h2>
          <p className="text-gray-700 mb-3">
            Use packages like <code>fl_chart</code> to create beautiful charts:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
{`LineChart(
  LineChartData(
    lineBarsData: [
      LineChartBarData(
        spots: [FlSpot(0, 1), FlSpot(1, 3), FlSpot(2, 2)],
        isCurved: true,
        colors: [Colors.blue],
        barWidth: 4,
      ),
    ],
  ),
)`}
          </pre>
        </Card>

        {/* 6. Hands-on Mini Project */}
        <Card className="p-6 shadow-lg border-t-4 border-teal-500">
          <h2 className="text-2xl font-semibold mb-4">6. Mini Project: Dashboard UI</h2>
          <p className="text-gray-700 mb-3">
            Build a **Dashboard App** combining:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Custom cards with stats</li>
            <li>Sliver list for scrollable content</li>
            <li>Tab bar navigation for different sections</li>
            <li>Charts showing analytics data</li>
          </ul>
        </Card>

        
      </div>
    </div>
  );
}


export default AdvancedUIComponents;