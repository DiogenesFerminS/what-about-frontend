import { format, formatDistanceToNow, differenceInHours } from "date-fns";

export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const now = new Date();

  if (differenceInHours(now, date) < 24) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  if (date.getFullYear() === now.getFullYear()) {
    return format(date, "MMM d");
  }

  return format(date, "PP"); 
};