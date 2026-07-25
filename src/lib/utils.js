import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  let cleanPath = path
    .replace(/^(\.\.\/)+public\//, "")
    .replace(/^\/public\//, "")
    .replace(/^\//, "");

  const baseUrl = import.meta.env.BASE_URL || "/";
  return baseUrl.endsWith("/") ? baseUrl + cleanPath : `${baseUrl}/${cleanPath}`;
}

