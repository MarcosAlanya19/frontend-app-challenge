import { create } from "zustand";
import { APIError } from "@/types";

type ErrorData = APIError["data"];

interface ErrorState {
  error: ErrorData | null;
  showError: (error: ErrorData) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  showError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
