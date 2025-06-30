// components/CountdownTimer/CompletionDisplay.tsx
import { formatAmount, getColorClasses } from "@/lib/utils";
import { Confetti, ConfettiRef } from "../magicui/confetti";

interface CompletionDisplayProps {
  completionTitle: string;
  deliveredAmount: number;
  currency: string;
  successColor: string;
  confettiRef: React.RefObject<ConfettiRef>;
}

export function CompletionDisplay({
  completionTitle,
  deliveredAmount,
  currency,
  successColor,
  confettiRef,
}: CompletionDisplayProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-6xl mb-4">🎉</div>
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
      />
      <h1
        className={`text-4xl text-center font-bold ${getColorClasses(
          successColor,
          "text"
        )} mb-8`}
      >
        {completionTitle}
      </h1>
      <div className="bg-gradient-to-r from-[#00B22D] to-[#FFC300] text-white px-8 py-3 rounded-lg shadow-lg  w-fit">
        <div className="text-[80px] font-bold ">
          {currency}
          {formatAmount(deliveredAmount)}
        </div>
      </div>
    </div>
  );
}
