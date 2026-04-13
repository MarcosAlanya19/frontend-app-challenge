import bankAccounts from "@/mocks/bankAccounts.json";
import { EDocumentType } from "@/enums/document-type";

export const DOC_TYPE_OPTIONS = [
  { label: "DNI", value: EDocumentType.DNI },
  { label: "CCE", value: EDocumentType.CE },
  { label: "Pasaporte", value: EDocumentType.PASAPORTE },
];

export const PREVIOUS_EXCHANGE_OPTIONS = bankAccounts.map((bank) => ({
  label: bank.alias,
  value: bank.id,
}));
