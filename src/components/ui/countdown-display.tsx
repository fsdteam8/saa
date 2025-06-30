// components/CountdownTimer/CountdownDisplay.tsx

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
}: CountdownDisplayProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {countdownTitle}
      </h1>
      <div className="relative">
        <div
          className={`text-[150px] font-bold bg-gradient-to-r from-green-700 to-yellow-400 bg-clip-text text-transparent  mb-4 animate-pulse`}
        >
          {count}
        </div>
      </div>
      <p className="text-gray-600 text-lg">{countdownMessage}</p>
    </div>
  );
}
