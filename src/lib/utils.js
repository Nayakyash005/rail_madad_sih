import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function wait(ms, data) {
    return new Promise((res) => {
        setTimeout(() => res(data), ms)
    });
}
