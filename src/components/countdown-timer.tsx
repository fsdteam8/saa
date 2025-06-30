"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { CountdownTimerProps } from "@/types/countdown";
import { Repeat } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { handleClickConfetti, runConfettiAnimation } from "./fn";
import { ConfettiRef } from "./magicui/confetti";
import { Button } from "./ui/button";
import { CompletionDisplay } from "./ui/completion-display";
import { CountdownDisplay } from "./ui/countdown-display";

export default function CountdownTimer({
  initialCount = 50,
  deliveredAmount = 150000,
  currency = "$",
  countdownTitle = "Countdown Timer",
  countdownMessage = "Get ready gyes from something amazing...",
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
      handleClickConfetti();
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

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br bg-white overflow-hidden">
      <ConfettiAnimation show={showConfettiAnimation} />

      <Card className="w-full max-w-md mx-4 shadow-none border-0 bg-transparent backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          {!isComplete ? (
            <CountdownDisplay
              count={count}
              countdownTitle={countdownTitle}
              countdownMessage={countdownMessage}
              primaryColor={primaryColor}
            />
          ) : (
            <CompletionDisplay
              completionTitle={completionTitle}
              deliveredAmount={deliveredAmount}
              currency={currency}
              successColor={successColor}
              confettiRef={confettiRef}
            />
          )}
        </CardContent>
      </Card>

      <p className="text-[40px] bg-gradient-to-r from-green-700 to-yellow-400 bg-clip-text text-transparent font-bold absolute left-1/2 bottom-[100px] transform -translate-x-1/2">
        Scale Up Ads Agency
      </p>

      {showResetButton && isComplete && (
        <ResetButton
          onClick={resetCountdown}
          resetButtonText={resetButtonText}
        />
      )}
    </div>
  );
}

// components/CountdownTimer/ConfettiAnimation.tsx
function ConfettiAnimation({ show }: { show: boolean }) {
  if (!show) return null;

  return (
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
  );
}

// components/CountdownTimer/ResetButton.tsx
function ResetButton({
  onClick,
  resetButtonText,
}: {
  onClick: () => void;
  resetButtonText: string;
}) {
  return (
    <Button
      variant="outline"
      className="right-0 absolute bottom-2 text-black cursor-pointer"
      onClick={onClick}
    >
      <Repeat className="mr-2" /> {resetButtonText}
    </Button>
  );
}
