"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import LikeButton from "./like-button";
import { formatDate } from "@/helpers/formatDateSmart";
import { useAuthContext } from "@/context/auth/auth-context";
import { useState } from "react";
import { FieldSeparator } from "@/components/ui/field";
import CommentsList from "./complementary/comments/commentsList";
import CustomHeader from "./complementary/card/custom-header";
import CustomCardBody from "./complementary/card/custom-body";
import useComments from "@/hooks/comments/useComments";
import CommentsButtons from "./complementary/card/buttons/comments-buttons";

interface Props {
  opinion: Opinion,
  onDeleteOpinion: (id: string) => void;
  isDeleted: boolean;
}

const FeedCard = ({ opinion, onDeleteOpinion, isDeleted }: Props) => {
  const {
    user: { id },
    isLiked,
    likesCount
  } = opinion;

  const { user } = useAuthContext();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);

  const { 
    addComment, 
    comments, 
    loadMoreComments, 
    notMore, 
    isLoading, 
    commentsCount, 
    deleteComment,
    loadCommentsFirstTime
  } = useComments(opinion.id);
  
  const opinionDate = formatDate(opinion.createdAt);
  const isMyOpinion = id === user?.id;

  const handleShowComments = () => {
    if(!showComments && comments.length === 0) {
      loadCommentsFirstTime()
    }
    setShowComments(!showComments);
  }

  return (
    <>
      <div
        className={`
        transition-all duration-500 ease-in-out overflow-hidden
        ${isDeleted 
            ? "opacity-0 max-h-0 mb-0 scale-95 -translate-x-10"
            : "opacity-100 max-h-270 mb-4 scale-100 translate-x-0"
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
              deleteModal={deleteModal}
              onDeleteOpinion={onDeleteOpinion}
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

                  <CommentsButtons
                    handleShowComments={handleShowComments}
                    commentsCount={commentsCount}
                  />
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
                  deleteComment={deleteComment}
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
