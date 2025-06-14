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

export const randomRating = (): number => {
  return Math.floor(Math.random() * 5) + 1;
};

// -----> Location

export const transformToCoordinates = async (address: string) => {
  const encodedQuery = encodeURIComponent(address);
  const token =
    "pk.eyJ1IjoiYWdpbmVyIiwiYSI6ImNtYm5mcjVuZTFnb3YyanBqaTZkcTUwNW0ifQ.8Xfzx_-MoX4V_uvM_Hhtkw";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${token}&language=es&country=us&proximity=-74.0060,40.7128&limit=1`;

  try {
    const mapBoxResponse = await fetch(url);

    if (!mapBoxResponse.ok) {
      throw new Error(`Error HTTP: ${mapBoxResponse.status}`);
    }

    const dataJson = await mapBoxResponse.json();

    if (dataJson.features && dataJson.features.length > 0) {
      const [longitud, latitud] = dataJson.features[0].center;
      const fullAddress = dataJson.features[0].place_name;
      console.log("Latitud:", latitud);
      console.log("Longitud:", longitud);

      return { latitud, longitud, fullAddress };
    } else {
      throw new Error("No se encontraron resultados geográficos.");
    }
  } catch {
    console.error("Ocurrió un error al obtener coordenadas:");
    return null;
  }
};

// -----> Scroll
export const blockScroll = () => {
  if (window.innerWidth < 995) {
    document.body.style.overflow = "hidden";
  }
};

export const allowScroll = () => {
  if (window.innerWidth < 995) {
    document.body.style.overflow = " ";
  }
};

export const blockXOverflow = () => {
  document.body.style.overflowX = "hidden";
};

export const allowXOverflow = () => {
  document.body.style.overflow = "";
};
