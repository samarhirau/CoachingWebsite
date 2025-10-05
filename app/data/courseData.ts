// src/data/courseData.ts

export interface Topic {
  id: string;
  title: string;
  isCompleted: boolean; 
  durationMinutes: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  icon: string; // Placeholder for a dynamic icon 
}

export const RIDBHARAT_FRONTEND_COURSE_DATA: Module[] = [
  // --- MODULE 1: CORE LANGUAGE (JAVASCRIPT) ---
  {
    id: "m1",
    title: "1. Core Language: JavaScript Deep Dive 🧠",
    description: "Master the fundamentals: Hoisting, closures, prototypal inheritance, and ESNext features.",
    icon: "js-icon",
    topics: [
      { id: "t1.1", title: "Execution Context, Scopes, and Closure", isCompleted: false, durationMinutes: 45 },
      { id: "t1.2", title: "The Event Loop, Microtasks & Macrotasks", isCompleted: false, durationMinutes: 60 },
      { id: "t1.3", title: "Promises, async/await, and Error Handling", isCompleted: false, durationMinutes: 50 },
      { id: "t1.4", title: "Prototypal Inheritance vs. ES6 Classes", isCompleted: false, durationMinutes: 35 },
      { id: "t1.5", title: "Tricky Interview Questions (Hoisting, 'this')", isCompleted: false, durationMinutes: 40 },
    ],
  },
  
  // --- MODULE 2: FRAMEWORK MASTERY (REACT) ---
  {
    id: "m2",
    title: "2. Framework Mastery: React & Hooks ⚛️",
    description: "Building modern, high-performance UIs with functional components and state management.",
    icon: "react-icon",
    topics: [
      { id: "t2.1", title: "Component Lifecycle & useEffect Hooks", isCompleted: false, durationMinutes: 40 },
      { id: "t2.2", title: "State Management: Context API & Reducer", isCompleted: false, durationMinutes: 55 },
      { id: "t2.3", title: "Performance: useMemo, useCallback, React.memo", isCompleted: false, durationMinutes: 45 },
      { id: "t2.4", title: "Routing and Data Fetching Strategies", isCompleted: false, durationMinutes: 30 },
      { id: "t2.5", title: "Introduction to Server Components (Next.js)", isCompleted: false, durationMinutes: 30 },
    ],
  },

  // --- MODULE 3: STYLING & STRUCTURE (HTML/CSS) ---
  {
    id: "m3",
    title: "3. Styling & Structure: HTML/CSS 🎨",
    description: "Creating responsive, accessible, and scalable user interfaces.",
    icon: "css-icon",
    topics: [
      { id: "t3.1", title: "Semantic HTML5 and Accessibility (A11Y)", isCompleted: false, durationMinutes: 30 },
      { id: "t3.2", title: "Advanced Flexbox and CSS Grid Layouts", isCompleted: false, durationMinutes: 45 },
      { id: "t3.3", title: "CSS Architecture (BEM, Utility-First) and SCSS", isCompleted: false, durationMinutes: 35 },
      { id: "t3.4", title: "Responsive Design and Media Queries", isCompleted: false, durationMinutes: 20 },
    ],
  },

  // --- MODULE 4: APPLICATION PERFORMANCE ---
  {
    id: "m4",
    title: "4. Application Performance & Web Vitals ⚡",
    description: "Techniques for optimizing load times, reducing bundle size, and improving UX.",
    icon: "speed-icon",
    topics: [
      { id: "t4.1", title: "Core Web Vitals (LCP, FID, CLS) Deep Dive", isCompleted: false, durationMinutes: 40 },
      { id: "t4.2", title: "Bundle Analysis and Code Splitting", isCompleted: false, durationMinutes: 30 },
      { id: "t4.3", title: "Image, Font, and Asset Optimization", isCompleted: false, durationMinutes: 25 },
      { id: "t4.4", title: "Browser Caching and CDNs", isCompleted: false, durationMinutes: 20 },
    ],
  },

  // --- MODULE 5: MACHINE CODING / SYSTEM DESIGN ---
  {
    id: "m5",
    title: "5. Machine Coding / System Design 💻",
    description: "Practice building common UI components and solving real-world design problems.",
    icon: "code-icon",
    topics: [
      { id: "t5.1", title: "Building a Debounced Search Component", isCompleted: false, durationMinutes: 60 },
      { id: "t5.2", title: "Creating a Responsive Carousel/Slider", isCompleted: false, durationMinutes: 75 },
      { id: "t5.3", title: "Building a Simple Todo/Shopping Cart (State Management)", isCompleted: false, durationMinutes: 90 },
      { id: "t5.4", title: "Frontend System Design Principles", isCompleted: false, durationMinutes: 50 },
    ],
  },

  // --- MODULE 6: DATA STRUCTURES & ALGORITHMS (DSA) ---
  {
    id: "m6",
    title: "6. DSA for Frontend Interviews 💡",
    description: "Essential algorithms and data structures commonly used in frontend logic and interview rounds.",
    icon: "dsa-icon",
    topics: [
      { id: "t6.1", title: "Big O Notation and Complexity Analysis", isCompleted: false, durationMinutes: 30 },
      { id: "t6.2", title: "Common Array Manipulation Techniques", isCompleted: false, durationMinutes: 45 },
      { id: "t6.3", title: "Implementing Polyfills (e.g., Promise.all, Array.map)", isCompleted: false, durationMinutes: 60 },
      { id: "t6.4", title: "Tree Traversal (BFS/DFS) and the DOM", isCompleted: false, durationMinutes: 40 },
    ],
  },
];