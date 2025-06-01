import { Timestamp } from "firebase/firestore";
import { imageAllowedTypes } from "../types";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

// -----> Texts
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const transformToCamelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

// -----> Dates
export const transformToTimeStampDate = (
  date: string,
  time: string,
  setError: UseFormSetError<any>
) => {
  const [day, month, year] = date.split("/").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const finalDate = new Date(year, month - 1, day, hours, minutes);
  const expirationThreshold = new Date(Date.now() + 24 * 60 * 60 * 1000);

  if (finalDate < expirationThreshold) {
    setError("day", {
      type: "manual",
      message: "The event must be scheduled at least 24 hours in advance.",
    });
    return null;
  }

  const timestampDate = Timestamp.fromDate(finalDate);
  return timestampDate;
};

export const normalizeTime = (i: Date) => {
  const hours: number = i.getHours();
  const minutes: number = i.getMinutes();
  const paddedHours = hours < 10 ? `0${hours}` : hours;
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${paddedHours}:${paddedMinutes}h`;
};

export const normalizeDate = (i: Date) => {
  return i.toLocaleDateString(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export const normalizePlaces = (num: number) => {
  if (num === 0) {
    return "Unlimited";
  } else {
    return `${num}`;
  }
};

export const sameDay = (eventDate: Date, dateToCompare: Date) => {
  return (
    eventDate.getFullYear() === dateToCompare.getFullYear() &&
    eventDate.getMonth() === dateToCompare.getMonth() &&
    eventDate.getDate() === dateToCompare.getDate()
  );
};

// -----> Images
export const transformFileToDataUrl = async (
  file: File,
  setError: UseFormSetError<any>,
  fieldName: "eventPhoto" | "profilePhoto"
): Promise<string | null> => {
  if (!imageAllowedTypes.includes(file.type)) {
    setError(fieldName, {
      type: "manual",
      message: "Only images in WEBP, JPEG or PNG format are allowed.",
    });
    toast("Only images in WEBP, JPEG or PNG format are allowed.");
    return null;
  }

  if (file.size > 550 * 1024) {
    setError(fieldName, {
      type: "manual",
      message: "The image must not exceed 550 KB.",
    });
    toast("The image must not exceed 550 KB.");
    return null;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Error al leer el archivo"));
    };

    reader.readAsDataURL(file);
    console.log("image to dataUrl succes");
  });
};
