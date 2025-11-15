"use client";
import { useEffect, useState } from "react";
import { Construction, X } from "lucide-react";

interface UnderDevelopmentPopupProps {
  message?: string;
  contact?: string;
}

export default function UnderDevelopmentPopup({
  message = "We’re working hard to launch something awesome 😎",
  contact = "If you face any issues, please contact us.",
}: UnderDevelopmentPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 300); // small delay for smooth entry
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-lg animate-fade-up relative">
        <button
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>

        <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Construction className="w-10 h-10" />
        </div>

        <h2 className="text-xl font-bold mb-2 text-center">🚧 Under Development</h2>
        <p className="text-gray-600 text-center">{message}</p>
        <p className="text-sm text-gray-500 mt-3 text-center">{contact}</p>

        <div className="mt-6 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </div>
  );
}
