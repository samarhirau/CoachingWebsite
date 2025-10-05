import React from "react";

const courses = [
  {
    id: 1,
    title: "JS Interview Preparation",
    originalPrice: 499,
    discountedPrice: 49,
    savings: 450,
    features: [
      "JS Interview preparation questions",
      "Tricky JS questions asked in interviews",
      "Polyfill and modern JS questions",
      "JS and React patterns and Solid principles",
      "Topic-wise breakdown: closures, async, prototypes, etc.",
      "Lightweight cheat-sheets and notes",
      "Regular updates included",
      "Lifetime access",
    ],
    popular: false,
    notes: null, // No specific structured notes for this
  },
  {
    id: 2,
    title: "Complete Frontend Kit",
    originalPrice: 999,
    discountedPrice: 99,
    savings: 900,
    features: [
      "All JavaScript topics covered",
      "React + Next.js complete course",
      "Tailwind CSS & Bootstrap integration",
      "Project-based learning",
      "Cheat sheets & notes",
      "Regular updates included",
      "Lifetime access",
    ],
    popular: true,
    notes: null, // No specific structured notes for this
  },
  {
    id: 3,
    title: "Advanced React & State Management",
    originalPrice: 1299,
    discountedPrice: 149,
    savings: 1150,
    features: [
      "Deep dive into React Hooks (Custom Hooks, performance)",
      "Context API vs. Redux Toolkit vs. Zustand/Jotai",
      "Server Components vs. Client Components (Next.js App Router)",
      "Testing (Jest, React Testing Library, Cypress)",
      "Optimizing rendering performance with memo, useCallback, useMemo",
      "Best practices for large-scale applications",
      "Regular updates included",
      "Lifetime access",
    ],
    popular: false,
    notes: {
      introduction: "React Performance Cheatsheet",
      dataStructures: "Immutable Update Patterns (Redux)",
      testing: "Mocking strategies for API calls",
      patterns: "Custom Hook Recipe Book",
      references: "Official Docs Links (latest versions)",
    },
  },
];

export default function Courses() {
  // ... (Your original component logic remains the same for the course cards)
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Our Courses</h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`relative bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border ${
              course.popular ? "border-purple-500" : "border-gray-200"
            }`}
          >
            {course.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
            )}
            {/* Added a title for clarity */}
            <h2 className="text-2xl font-extrabold mb-4 text-gray-800">
              {course.title}
            </h2>

            <div>
              <div className="flex items-center mb-4 space-x-4">
                <span className="text-3xl font-bold text-black">
                  ₹{course.discountedPrice}
                </span>
                <span className="text-gray-400 line-through">
                  ₹{course.originalPrice}
                </span>
                <span className="text-green-500 font-semibold">
                  Save ₹{course.savings}
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-orange-500">✔</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-3">
              <button className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Get Instant Access
              </button>
              <button className="border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Preview Content
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

