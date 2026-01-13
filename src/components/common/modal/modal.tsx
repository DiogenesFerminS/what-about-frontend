"use client"

import { useModalContext } from "@/context/modal/modal-context";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode,
};

const eventListener = "keydown";

const Modal = ({ children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {isOpen, closeModal} = useModalContext();

  const modalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal()
    };
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener(eventListener, handleEsc);
    };

    return () => {
      document.removeEventListener(eventListener, handleEsc);
    }
  }, [isOpen, handleEsc]);

  if(!isOpen || typeof window === undefined) {
    return null;
  };

  const modalRoot = document.getElementById("modal");
  if(!modalRoot) {
    return null;
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
        <div className="w-[80dvw] h-[80dvh] max-w-150 max-h-150 bg-white dark:bg-stone-900 rounded-lg shadow-xl relative animate-in fade-in zoom-in duration-300" ref={modalRef} onClick={modalClick}>
            {children}
        </div>

    </div>,
    modalRoot
  );
}

export default Modal