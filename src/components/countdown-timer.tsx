"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { CountdownTimerProps } from "@/types/countdown";
import confetti from "canvas-confetti";
import { Repeat } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Confetti, ConfettiRef } from "./magicui/confetti";
import { Button } from "./ui/button";

export default function CountdownTimer({
  initialCount = 10,
  deliveredAmount = 10000,
  currency = "$",
  countdownTitle = "Countdown Timer",
  countdownMessage = "Get ready for something amazing...",
  completionTitle = "Congratulations!",
  showConfetti = true,
  confettiDuration = 60000,
  primaryColor = "blue",
  successColor = "green",
  onComplete,
  onTick,
  showResetButton = true,
  resetButtonText = "Start Again",
}: CountdownTimerProps) {
  const [count, setCount] = useState(initialCount);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfettiAnimation, setShowConfettiAnimation] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  const handleClick = () => {
    const end = Date.now() + 30 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const runConfettiAnimation = () => {
    const duration = 120 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        const newCount = count - 1;
        setCount(newCount);
        onTick?.(newCount);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && !isComplete) {
      setIsComplete(true);
      handleClick();
      runConfettiAnimation();
      onComplete?.(deliveredAmount);

      if (showConfetti) {
        setShowConfettiAnimation(true);
        setTimeout(() => setShowConfettiAnimation(false), confettiDuration);
      }
    }
  }, [
    count,
    isComplete,
    deliveredAmount,
    onComplete,
    onTick,
    showConfetti,
    confettiDuration,
  ]);

  const resetCountdown = () => {
    setCount(initialCount);
    setIsComplete(false);
    setShowConfettiAnimation(false);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US").format(amount);
  };

  const getColorClasses = (
    color: string,
    type: "text" | "bg" | "border" | "hover"
  ) => {
    const colorMap: Record<string, Record<string, string>> = {
      blue: {
        text: "text-blue-600",
        bg: "bg-blue-600",
        border: "border-blue-200",
        hover: "hover:bg-blue-700",
      },
      green: {
        text: "text-green-600",
        bg: "bg-green-600",
        border: "border-green-200",
        hover: "hover:bg-green-700",
      },
      purple: {
        text: "text-purple-600",
        bg: "bg-purple-600",
        border: "border-purple-200",
        hover: "hover:bg-purple-700",
      },
      red: {
        text: "text-red-600",
        bg: "bg-red-600",
        border: "border-red-200",
        hover: "hover:bg-red-700",
      },
    };
    return colorMap[color]?.[type] || colorMap.blue[type];
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00B22D]/10 to-[#FFC300]/10 overflow-hidden">
      {/* Confetti Animation */}
      {showConfettiAnimation && (
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

      <Card className="w-full max-w-md mx-4 shadow-none border-0 bg-transparent backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          {!isComplete ? (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {countdownTitle}
              </h1>
              <div className="relative">
                <div
                  className={`text-8xl font-bold ${getColorClasses(
                    primaryColor,
                    "text"
                  )} mb-4 animate-pulse`}
                >
                  {count}
                </div>
              </div>
              <p className="text-gray-600 text-lg">{countdownMessage}</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="text-6xl mb-4">🎉</div>
              <Confetti
                ref={confettiRef}
                className="absolute left-0 top-0 z-0 size-full"
              />
              <h1
                className={`text-3xl font-bold ${getColorClasses(
                  successColor,
                  "text"
                )} mb-4`}
              >
                {completionTitle}
              </h1>
              <div className="bg-gradient-to-r from-[#00B22D] to-[#FFC300] text-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl font-bold">
                  {currency}
                  {formatAmount(deliveredAmount)}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showResetButton && isComplete && (
        <Button
          variant="outline"
          className="right-0 absolute bottom-2 text-black cursor-pointer"
          onClick={resetCountdown}
        >
          <Repeat className="mr-2" /> {resetButtonText}
        </Button>
      )}

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
