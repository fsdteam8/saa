export interface CountdownTimerProps {
  /** Initial countdown value (default: 10) */
  initialCount?: number;
  /** Amount to display on completion (default: 150000) */
  deliveredAmount?: number;
  /** Currency symbol (default: '$') */
  currency?: string;
  /** Title text during countdown */
  countdownTitle?: string;
  /** Message during countdown */
  countdownMessage?: string;
  /** Completion title */
  completionTitle?: string;
  /** Completion message prefix */
  completionMessage?: string;
  /** Enable confetti animation (default: true) */
  showConfetti?: boolean;
  /** Confetti duration in milliseconds (default: 3000) */
  confettiDuration?: number;
  /** Primary color theme */
  primaryColor?: string;
  /** Success color theme */
  successColor?: string;
  /** Callback function when countdown completes */
  onComplete?: (amount: number) => void;
  /** Callback function on each countdown tick */
  onTick?: (currentCount: number) => void;
  /** Show reset button (default: true) */
  showResetButton?: boolean;
  /** Custom reset button text */
  resetButtonText?: string;
}
