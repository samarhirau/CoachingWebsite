"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

 function ApiIntegration() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        🌐 API Integration in Flutter
      </h1>

      <div className="space-y-8">
        <Card className="p-6 shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            APIs allow your Flutter app to communicate with external data
            sources like databases, servers, or third-party services. In this
            module, you'll learn how to fetch, display, and send data using
            Flutter’s <code>http</code> package.
          </p>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4">
            2. Adding HTTP Package
          </h2>
          <p className="text-gray-700 mb-3">
            To start making network requests, add the{" "}
            <code>http</code> package in your <code>pubspec.yaml</code> file:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0`}
          </pre>
          <p className="text-gray-700 mt-3">
            Then run <code>flutter pub get</code> to install the package.
          </p>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">3. Making a GET Request</h2>
          <p className="text-gray-700 mb-3">
            You can fetch data from any REST API using the{" "}
            <code>http.get()</code> method. Here’s an example:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiExample extends StatefulWidget {
  @override
  _ApiExampleState createState() => _ApiExampleState();
}

class _ApiExampleState extends State<ApiExample> {
  List users = [];

  Future<void> fetchData() async {
    final response =
        await http.get(Uri.parse('https://jsonplaceholder.typicode.com/users'));

    if (response.statusCode == 200) {
      setState(() {
        users = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load data');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('API Integration')),
      body: users.isEmpty
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: users.length,
              itemBuilder: (context, index) {
                return ListTile(
                  leading: CircleAvatar(
                    child: Text(users[index]['name'][0]),
                  ),
                  title: Text(users[index]['name']),
                  subtitle: Text(users[index]['email']),
                );
              },
            ),
    );
  }
}`}
          </pre>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-yellow-500">
          <h2 className="text-2xl font-semibold mb-4">4. Making a POST Request</h2>
          <p className="text-gray-700 mb-3">
            To send data to a server (for example, creating a new user), use
            <code>http.post()</code>:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`Future<void> createUser() async {
  final response = await http.post(
    Uri.parse('https://jsonplaceholder.typicode.com/users'),
    headers: {"Content-Type": "application/json"},
    body: json.encode({
      "name": "Samar",
      "email": "samar@example.com"
    }),
  );

  if (response.statusCode == 201) {
    print("User created successfully!");
  } else {
    throw Exception("Failed to create user");
  }
}`}
          </pre>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-pink-500">
          <h2 className="text-2xl font-semibold mb-4">
            5. Handling Errors and Loading States
          </h2>
          <p className="text-gray-700 mb-3">
            Always handle network delays and possible errors. Use{" "}
            <code>try-catch</code> and loading indicators.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`Future<void> fetchData() async {
  try {
    final response = await http.get(Uri.parse('https://api.example.com/data'));

    if (response.statusCode == 200) {
      // Success
    } else {
      throw Exception('Server error');
    }
  } catch (e) {
    print('Error: \$e');
  }
}`}
          </pre>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-teal-500">
          <h2 className="text-2xl font-semibold mb-4">
            6. Hands-on Project: User List App
          </h2>
          <p className="text-gray-700 mb-3">
            Create a Flutter app that fetches and displays users from an API:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Use <code>https://jsonplaceholder.typicode.com/users</code></li>
            <li>Show a loading spinner until data is loaded</li>
            <li>Display names, emails, and usernames in a list</li>
            <li>Add a Refresh button to re-fetch data</li>
          </ul>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`ElevatedButton(
  onPressed: fetchData,
  child: Text('Refresh'),
)`}
          </pre>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-indigo-500">
          <h2 className="text-2xl font-semibold mb-4">
            7. Bonus: Using Dio for Advanced API Handling
          </h2>
          <p className="text-gray-700 mb-3">
            The <code>dio</code> package is more powerful for headers,
            interceptors, and file uploads.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`import 'package:dio/dio.dart';

final dio = Dio();

Future<void> getUsers() async {
  final response = await dio.get('https://jsonplaceholder.typicode.com/users');
  print(response.data);
}`}
          </pre>
        </Card>

       
      </div>
    </div>
  );
}


export default ApiIntegration;