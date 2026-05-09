import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Joins class names (clsx syntax) and lets later Tailwind classes override
// conflicting earlier ones, so a component's `className` prop wins.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
