"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

 function AnimationsTransitions() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        🎬 Animations & Transitions in Flutter
      </h1>

      <div className="space-y-8">
        {/* 1. Introduction */}
        <Card className="p-6 shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Animations make your Flutter apps feel alive. You can animate widgets, pages,
            or any property (like size, color, or position). Flutter provides multiple
            animation tools like <code>AnimatedContainer</code>, <code>AnimatedOpacity</code>,
            <code>AnimatedCrossFade</code>, and <code>AnimationController</code> for advanced animations.
          </p>
        </Card>

        {/* 2. Implicit Animations */}
        <Card className="p-6 shadow-lg border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4">2. Implicit Animations</h2>
          <p className="text-gray-700 mb-3">
            Implicit animations are easy to use because Flutter handles the animation for you.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`import 'package:flutter/material.dart';

class AnimatedContainerExample extends StatefulWidget {
  @override
  _AnimatedContainerExampleState createState() => _AnimatedContainerExampleState();
}

class _AnimatedContainerExampleState extends State<AnimatedContainerExample> {
  double _width = 100;
  double _height = 100;
  Color _color = Colors.blue;

  void _changeProperties() {
    setState(() {
      _width = _width == 100 ? 200 : 100;
      _height = _height == 100 ? 200 : 100;
      _color = _color == Colors.blue ? Colors.red : Colors.blue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('AnimatedContainer Example')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedContainer(
              width: _width,
              height: _height,
              color: _color,
              duration: Duration(seconds: 1),
              curve: Curves.easeInOut,
            ),
            SizedBox(height: 20),
            ElevatedButton(onPressed: _changeProperties, child: Text('Animate')),
          ],
        ),
      ),
    );
  }
}`}
          </pre>
        </Card>

        {/* 3. AnimatedOpacity */}
        <Card className="p-6 shadow-lg border-t-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">3. AnimatedOpacity</h2>
          <p className="text-gray-700 mb-3">
            Animate a widget's opacity (fade in/out) easily:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`AnimatedOpacity(
  opacity: _visible ? 1.0 : 0.0,
  duration: Duration(seconds: 1),
  child: Container(width: 100, height: 100, color: Colors.blue),
);`}
          </pre>
        </Card>

        {/* 4. Page Transitions */}
        <Card className="p-6 shadow-lg border-t-4 border-yellow-500">
          <h2 className="text-2xl font-semibold mb-4">4. Page Transitions</h2>
          <p className="text-gray-700 mb-3">
            Flutter allows animated page transitions using <code>PageRouteBuilder</code>:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => SecondScreen(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      var begin = Offset(1.0, 0.0);
      var end = Offset.zero;
      var curve = Curves.ease;

      var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

      return SlideTransition(
        position: animation.drive(tween),
        child: child,
      );
    },
  ),
);`}
          </pre>
        </Card>

        {/* 5. Hero Animations */}
        <Card className="p-6 shadow-lg border-t-4 border-pink-500">
          <h2 className="text-2xl font-semibold mb-4">5. Hero Animations</h2>
          <p className="text-gray-700 mb-3">
            Hero animations allow smooth transitions of a widget from one screen to another:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`Hero(
  tag: 'profile-pic',
  child: CircleAvatar(
    radius: 50,
    backgroundImage: NetworkImage('https://example.com/profile.jpg'),
  ),
);`}
          </pre>
          <p className="text-gray-700">
            The destination page should also have a Hero widget with the same tag.
          </p>
        </Card>

        {/* 6. Advanced Animations with AnimationController */}
        <Card className="p-6 shadow-lg border-t-4 border-indigo-500">
          <h2 className="text-2xl font-semibold mb-4">6. Advanced Animations</h2>
          <p className="text-gray-700 mb-3">
            For custom animations, use <code>AnimationController</code> and <code>AnimatedBuilder</code>:
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`AnimationController _controller;
Animation<double> _animation;

@override
void initState() {
  super.initState();
  _controller = AnimationController(
    duration: Duration(seconds: 2),
    vsync: this,
  );
  _animation = Tween<double>(begin: 0, end: 300).animate(_controller)
    ..addListener(() {
      setState(() {});
    });
  _controller.repeat(reverse: true);
}

@override
void dispose() {
  _controller.dispose();
  super.dispose();
}`}
          </pre>
        </Card>

        {/* 7. Hands-on Mini Project */}
        <Card className="p-6 shadow-lg border-t-4 border-teal-500">
          <h2 className="text-2xl font-semibold mb-4">
            7. Mini Project: Animated Profile Card
          </h2>
          <p className="text-gray-700 mb-3">
            Combine animations with UI: animate profile picture, button hover, and page transitions.
          </p>
        </Card>

       
      </div>
    </div>
  );
}


export default AnimationsTransitions;