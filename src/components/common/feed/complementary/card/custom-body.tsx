import { Button } from '@/components/ui/button';
import { useModalContext } from '@/context/modal/modal-context';
import { Opinion } from '@/interfaces/opinions/opinionData.interface';
import Image from 'next/image'

interface Props {
    opinion: Opinion;
};

const CustomCardBody = ({opinion}: Props) => {

    const { openModal, closeModal } = useModalContext();

    const openModalPreview = () => {
        if (!opinion.imageUrl) {
            return null;
        }

        openModal(
            <div className="flex flex-col relative w-full h-full">
                <Image
                    src={opinion.imageUrl}
                    alt="Imagen post"
                    fill
                    className="object-contain p-1 rounded-lg"
                    sizes="100%"
                />

                <Button
                    className="absolute top-0 right-0" variant={"ghost"}
                    onClick={() => closeModal()}
                >X</Button>
            </div>
        )
    }

    return (
        <>
            <div>
                <p>{opinion.content}</p>
            </div>
            {opinion.imageUrl && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border bg-muted mt-3">
                    <Image
                        onClick={openModalPreview}
                        src={opinion.imageUrl}
                        alt="Image post"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                </div>
            )}
        </>
    )
}

export default CustomCardBody