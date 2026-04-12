import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

/** Formats raw digit input into DD/MM/YYYY as the user types */
export const formatDate = (text: string): string => {
  const digits = text.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

/** Parses a DD/MM/YYYY string into a dayjs instance */
export const parseDMY = (date: string) => dayjs(date, "DD/MM/YYYY", true);

/** Returns true if the DD/MM/YYYY string is a valid date */
export const isValidDate = (date: string) => parseDMY(date).isValid();

/** Returns the age in years from a DD/MM/YYYY date string */
export const getAge = (date: string) => dayjs().diff(parseDMY(date), "year");

/** Converts a Date object to DD/MM/YYYY string */
export const dateToDMY = (date: Date): string =>
  dayjs(date).format("DD/MM/YYYY");

/** Converts a DD/MM/YYYY string to a Date object (returns today if invalid) */
export const dmyToDate = (dmy: string): Date =>
  isValidDate(dmy) ? parseDMY(dmy).toDate() : new Date();
