"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import LikeButton from "./like-button";
import { formatDate } from "@/helpers/formatDateSmart";
import { useAuthContext } from "@/context/auth/auth-context";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import DeleteModal from "./complementary/deleteModal";
import { deleteOpinionAction } from "@/actions/opinions";
import { toast } from "sonner";
import { FieldSeparator } from "@/components/ui/field";
import CommentsList from "./complementary/comments/commentsList";
import CustomHeader from "./complementary/card/custom-header";
import CustomCardBody from "./complementary/card/custom-body";
import useComments from "@/hooks/comments/useComments";

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

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showComments, setShowComments] = useState<boolean>(false);

  const {addComment, comments, loadComments, loadMoreComments, notMore, isLoading} = useComments(opinion.id);
  

  const opinionDate = formatDate(opinion.createdAt);


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

  const handleShowComments = () => {
    if(!showComments && comments.length === 0) {
      loadComments(1);
    }

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
            <CustomCardBody opinion={opinion}/>
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

                  <MessageSquare onClick={handleShowComments} />
                </div>
                <div>
                  <span className="text-violet-400 text-sm capitalize">
                    {opinionDate}
                  </span>
                </div>
              </div>
              {showComments &&
                <CommentsList 
                  comments={comments} 
                  opinionId={opinion.id} 
                  addComment={addComment} 
                  loadMoreComments={loadMoreComments}
                  notMore={notMore}
                  isLoading={isLoading}
                />
              }
            </div>

          </CardFooter>

        </Card>

      </div>

    </>
  );
};

export default FeedCard;
