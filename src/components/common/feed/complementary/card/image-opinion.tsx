"use client"
import { useModalContext } from "@/context/modal/modal-context";
import Image from "next/image";
import { Button } from "../../../../ui/button";

interface Props {
  imageUrl: string;
}

const ImageOpinion = ({ imageUrl }: Props) => {
  const { openModal, closeModal } = useModalContext();

  const openModalPreview = () => {
    if (!imageUrl) {
      return null;
    }

    openModal(
      <div className="flex flex-col relative w-full h-full">
        <Image
          src={imageUrl}
          alt={`Imagen about opinion`}
          fill
          className="object-contain p-1 rounded-lg"
          sizes="100%"
        />

        <Button
          className="absolute top-0 right-0"
          variant={"ghost"}
          onClick={() => closeModal()}
        >
          X
        </Button>
      </div>,
    );
  };

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border bg-muted mt-3">
      <Image
        onClick={openModalPreview}
        src={imageUrl}
        alt="Image post"
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />
    </div>
  );
};

export default ImageOpinion;
