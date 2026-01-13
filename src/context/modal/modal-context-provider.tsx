"use client"
import { useState } from "react";
import { ModalContext } from "./modal-context";
import Modal from "@/components/common/modal/modal";

interface Props {
  children: React.ReactNode
};

export const ModalProvider = ({children}: Props ) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
        {children}
        <GlobalModalWrapper content={modalContent}/>
    </ModalContext.Provider>
  )  
}

const GlobalModalWrapper = ({content}: {content: React.ReactNode}) => {
  return <Modal>{content}</Modal>
}