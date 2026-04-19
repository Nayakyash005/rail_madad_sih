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

export const formatDateToDDMMYYYY = (dateInput) => {
  if (!dateInput) return "03-04-2024";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return dateInput;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
