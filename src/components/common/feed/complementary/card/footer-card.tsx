"use client"
import useComments from "@/hooks/comments/useComments"
import LikeButton from "../../like-button";
import CommentsButtons from "./buttons/comments-buttons";
import { useState } from "react";
import CommentsList from "../comments/commentsList";
import { FieldSeparator } from "../../../../ui/field";
import { formatDate } from "@/helpers/formatDateSmart";

interface Props {
  initialIsLiked: boolean,
  initialCountLikes: number,
  opinionId: string,
  createdAt: string,
}

const FooterCard = ({opinionId, initialCountLikes, initialIsLiked, createdAt}: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const {addComment, comments,commentsCount, deleteComment, isLoading, loadCommentsFirstTime, loadMoreComments,notMore} = useComments(opinionId);

  const opinionDate = formatDate(createdAt);

  const handleShowComments = () => {
    if(!showComments && comments.length === 0) {
      loadCommentsFirstTime()
    }
    setShowComments(!showComments);
  }

  return (
            <div className="w-full flex flex-col mt-2">

              <FieldSeparator />

              <div className="flex justify-between w-full mt-2">
                <div className="flex gap-2 items-center">
                  <LikeButton
                    initialCountLikes={initialCountLikes}
                    initialIsLiked={initialIsLiked}
                    opinionId={opinionId}
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
                  opinionId={opinionId} 
                  addComment={addComment} 
                  loadMoreComments={loadMoreComments}
                  notMore={notMore}
                  isLoading={isLoading}
                  deleteComment={deleteComment}
                />
              }
            </div>
  )
}

export default FooterCard