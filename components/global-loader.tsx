// "use client";

// import React, { useState, useEffect, useRef } from "react";

// const Preloader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
//   const [count, setCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const intervalRef = useRef<number | null>(null);

//   const DURATION = 2000; // total animation time
//   const INTERVAL = 20; // update every 20ms
//   const step = Math.ceil(100 / (DURATION / INTERVAL));

//   useEffect(() => {
//     intervalRef.current = window.setInterval(() => {
//       setCount((prev) => {
//         const next = prev + step;
//         if (next >= 100) {
//           clearInterval(intervalRef.current as number);
//           setTimeout(() => {
//             setIsLoading(false);
//             onFinish?.();
//           }, 400); // delay to ensure 100% is visible
//           return 100;
//         }
//         return next;
//       });
//     }, INTERVAL);

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [step, onFinish]);

//   return (
//     <>
//       {/* Loader Overlay */}
//       <div
//         className={`
//           fixed inset-0 z-[9999] flex items-center justify-center 
//           bg-gray-900 transition-all duration-700 ease-in-out
//           ${isLoading ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
//         `}
//       >
//         <div className="text-center text-white p-8">
//           <span className="text-sm tracking-widest uppercase mb-4 block text-gray-400">
//             Initializing Experience
//           </span>

//           <div className="font-extrabold text-9xl md:text-[10rem] leading-none mb-6 flex justify-center items-end gap-2">
//             <span>{count.toString().padStart(2, "0")}</span>
//             <span className="text-6xl text-gray-500">%</span>
//           </div>

//           <div className="w-64 h-1 bg-gray-700 mx-auto overflow-hidden rounded-full">
//             <div
//               className="h-full bg-white transition-all duration-300 ease-linear"
//               style={{ width: `${count}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Preloader;


"use client";

import React, { useEffect, useState, useRef } from "react";

const ShutterLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [width, setWidth] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shutterUp, setShutterUp] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setWidth((prev) => {
        const increment = Math.random() * 5 + 2;
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(intervalRef.current as number);
          setWidth(100);
          setTimeout(() => setShutterUp(true), 500); // trigger shutter after bar full
          setTimeout(() => setFinished(true), 1200); // show main content
          return 100;
        }
        return next;
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      {/* Loader overlay */}
      {!finished && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-transform duration-1000 ease-in-out
            ${shutterUp ? '-translate-y-full' : 'translate-y-0'}
          `}
        >
          {/* Centered Line Loader */}
          <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary transition-all duration-100 ease-linear"
              style={{ width: `${width}%` }}
            ></div>
          </div>

          {/* Upcoder text */}
          {width >= 100 && (
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-primary animate-fade-in">
              Upcoder
            </h1>
          )}
        </div>
      )}

      {/* Main content */}
      <div className={`transition-opacity duration-700 ${finished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {children}
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ShutterLoader;
