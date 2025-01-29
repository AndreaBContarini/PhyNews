import React from 'react';
import { Link } from 'react-router-dom';
import { Atom } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="[animation:spin_0.05s_linear_infinite]">
              <Atom className="w-24 h-24 text-blue-500" />
            </div>
          </div>
          <div className="space-y-4 text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold">
              Scientific News Simplified
            </h1>
          </div>

          {/* Old Way vs New Way section */}
          <div className="grid md:grid-cols-2 gap-8 py-12 animate-slide-in-from-left">
            <div className="space-y-4 p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-xl font-semibold text-red-500">Old Way</h3>
              // ... existing content ...
            </div>
            <div className="space-y-4 p-6 bg-gray-800/50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-500">New Way</h3>
              // ... existing content ...
            </div>
          </div>

          {/* How It Works section */}
          <div className="py-12 animate-slide-in-from-right">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            // ... existing content ...
          </div>
        </div>
      </div>
    </div>
  );
} 
