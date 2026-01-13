"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/context/modal/modal-context";
import LikeButton  from "./like-button";
import { formatDate } from "@/helpers/formatDateSmart";

const FeedCard = (opinion: Opinion) => {
  const {
    user: { name, username, avatarUrl },
    isLiked,
    likesCount
  } = opinion;

  const { openModal, closeModal } = useModalContext();

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

  return (
    <>
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
                <span className="font-semibold text-lg hover:underline capitalize">
                  {username}
                </span>
                <span className="text-sm text-gray-500">{name ?? "--"}</span>
              </div>

            </div>

            <div>
              <span className="text-violet-400 text-sm capitalize">{opinionDate}</span>
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
          <div>
            <LikeButton
              initialCountLikes={likesCount}
              initialIsLiked={isLiked}
              opinionId={opinion.id}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default FeedCard;
