import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"
import { bn } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  const formattedDatePart = format(date, "MMMM do, yyyy",{ locale: bn });
  const intlFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedTimePart = intlFormatter.format(date);
  return `${formattedDatePart} ${formattedTimePart}`;
}
