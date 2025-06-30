// components/CountdownTimer/CountdownDisplay.tsx
import { getColorClasses } from "@/lib/utils";

interface CountdownDisplayProps {
  count: number;
  countdownTitle: string;
  countdownMessage: string;
  primaryColor: string;
}

export function CountdownDisplay({
  count,
  countdownTitle,
  countdownMessage,
  primaryColor,
}: CountdownDisplayProps) {
  return (
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
  );
}
