"use client"
import { createContext, useContext } from "react";

interface ModalContext {
  isOpen: boolean,
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void
};

export const ModalContext = createContext<ModalContext | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if(!context) {
    throw new Error("You are trying to use the context outside the provider. (MODAL PROVIDER)");
  }

  return context;
}