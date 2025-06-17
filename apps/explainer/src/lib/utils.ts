import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}a// Import clsx for conditional class name merging
import { clsx, type ClassValue } from "clsx"

// Import tailwind-merge to intelligently merge Tailwind CSS classes
import { twMerge } from "tailwind-merge"

/**
 * Combines class names conditionally and resolves Tailwind CSS class conflicts.
 * 
 * @param inputs - An array of class values which can be strings, objects, arrays, etc.
 * @returns A single string with merged and deduplicated class names.
 * 
 * Example usage:
 * ```tsx
 * <div className={cn("p-2", isActive && "bg-blue-500", "p-4")} />
 * // Output: "bg-blue-500 p-4" — note that "p-2" is overridden by "p-4"
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  // Step 1: clsx processes the inputs into a single string (handles conditionals, arrays, etc.)
  const classString = clsx(inputs)

  // Step 2: twMerge resolves Tailwind class name conflicts like 'p-2' vs 'p-4'
  return twMerge(classString)
}

