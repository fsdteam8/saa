import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getColorClasses = (
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

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US").format(amount);
};
