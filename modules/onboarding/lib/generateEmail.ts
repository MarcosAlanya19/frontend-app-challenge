export const generateEmail = (fullName: string): string => {
  return `${fullName.split(" ")[0].toLowerCase()}@kambista.com`;
};
