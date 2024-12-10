import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import { convertNumbers } from "./convert-numbers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const banglaFormattedDate = (date: Date | string) => {
  return convertNumbers(format(new Date(date), "PP", { locale: bn }));
};

