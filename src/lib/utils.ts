import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(input: string): string {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9-]/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, ""); // Remove hyphens from the beginning or end
}

export const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0, // Optional, adjust based on desired fraction digits
});
