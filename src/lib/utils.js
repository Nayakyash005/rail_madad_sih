import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function wait(ms, data) {
  return new Promise((res) => {
    setTimeout(() => res(data), ms);
  });
}

export const getStatusColor = (status) => {
  switch (status) {
    case "resolved":
      return "#0f0";
    case "pending":
      return "#ee0";
    case "rejected":
      return "#f00";
    case "in-Progress":
      return "#00f";
    default:
      return "gray";
  }
};