import { create } from "zustand";

type EmailState = {
  email: string;
  setEmail: (email: string) => void;
};

export const useEmailStore = create<EmailState>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));
