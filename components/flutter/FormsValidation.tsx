"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

 function FormsValidation() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        🧾 Forms & Validation
      </h1>

      <div className="space-y-8">
        <Card className="p-6 shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Forms are essential in almost every Flutter app — for login, signup,
            feedback, and data input. In this module, you'll learn how to build
            forms, handle input data, and apply validation to ensure correct
            user inputs.
          </p>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4">2. Creating a Simple Form</h2>
          <p className="text-gray-700 mb-4">
            Flutter provides the <code>Form</code> widget and a{" "}
            <code>GlobalKey&lt;FormState&gt;</code> to manage form state and
            validation.
          </p>

          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`import 'package:flutter/material.dart';

class LoginForm extends StatefulWidget {
  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  String email = '';
  String password = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login Form')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == null || value.isEmpty)
                    return 'Please enter your email';
                  return null;
                },
                onSaved: (value) => email = value!,
              ),
              TextFormField(
                obscureText: true,
                decoration: InputDecoration(labelText: 'Password'),
                validator: (value) {
                  if (value == null || value.length < 6)
                    return 'Password must be 6+ chars';
                  return null;
                },
                onSaved: (value) => password = value!,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    print('Email: \$email, Password: \$password');
                  }
                },
                child: Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`}
          </pre>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">
            3. Common Form Widgets
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <strong>TextFormField</strong> — For text input like email,
              username, password.
            </li>
            <li>
              <strong>Checkbox</strong> — To select or agree to conditions.
            </li>
            <li>
              <strong>DropdownButtonFormField</strong> — For selecting from a
              list.
            </li>
            <li>
              <strong>Switch</strong> — To toggle on/off states.
            </li>
          </ul>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-yellow-500">
          <h2 className="text-2xl font-semibold mb-4">
            4. Form Validation Techniques
          </h2>
          <p className="text-gray-700 mb-4">
            Flutter allows both **inline validation** and **manual validation**:
          </p>

          <h3 className="font-semibold mb-2">✅ Inline Validation</h3>
          <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto mb-4">
            {`validator: (value) {
  if (value!.isEmpty) return 'Field cannot be empty';
  if (!value.contains('@')) return 'Invalid email format';
  return null;
}`}
          </pre>

          <h3 className="font-semibold mb-2">✅ Manual Validation</h3>
          <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
            {`if (_formKey.currentState!.validate()) {
  _formKey.currentState!.save();
  // Proceed with logic
}`}
          </pre>
        </Card>

        <Card className="p-6 shadow-lg border-t-4 border-pink-500">
          <h2 className="text-2xl font-semibold mb-4">
            5. Hands-on Mini Project: Feedback Form
          </h2>
          <p className="text-gray-700 mb-4">
            Let’s create a small **Feedback Form** with multiple inputs and
            validation.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {`class FeedbackForm extends StatefulWidget {
  @override
  _FeedbackFormState createState() => _FeedbackFormState();
}

class _FeedbackFormState extends State<FeedbackForm> {
  final _formKey = GlobalKey<FormState>();
  String name = '';
  String feedback = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Feedback Form')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Your Name'),
                validator: (value) =>
                    value!.isEmpty ? 'Please enter your name' : null,
                onSaved: (value) => name = value!,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Feedback'),
                maxLines: 3,
                validator: (value) =>
                    value!.isEmpty ? 'Please write your feedback' : null,
                onSaved: (value) => feedback = value!,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Feedback submitted!')),
                    );
                  }
                },
                child: Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`}
          </pre>
        </Card>

       
      </div>
    </div>
  );
}


export default FormsValidation;