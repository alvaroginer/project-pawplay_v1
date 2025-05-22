import { Timestamp } from "firebase/firestore";

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

export const transformToTimeStampDate = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  const finalDate = new Date(year, month - 1, day);
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

export const transformFileToDataUrl = async (
  file: File
): Promise<string | null> => {
  if (file.size > 250 * 1024) {
    alert("La imagen no puede superar los 250 KB");
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
  });
};
