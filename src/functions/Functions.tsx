export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
