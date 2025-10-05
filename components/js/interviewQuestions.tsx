
"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react'; // Assumes you have lucide-react or similar icons

// --- 1. Data Structure and Sample Questions ---

type Level = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

interface Question {
  id: number;
  question: string;
  category: string;
  level: Level;
  answer: string;
}

const interviewQuestions: Question[] = [
  // --- Beginner (Core Fundamentals) ---
  { id: 1, question: 'What is the difference between null and undefined?', category: 'Types', level: 'Beginner', answer: 'Null is an assigned value representing "no value" or "no object." Undefined means a variable has been declared but not yet assigned a value.' },
  { id: 2, question: 'What are the primitive data types in JavaScript?', category: 'Types', level: 'Beginner', answer: 'String, Number, BigInt, Boolean, Undefined, Symbol, and Null.' },
  { id: 3, question: 'Explain Hoisting in JavaScript.', category: 'Scope', level: 'Beginner', answer: 'Hoisting is a mechanism where variable and function declarations are moved to the top of their scope before code execution. Only declarations are hoisted, not initializations.' },
  { id: 4, question: 'What is the difference between `==` and `===`?', category: 'Operators', level: 'Beginner', answer: '`==` (loose equality) compares values after performing type coercion. `===` (strict equality) compares both value and type without coercion.' },
  { id: 5, question: 'What is a Closure?', category: 'Functions', level: 'Beginner', answer: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). This allows a function to access variables from its outer scope even after the outer function has finished executing.' },
  
  // *** Additional 10 Beginner Questions (IDs 16-25) ***
  { id: 16, question: 'What is the purpose of the `this` keyword?', category: 'Scope', level: 'Beginner', answer: 'The `this` keyword refers to the object it belongs to. Its value is determined by how a function is called (runtime binding).' },
  { id: 17, question: 'How do you create an object in JavaScript?', category: 'Objects', level: 'Beginner', answer: 'Using object literal syntax (`{}`), the `new Object()` constructor, or ES6 classes.' },
  { id: 18, question: 'What is NaN and how do you check for it?', category: 'Types', level: 'Beginner', answer: 'NaN stands for Not-a-Number, resulting from invalid mathematical operations. You check for it using the global `isNaN()` function or, preferably, `Number.isNaN()`.' },
  { id: 19, question: 'How do you use the `try...catch` block?', category: 'Error Handling', level: 'Beginner', answer: 'The `try` block contains the code to be tested, and the `catch` block contains the code that handles any errors thrown in the `try` block.' },
  { id: 20, question: 'What are global variables?', category: 'Scope', level: 'Beginner', answer: 'Variables declared outside any function or block scope, making them accessible from anywhere in the JavaScript code.' },
  { id: 21, question: 'What are two ways to empty an array in JavaScript?', category: 'Arrays', level: 'Beginner', answer: 'Setting its length to 0 (`arr.length = 0`) or assigning an empty array to the variable (`arr = []`).' },
  { id: 22, question: 'What is the DOM?', category: 'DOM', level: 'Beginner', answer: 'The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.' },
  { id: 23, question: 'How do you loop through an array?', category: 'Arrays', level: 'Beginner', answer: 'Using a standard `for` loop, `for...of` loop, or array methods like `forEach()` or `map()`.' },
  { id: 24, question: 'What is type coercion?', category: 'Types', level: 'Beginner', answer: 'The automatic or implicit conversion of values from one data type to another (e.g., converting a string to a number in an arithmetic operation).' },
  { id: 25, question: 'What is the purpose of the `return` statement in a function?', category: 'Functions', level: 'Beginner', answer: 'It specifies the value that the function should output, and it stops the execution of the function.' },
  
  // --- Intermediate (ES6, Async, OOP) ---
  { id: 6, question: 'Explain the difference between `var`, `let`, and `const`.', category: 'Scope', level: 'Intermediate', answer: '`var` is function-scoped and hoisted; `let` and `const` are block-scoped. `const` cannot be reassigned; `let` can.' },
  { id: 7, question: 'What are Promises, and what are their three states?', category: 'Async', level: 'Intermediate', answer: 'Promises are objects representing the eventual completion or failure of an asynchronous operation. States are: Pending, Fulfilled, and Rejected.' },
  { id: 8, question: 'How does the `this` keyword work in Arrow Functions?', category: 'Functions', level: 'Intermediate', answer: 'Arrow functions do not have their own `this` context. They inherit `this` from the surrounding (lexical) scope at the time they are created.' },
  { id: 9, question: 'What is Event Delegation?', category: 'DOM', level: 'Intermediate', answer: 'A technique where you attach a single event listener to a parent element instead of multiple listeners to child elements. This improves performance and simplifies memory management.' },
  { id: 10, question: 'What is the Event Loop in JavaScript?', category: 'Async', level: 'Intermediate', answer: 'The Event Loop is a mechanism that allows Node.js/browser JavaScript to perform non-blocking I/O operations by offloading tasks to the system kernel (Web APIs) and processing their callbacks later in the queue.' },

  // *** Additional 40 Intermediate Questions (IDs 26-65) ***
  { id: 26, question: 'What is the difference between `call`, `apply`, and `bind`?', category: 'Functions', level: 'Intermediate', answer: '`call` and `apply` execute a function immediately, setting the `this` value explicitly. `apply` takes arguments as an array, while `call` takes them as separate arguments. `bind` returns a *new* function with the `this` context permanently set.' },
  { id: 27, question: 'What is a higher-order function (HOF)?', category: 'Functions', level: 'Intermediate', answer: 'A function that either takes one or more functions as arguments or returns a function as its result.' },
  { id: 28, question: 'What is async/await?', category: 'Async', level: 'Intermediate', answer: 'Syntactic sugar built on top of Promises to make asynchronous code look and behave more like synchronous code, making it more readable.' },
  { id: 29, question: 'Explain function currying.', category: 'Functions', level: 'Intermediate', answer: 'The process of transforming a function that takes multiple arguments into a sequence of functions, each taking a single argument.' },
  { id: 30, question: 'How do you clone an object in JavaScript?', category: 'Objects', level: 'Intermediate', answer: 'For shallow copies: Spread syntax (`{...obj}`) or `Object.assign()`. For deep copies: JSON methods (`JSON.parse(JSON.stringify(obj))`) or a dedicated deep clone utility/library.' },
  { id: 31, question: 'What is property shadowing in OOP?', category: 'OOP', level: 'Intermediate', answer: 'When an object has a property with the same name as a property in its prototype chain. The object\'s own property hides (shadows) the prototype property.' },
  { id: 32, question: 'What is the purpose of `Array.prototype.map()`?', category: 'Arrays', level: 'Intermediate', answer: 'It creates a new array populated with the results of calling a provided function on every element in the calling array.' },
  { id: 33, question: 'What is the difference between `for...in` and `for...of`?', category: 'ES6', level: 'Intermediate', answer: '`for...in` iterates over the **enumerable properties** of an object (keys/indices). `for...of` iterates over the **values** of an iterable object (like Arrays, Strings, Maps, Sets).' },
  { id: 34, question: 'How do you handle errors in Promises?', category: 'Async', level: 'Intermediate', answer: 'Using the `.catch()` method or by passing a second callback function to `.then()`.' },
  { id: 35, question: 'Explain spread syntax (`...`) vs. rest parameters.', category: 'ES6', level: 'Intermediate', answer: 'Spread syntax unpacks elements of an array/object. Rest parameters collects remaining function arguments into an array.' },
  { id: 36, question: 'What is an IIFE (Immediately Invoked Function Expression)?', category: 'Functions', level: 'Intermediate', answer: 'A function expression that executes immediately after it is defined. It creates a private scope for variables.' },
  { id: 37, question: 'What is memoization?', category: 'Performance', level: 'Intermediate', answer: 'An optimization technique used to speed up computer programs by caching the results of expensive function calls and returning the cached result when the same inputs occur again.' },
  { id: 38, question: 'What are template literals?', category: 'ES6', level: 'Intermediate', answer: 'String literals delimited with backticks (`` ` ``) that allow for embedded expressions (`${expression}`) and multi-line strings.' },
  { id: 39, question: 'What are arrow functions best suited for?', category: 'Functions', level: 'Intermediate', answer: 'Short, anonymous functions, especially in array methods (map, filter) or when you need to preserve the surrounding `this` context (lexical scoping).' },
  { id: 40, question: 'Explain the concept of strict mode (`use strict`).', category: 'ES6', level: 'Intermediate', answer: 'A way to opt-in to a restricted variant of JavaScript, which eliminates some "bad parts" (silent failures become errors, simplifies `this` binding, etc.).' },
  { id: 41, question: 'How do you implement inheritance in ES6?', category: 'OOP', level: 'Intermediate', answer: 'Using the `class` keyword with the `extends` keyword and the `super()` call inside the constructor of the subclass.' },
  { id: 42, question: 'What is object destructuring?', category: 'ES6', level: 'Intermediate', answer: 'A syntax that allows you to unpack properties from objects (or elements from arrays) into distinct variables.' },
  { id: 43, question: 'What is the purpose of `Object.freeze()`?', category: 'Objects', level: 'Intermediate', answer: 'It prevents existing properties from being modified or deleted, and prevents new properties from being added to an object.' },
  { id: 44, question: 'What are Set and Map?', category: 'ES6', level: 'Intermediate', answer: 'Set is a collection of unique values. Map is a collection of keyed data items, similar to objects, but keys can be any type (not just strings/symbols).' },
  { id: 45, question: 'What is a synchronous operation?', category: 'Async', level: 'Intermediate', answer: 'An operation that blocks the execution of the program until it completes, running sequentially.' },
  { id: 46, question: 'Explain `Array.prototype.filter()`.', category: 'Arrays', level: 'Intermediate', answer: 'It creates a new array with all elements that pass the test implemented by the provided function.' },
  { id: 47, question: 'What is the concept of immutable data in JavaScript?', category: 'FP', level: 'Intermediate', answer: 'Data that cannot be changed after creation. New copies must be created for any modifications.' },
  { id: 48, question: 'What is tree shaking?', category: 'Performance', level: 'Intermediate', answer: 'A form of dead code elimination where unused modules or code blocks are removed from the final bundle by tools like Webpack or Rollup.' },
  { id: 49, question: 'Explain the difference between event capturing and event bubbling.', category: 'DOM', level: 'Intermediate', answer: 'In capturing, the event travels down the DOM tree to the target. In bubbling (default), the event travels up the DOM tree from the target back to the root.' },
  { id: 50, question: 'How do you check if an object is an array?', category: 'Arrays', level: 'Intermediate', answer: 'Use `Array.isArray(obj)`.' },
  { id: 51, question: 'What are default parameters in functions?', category: 'ES6', level: 'Intermediate', answer: 'A feature allowing parameters to be initialized with a default value if no value or `undefined` is passed.' },
  { id: 52, question: 'What is the purpose of `Object.keys()`?', category: 'Objects', level: 'Intermediate', answer: 'It returns an array of a given object\'s own enumerable property names (keys).' },
  { id: 53, question: 'How is JavaScript related to Java?', category: 'General', level: 'Intermediate', answer: 'Despite the name similarity, they are completely different languages with different purposes, syntax, and execution models. The name was a marketing decision.' },
  { id: 54, question: 'What is the purpose of `sessionStorage` and `localStorage`?', category: 'Browser APIs', level: 'Intermediate', answer: 'Both store data on the client side. `localStorage` persists data across sessions; `sessionStorage` clears data when the browser tab is closed.' },
  { id: 55, question: 'What is `Array.prototype.reduce()`?', category: 'Arrays', level: 'Intermediate', answer: 'It executes a reducer function on each element of the array, resulting in a single output value.' },
  { id: 56, question: 'How do `async` functions handle errors?', category: 'Async', level: 'Intermediate', answer: 'Errors thrown inside an `async` function are automatically wrapped in a rejected promise. They can be caught using a standard `try...catch` block or `.catch()` on the promise.' },
  { id: 57, question: 'Explain the concept of method chaining.', category: 'Functions', level: 'Intermediate', answer: 'Calling methods sequentially on an object, where each method returns the object itself, allowing the next method to be called immediately.' },
  { id: 58, question: 'What is a generator function?', category: 'ES6', level: 'Intermediate', answer: 'A function that can be paused and resumed, yielding (returning) multiple values over time using the `yield` keyword.' },
  { id: 59, question: 'What is Babel and why is it used?', category: 'Tooling', level: 'Intermediate', answer: 'Babel is a JavaScript compiler (transpiler) that converts modern ECMAScript 2015+ code into backward-compatible JavaScript that can run in older browsers or environments.' },
  { id: 60, question: 'What is the critical rendering path?', category: 'Performance', level: 'Intermediate', answer: 'The sequence of steps the browser performs to convert HTML, CSS, and JavaScript into pixels on the screen.' },
  { id: 61, question: 'How can you prevent object properties from being modified?', category: 'Objects', level: 'Intermediate', answer: 'Using `Object.freeze()` for full immutability, or `Object.seal()` to prevent adding/deleting properties but allow modification of existing ones.' },
  { 
  id: 62, 
  question: 'What is property access using bracket notation vs. dot notation?', 
  category: 'Objects', 
  level: 'Intermediate', 
  answer: 'Dot notation (`obj.prop`) is cleaner but requires the property name to be a fixed, valid identifier. Bracket notation (`obj[\'prop\']` or `obj[variable]`) is required when the property name is stored in a **variable** (dynamic access), contains **spaces** or special characters, or is a **reserved word**.' 
},
  { id: 63, question: 'Differentiate between synchronous and asynchronous code execution.', category: 'Async', level: 'Intermediate', answer: 'Synchronous code runs sequentially, blocking the main thread. Asynchronous code runs non-sequentially, often using callbacks or Promises to complete tasks without blocking the main thread.' },
  { id: 64, question: 'What is a side effect in programming?', category: 'FP', level: 'Intermediate', answer: 'Any state change observable outside of the called function, such as modifying a global variable, writing to a file, or making an API call.' },
  { id: 65, question: 'What are ES Modules (import/export)?', category: 'ES6', level: 'Intermediate', answer: 'The standardized module system in JavaScript that allows dividing code into reusable files, using `import` to use code and `export` to expose it.' },

  // --- Advanced (Prototypes, Performance, Deep Dive) ---
  { id: 11, question: 'Explain Prototypal Inheritance.', category: 'OOP', level: 'Advanced', answer: 'JavaScript objects inherit properties and methods from a prototype object. All objects have a hidden `[[Prototype]]` property which links to the prototype object, forming a prototype chain.' },
  { id: 12, question: 'Differentiate between Debouncing and Throttling.', category: 'Performance', level: 'Advanced', answer: 'Debouncing ensures a function is run only after a specified time period has passed without any further calls. Throttling limits the execution of a function to at most once every specified time period.' },
  { id: 13, question: 'How do Microtasks (Promises) and Macrotasks (setTimeout) differ in the Event Loop?', category: 'Async', level: 'Advanced', answer: 'The Microtask Queue (for Promises, async/await) is processed *after* the current script finishes, but *before* the browser renders or processes the next Macrotask (for setTimeout, I/O). Microtasks have higher priority.' },
  { id: 14, question: 'What is the Temporal Dead Zone (TDZ)?', category: 'Scope', level: 'Advanced', answer: 'The TDZ is the time between entering a scope and the declaration of a variable (let/const). Accessing the variable during this period results in a ReferenceError.' },
  { id: 15, question: 'What is a Pure Function, and why is it important in functional programming?', category: 'FP', level: 'Advanced', answer: 'A pure function always returns the same output for the same input and has no side effects (it does not modify anything outside its scope). This makes code predictable, testable, and easier to debug.' },

  // *** Additional 35 Advanced Questions (IDs 66-100) ***
  { id: 66, question: 'Explain the internal mechanism of `Object.create()` vs `new Constructor()`.', category: 'OOP', level: 'Advanced', answer: '`new Constructor()` creates an object and sets its internal prototype link to `Constructor.prototype`. `Object.create(proto)` creates a new object with the specified `proto` object as its internal prototype.' },
  { id: 67, question: 'What is a WeakMap and a WeakSet?', category: 'ES6', level: 'Advanced', answer: 'They are similar to Map and Set, but their keys (WeakMap) or values (WeakSet) must be objects, and are held "weakly." If there are no other references to the object, it can be garbage collected, preventing memory leaks.' },
  { id: 68, question: 'Explain the concept of `tail recursion optimization` (TRO).', category: 'Performance', level: 'Advanced', answer: 'A technique where a function calls itself as its very last operation. JavaScript engines in theory can optimize this by reusing the current stack frame, preventing stack overflow errors, though support varies (not guaranteed in V8/Node.js).' },
  { id: 69, question: 'What is the `Reflect` API?', category: 'ES6', level: 'Advanced', answer: 'A built-in object that provides methods for interceptable JavaScript operations. It\'s often used together with the `Proxy` object.' },
  { id: 70, question: 'Differentiate between `call` and `apply` performance.', category: 'Performance', level: 'Advanced', answer: 'The performance difference is generally negligible for small argument lists. However, `call` is typically slightly faster as `apply` requires a temporary array creation/spreading for arguments.' },
  { id: 71, question: 'How do you correctly implement a deep clone in JavaScript?', category: 'Objects', level: 'Advanced', answer: 'A reliable deep clone requires recursion to handle nested objects/arrays, checks for circular references to prevent infinite loops, and handling special types like Dates, Regex, and functions.' },
  { id: 72, question: 'Explain what a race condition is in the context of asynchronous code.', category: 'Async', level: 'Advanced', answer: 'A race condition occurs when two or more asynchronous tasks access and manipulate a shared resource concurrently, and the final outcome depends on the order of execution, which is non-deterministic.' },
  { id: 73, question: 'What are the main advantages of using TypeScript over JavaScript?', category: 'Tooling', level: 'Advanced', answer: 'Static type checking (catching errors during development), better tooling/IDE support (autocompletion, refactoring), and improved code structure/readability.' },
  { id: 74, question: 'What is the purpose of `Symbol.iterator`?', category: 'ES6', level: 'Advanced', answer: 'It is a well-known Symbol that specifies the default iterator for an object. Objects that have this property (like Arrays, Strings) are iterable, enabling their use with `for...of` loops.' },
  { id: 75, question: 'Explain dependency injection (DI).', category: 'Design Patterns', level: 'Advanced', answer: 'A design pattern where an object receives the dependencies it needs from an external source (like a container) rather than creating them itself. This makes components loosely coupled and easier to test.' },
  { id: 76, question: 'What is the difference between client-side and server-side rendering?', category: 'General', level: 'Advanced', answer: 'Client-side: browser downloads minimal HTML and JavaScript, then renders content. Server-side: server pre-renders HTML, sends fully formed page to browser, improving initial load and SEO.' },
  { id: 77, question: 'What is `constructor stealing` in object creation?', category: 'OOP', level: 'Advanced', answer: 'A pattern (pre-ES6 classes) where a subclass calls the parent\'s constructor function using `call()` or `apply()` to inherit properties, but not methods (which still rely on the prototype chain).' },
  { id: 78, question: 'What is a decorator (in TypeScript/proposals)?', category: 'ES6', level: 'Advanced', answer: 'A function that takes a target (like a class, method, or property) and returns a new target (or modifies the existing one), providing a declarative way to add metadata or behavior.' },
  { id: 79, question: 'Explain the security implications of `eval()`.', category: 'Security', level: 'Advanced', answer: '`eval()` executes string input as code. If the string comes from an untrusted source, it can introduce security vulnerabilities (XSS, arbitrary code execution). It should be avoided.' },
  { id: 80, question: 'Differentiate between `session`, `local`, and `cookie` storage limitations.', category: 'Browser APIs', level: 'Advanced', answer: 'Cookies are small (4KB) and sent with every HTTP request. Local/Session storage is much larger (5-10MB) and not sent with requests. Session storage is cleared on tab close; Local storage persists.' },
  { id: 81, question: 'What is the significance of the `await` keyword within an `async` function?', category: 'Async', level: 'Advanced', answer: '`await` pauses the execution of the `async` function until the Promise it precedes is settled (resolved or rejected). The resolved value is then returned.' },
  { id: 82, question: 'What is the concept of `transpilation`?', category: 'Tooling', level: 'Advanced', answer: 'Converting source code from one language to another language that has a similar level of abstraction (e.g., converting ES6+ to ES5 using Babel).' },
  { id: 83, question: 'How can you measure web performance in a browser?', category: 'Performance', level: 'Advanced', answer: 'Using the Performance API (`performance.now()`, `performance.mark()`), browser DevTools (Performance tab, Lighthouse), and metrics like First Contentful Paint (FCP) and Time to Interactive (TTI).' },
  { id: 84, question: 'What is a Monad (briefly)?', category: 'FP', level: 'Advanced', answer: 'An abstract type that wraps a value and defines rules for how to chain operations on that value while managing side effects (e.g., the Promise object can be seen as a Monad for asynchronous operations).' },
  { id: 85, question: 'Explain a common design pattern like the Module pattern.', category: 'Design Patterns', level: 'Advanced', answer: 'A pattern used to enforce encapsulation, creating private and public members. It typically uses an IIFE that returns an object containing the public methods, while the variables inside the IIFE remain private.' },
  { id: 86, question: 'What are `Proxy` and `Handler` in ES6?', category: 'ES6', level: 'Advanced', answer: 'A `Proxy` is an object that wraps another object and allows you to intercept operations like property lookups, assignments, and function calls. The `Handler` object defines the custom behaviors (traps).' },
  { id: 87, question: 'What is the difference between an Error, a thrown String, and a rejected Promise?', category: 'Error Handling', level: 'Advanced', answer: 'An Error is an object with a stack trace. A thrown String/Object is simply a value thrown. A rejected Promise is a state of a Promise that captures a reason (often an Error object).' },
  { id: 88, question: 'What is `Garbage Collection` and how does it work in JS?', category: 'Performance', level: 'Advanced', answer: 'The process of automatically reclaiming memory that is no longer referenced by objects. JS typically uses a mark-and-sweep algorithm.' },
  { id: 89, question: 'Explain the concept of `memoization` for recursion.', category: 'Performance', level: 'Advanced', answer: 'Applying memoization to recursive functions involves storing the results of subproblems in a cache (often a Map or object) so that the function doesn\'t recalculate them repeatedly, drastically improving performance.' },
  { id: 90, question: 'What is the importance of the `key` prop in React lists (or similar virtual DOM frameworks)?', category: 'DOM', level: 'Advanced', answer: 'The `key` is a stable identifier that helps the reconciliation algorithm efficiently identify which items have changed, been added, or been removed, optimizing performance during updates.' },
  { id: 91, question: 'How do you check for circular references in JSON?', category: 'Objects', level: 'Advanced', answer: 'Using `JSON.stringify()` will throw a `TypeError: Converting circular structure to JSON`. A custom recursive function is needed to detect and handle them during deep cloning/serialization.' },
  { id: 92, question: 'What are `WeakRefs` and `FinalizationRegistry` (recent additions)?', category: 'ES6', level: 'Advanced', answer: 'WeakRefs allow creating a weak reference to an object that doesn\'t prevent garbage collection. FinalizationRegistry allows registering a cleanup callback when an object is garbage collected.' },
  { id: 93, question: 'Explain `currying` vs. `partial application`.', category: 'FP', level: 'Advanced', answer: 'Currying transforms a function `f(a, b, c)` into `f(a)(b)(c)`. Partial application transforms a function `f(a, b, c)` into a new function that fixes some of the arguments, e.g., `g(b, c) = f(a, b, c)`.' },
  { id: 94, question: 'What is the JavaScript engine\'s V8 Optimization process (briefly)?', category: 'Performance', level: 'Advanced', answer: 'V8 uses two compilers: Ignition (interpreter, fast start) and Turbofan (optimizing compiler, generates highly efficient machine code for "hot" functions).' },
  { id: 95, question: 'Why is `with` statement usage discouraged?', category: 'Scope', level: 'Advanced', answer: 'It is deprecated because it adds properties to the scope chain, making variable lookups ambiguous, severely hindering optimization, and causing maintenance headaches.' },
  { id: 96, question: 'Explain the concept of immutability in performance terms.', category: 'Performance', level: 'Advanced', answer: 'Immutability allows for easy change detection (reference checking) and sharing of data structures, which is crucial for optimization in functional programming and reactive frameworks.' },
  { id: 97, question: 'What is a Tagged Template Literal?', category: 'ES6', level: 'Advanced', answer: 'A function call that uses template literal syntax. The function receives the string parts (literal) and the substituted values (expressions) as separate arguments, allowing for powerful processing before string creation.' },
  { id: 98, question: 'Differentiate between `Microtask` and `Animation Frame` in the Event Loop.', category: 'Async', level: 'Advanced', answer: 'Microtasks run immediately after the current script (high priority). Animation Frames (`requestAnimationFrame`) run right before the browser\'s next repaint cycle, ideal for smooth DOM manipulation.' },
  { id: 99, question: 'What is the purpose of `WeakSet.add(value)`?', category: 'ES6', level: 'Advanced', answer: 'It adds an object to the WeakSet. The key difference is that the object is held weakly, meaning if no other references exist, it can be garbage collected.' },
  { id: 100, question: 'What are type annotations in TypeScript?', category: 'TypeScript', level: 'Advanced', answer: 'Explicitly defining the expected type of a variable, function parameter, or return value using the colon syntax (e.g., `let x: number = 10;`).' },
];

// --- 2. Main Component ---

const JS100QuestionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<Level>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter(q => {
      const matchesLevel = filterLevel === 'All' || q.level === filterLevel;
      const matchesSearch = searchTerm === '' ||
                            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            q.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [searchTerm, filterLevel]);

  // Handle the click on a question to toggle the answer
  const toggleAnswer = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const levels: Level[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2">
          100 Essential JavaScript Questions 🚀
        </h1>
        <p className="text-lg text-center text-blue-600 mb-10">
          Ace your technical interviews by mastering these concepts.
        </p>

        {/* --- Controls: Search and Filter --- */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 p-5 bg-white shadow-lg rounded-xl border border-blue-100">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by keyword, category, or concept..."
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              className="appearance-none w-full sm:w-48 py-3 pl-10 pr-4 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as Level)}
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Question List --- */}
        <p className="text-sm text-gray-500 mb-4 font-medium">
          Showing {filteredQuestions.length} of {interviewQuestions.length} questions
        </p>

        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map(q => (
              <QuestionCard 
                key={q.id} 
                question={q} 
                isExpanded={expandedId === q.id} 
                onClick={() => toggleAnswer(q.id)} 
              />
            ))
          ) : (
            <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
              No questions match your search and filter criteria. Try a different term!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JS100QuestionsPage;


// --- 3. Question Card Component ---

const getLevelColor = (level: Level) => {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-700 border-green-300';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Advanced': return 'bg-red-100 text-red-700 border-red-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

interface QuestionCardProps {
  question: Question;
  isExpanded: boolean;
  onClick: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, isExpanded, onClick }) => {
  const colorClasses = getLevelColor(question.level);
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      
      {/* Question Header (Clickable) */}
      <button 
        className="flex justify-between items-center w-full p-5 text-left transition duration-150 hover:bg-gray-50 rounded-t-xl" 
        onClick={onClick}
      >
        <div className="flex items-start">
          <span className="text-lg font-semibold text-gray-900 mr-4">
            {question.id}.
          </span>
          <div>
            <p className="text-lg font-medium text-gray-900">{question.question}</p>
            <div className={`mt-2 inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${colorClasses}`}>
              {question.level} ({question.category})
            </div>
          </div>
        </div>
        
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-blue-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
        )}
      </button>

      {/* Answer Content (Collapsible) */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-3 border-t border-gray-200">
          <h3 className="text-sm font-bold uppercase text-blue-600 mb-2">
            Answer:
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{question.answer}</p>
        </div>
      )}
    </div>
  );
};


