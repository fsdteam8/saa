"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Component() {
  const [count, setCount] = useState(10);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && !isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [count, isComplete]);

  const resetCountdown = () => {
    setCount(10);
    setIsComplete(false);
    setShowConfetti(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: [
                    "#ff6b6b",
                    "#4ecdc4",
                    "#45b7d1",
                    "#96ceb4",
                    "#feca57",
                    "#ff9ff3",
                  ][Math.floor(Math.random() * 6)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-md mx-4 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          {!isComplete ? (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Countdown Timer
              </h1>
              <div className="relative">
                <div className="text-8xl font-bold text-blue-600 mb-4 animate-pulse">
                  {count}
                </div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin"
                  style={{ animationDuration: "1s" }}
                />
              </div>
              <p className="text-gray-600 text-lg">
                Get ready for something amazing...
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">
                Congratulations!
              </h1>
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold mb-2">Total Delivered</p>
                <div className="text-5xl font-bold">$150,000</div>
              </div>
              <button
                onClick={resetCountdown}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Again
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
