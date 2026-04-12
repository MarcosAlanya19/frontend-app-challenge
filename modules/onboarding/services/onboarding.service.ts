import { PersonalDataFormData } from "../schemas/personal-data.schema";

export async function registerPersonalData(
  _data: PersonalDataFormData,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Uncomment to test DUPLICATE_DNI error:
  // throw {
  //   success: false,
  //   data: { name: "DUPLICATE_DNI" as const, title: "DNI en uso", message: "El número de documento registrado ya está en uso." },
  // };
}
