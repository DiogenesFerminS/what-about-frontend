"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { Comment } from "@/interfaces/comments/commentData.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/context/modal/modal-context";
import LikeButton from "./like-button";
import { formatDate } from "@/helpers/formatDateSmart";
import { useAuthContext } from "@/context/auth/auth-context";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import DeleteModal from "./complementary/deleteModal";
import { deleteOpinionAction } from "@/actions/opinions";
import { toast } from "sonner";
import { getCommentsByOpinionAction } from "@/actions/comments";
import { FieldSeparator } from "@/components/ui/field";
import CommentsList from "./complementary/comments/commentsList";
import CustomHeader from "./complementary/cardhead/custom-header";

interface Props {
  opinion: Opinion,
  onDeleteOpinion: (id: string) => void;
}

const FeedCard = ({ opinion, onDeleteOpinion }: Props) => {
  const {
    user: { id },
    isLiked,
    likesCount
  } = opinion;

  const { user } = useAuthContext();

  const { openModal, closeModal } = useModalContext();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);

  const opinionDate = formatDate(opinion.createdAt);

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

  const handleDeleteOpinion = async () => {
    const resp = await deleteOpinionAction(opinion.id);
    const { success, error } = resp;
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

  const loadComments = async () => {
    const { success, data, error } = await getCommentsByOpinionAction(opinion.id, 1);

    if (!success && error) {
      toast.error(error, {
        position: 'top-right',
        duration: 3000,
      });

      return;
    };

    if (!data) {
      toast.error('Something went wrong', {
        position: 'top-right',
        duration: 3000,
      })
      return;
    }

    setComments(data.data);
    setShowComments(!showComments);
  }

  return (
    <>
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} handleDeleteOpinion={handleDeleteOpinion} />
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

            <CustomHeader 
              isMyOpinion={isMyOpinion} 
              opinion={opinion} 
              setDeleteModal={setDeleteModal} 
              key={opinion.id} 
            />
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
            <div className="w-full flex flex-col">

              <FieldSeparator />

              <div className="flex justify-between w-full mt-2">
                <div className="flex gap-2 items-center">
                  <LikeButton
                    initialCountLikes={likesCount}
                    initialIsLiked={isLiked}
                    opinionId={opinion.id}
                  />

                  <MessageSquare onClick={loadComments} />
                </div>
                <div>
                  <span className="text-violet-400 text-sm capitalize">
                    {opinionDate}
                  </span>
                </div>
              </div>
              {showComments && <CommentsList comments={comments} />}
            </div>

          </CardFooter>

        </Card>

      </div>

    </>
  );
};

export default FeedCard;
