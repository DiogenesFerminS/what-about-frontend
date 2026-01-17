"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/context/modal/modal-context";
import LikeButton  from "./like-button";
import { formatDate } from "@/helpers/formatDateSmart";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth/auth-context";
import { Pencil, Settings, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import DeleteModal from "./complementary/deleteModal";
import { deleteOpinionAction } from "@/actions/opinions";
import { toast } from "sonner";

interface Props {
  opinion: Opinion,
  onDeleteOpinion: (id: string) => void;
}

const FeedCard = ({opinion, onDeleteOpinion}: Props) => {
  const {
    user: { id, name, username, avatarUrl },
    isLiked,
    likesCount
  } = opinion;

  const {user} = useAuthContext();

  const { openModal, closeModal } = useModalContext();
  const [ deleteModal, setDeleteModal ] = useState<boolean>(false);
  const [ isVisible, setIsVisible] = useState<boolean>(true)
  const router = useRouter();

  const opinionDate = formatDate(opinion.createdAt);

  const openModalPreview = () => {
    if(!opinion.imageUrl) {
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

  const handleProfile = () => {
    router.push(`/wa/profile/${id}`);
  }

  const handleDeleteOpinion = async () => {
    const resp = await deleteOpinionAction(opinion.id);
    const { success, error} = resp;
    if (!success && error) {
      toast.error(error, {
        position: 'top-right',
        duration: 3000,
      });
      return
    }

    setIsVisible(false);

    setTimeout(() => {
      onDeleteOpinion(opinion.id);
      toast.success('Opinion successfully removed', {
        position: 'top-right',
        duration: 3000,
      });
    }, 2000)
  }

  const isMyOpinion = id === user?.id;

  return (
    <>
     <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} handleDeleteOpinion={handleDeleteOpinion}/>
     <div
      className={`
        transition-all duration-500 ease-in-out overflow-hidden
        ${isVisible 
          ? "opacity-100 max-h-250 mb-4 scale-100 translate-x-0"
          : "opacity-0 max-h-0 mb-0 scale-95 -translate-x-10"
        }
      `}
    >
       <Card className="my-2">
        <CardHeader>
          <div className="flex justify-between items-start w-full select-none">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>
                  {username.split("")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span
                  className="font-semibold text-lg hover:underline capitalize"
                  onClick={handleProfile}
                >
                  {username}
                </span>
                <span className="text-sm text-gray-500">{name ?? "--"}</span>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              {opinion.isEdited ? (
                <span className="text-sm text-orange-400 uppercase">
                  Edited
                </span>
              ) : (
                <></>
              )}
              {isMyOpinion ? (
                <div className="hover:bg-gray-300/10 rounded-full">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="p-1">
                      <Settings />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="m-2">
                      <DropdownMenuItem
                        onClick={() => setDeleteModal(true)}
                      >
                        <div 
                          className="flex items-center"
                        >
                          <Trash className="text-red-500" />
                          <div className="ml-2">
                            <span>Delete</span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(`/wa/opinions/update/${opinion.id}`)
                        }}
                      >
                        <div className="flex items-center">
                          <Pencil />
                          <div className="ml-2">
                            <span>Edit</span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full">
            <div>
              <LikeButton
                initialCountLikes={likesCount}
                initialIsLiked={isLiked}
                opinionId={opinion.id}
              />
            </div>
            <div>
              <span className="text-violet-400 text-sm capitalize">
                {opinionDate}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>

    </div>
     
    </>
  );
};

export default FeedCard;
