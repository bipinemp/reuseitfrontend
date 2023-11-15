import { useState, useEffect } from "react";

function useFormatTime(inputDate: string): string | null {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    const formatDate = (date: Date): string => {
      const currentDate = new Date();
      const inputDateTime = new Date(date);

      // Check if the date is today
      if (
        inputDateTime.getDate() === currentDate.getDate() &&
        inputDateTime.getMonth() === currentDate.getMonth() &&
        inputDateTime.getFullYear() === currentDate.getFullYear()
      ) {
        return "TODAY";
      }

      // Check if the date is yesterday
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);

      if (
        inputDateTime.getDate() === yesterday.getDate() &&
        inputDateTime.getMonth() === yesterday.getMonth() &&
        inputDateTime.getFullYear() === yesterday.getFullYear()
      ) {
        return "YESTERDAY";
      }

      // Format the date using Intl.DateTimeFormat
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = formatter.format(inputDateTime);

      // Check if the year is the current year
      if (inputDateTime.getFullYear() === currentDate.getFullYear()) {
        return formattedDate;
      } else {
        return `${formattedDate} ${inputDateTime.getFullYear()}`;
      }
    };

    try {
      const parsedDate = new Date(inputDate);
      const result = formatDate(parsedDate);
      setFormattedDate(result);
    } catch (error) {
      console.error("Invalid date format:", error);
      setFormattedDate(null);
    }
  }, [inputDate]);

  return formattedDate;
}

export default useFormatTime;
