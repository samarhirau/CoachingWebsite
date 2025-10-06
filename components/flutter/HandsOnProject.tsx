"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

 function HandsOnProject() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        🚀 Hands-on Project: Weather App / To-Do App
      </h1>

      <div className="space-y-8">
        {/* 1. Introduction */}
        <Card className="p-6 shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4">1. Project Overview</h2>
          <p className="text-gray-700">
            In this project, you will create a **Weather App** that fetches live data
            from an API or a **To-Do App** to manage tasks locally using state management.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
            <li>Practice Flutter layouts, widgets, and styling</li>
            <li>Integrate APIs for live weather data</li>
            <li>Implement forms, validation, and state management for To-Do App</li>
          </ul>
        </Card>

        {/* 2. Weather App */}
        <Card className="p-6 shadow-lg border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4">2. Weather App</h2>
          <p className="text-gray-700 mb-3">
            We will fetch weather data from <code>https://api.openweathermap.org</code> using HTTP requests.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
{String.raw`import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class WeatherApp extends StatefulWidget {
  @override
  _WeatherAppState createState() => _WeatherAppState();
}

class _WeatherAppState extends State<WeatherApp> {
  String city = "London";
  Map<String, dynamic>? weatherData;

  Future<void> fetchWeather() async {
    final apiKey = 'YOUR_API_KEY';
    final url =
        'https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey&units=metric';

    try {
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        setState(() {
          weatherData = json.decode(response.body);
        });
      } else {
        throw Exception('Failed to load weather data');
      }
    } catch (e) {
      print(e);
    }
  }

  @override
  void initState() {
    super.initState();
    fetchWeather();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Weather App')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(labelText: 'Enter City'),
              onChanged: (val) => city = val,
            ),
            SizedBox(height: 10),
            ElevatedButton(onPressed: fetchWeather, child: Text('Get Weather')),
            SizedBox(height: 20),
            weatherData != null
                ? Column(
                    children: [
                      Text('{weatherData!['name']}', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                      Text('{weatherData!['main']['temp']} °C', style: TextStyle(fontSize: 20)),
                      Text('{weatherData!['weather'][0]['description']}', style: TextStyle(fontSize: 18)),
                    ],
                  )
                : CircularProgressIndicator(),
          ],
        ),
      ),
    );
  }
}`}
          </pre>
        </Card>

        {/* 3. To-Do App */}
        <Card className="p-6 shadow-lg border-t-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">3. To-Do App</h2>
          <p className="text-gray-700 mb-3">
            Build a simple **To-Do App** with local state management using `setState()`.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`import 'package:flutter/material.dart';

class TodoApp extends StatefulWidget {
  @override
  _TodoAppState createState() => _TodoAppState();
}

class _TodoAppState extends State<TodoApp> {
  final List<String> todos = [];
  final TextEditingController controller = TextEditingController();

  void addTodo() {
    if(controller.text.isNotEmpty) {
      setState(() {
        todos.add(controller.text);
        controller.clear();
      });
    }
  }

  void removeTodo(int index) {
    setState(() {
      todos.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('To-Do App')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: controller,
              decoration: InputDecoration(labelText: 'Enter task'),
            ),
            SizedBox(height: 10),
            ElevatedButton(onPressed: addTodo, child: Text('Add Task')),
            Expanded(
              child: ListView.builder(
                itemCount: todos.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(todos[index]),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () => removeTodo(index),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}`}
          </pre>
        </Card>

        {/* 4. Project Summary */}
        <Card className="p-6 shadow-lg border-t-4 border-pink-500">
          <h2 className="text-2xl font-semibold mb-4">4. Project Summary</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Implemented API calls with HTTP for live data (Weather App).</li>
            <li>Used TextFields, Buttons, and ListViews for user input and display.</li>
            <li>Managed local state with setState() for To-Do App.</li>
            <li>Practiced validation, error handling, and dynamic UI updates.</li>
          </ul>
        </Card>

       
      </div>
    </div>
  );
}


export default HandsOnProject;