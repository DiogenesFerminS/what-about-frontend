"use client";

import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import LikeButton from "../common/feed/like-button";
import useComments from "@/hooks/comments/useComments";
import { formatDate } from "@/helpers/formatDateSmart";
import { FieldSeparator } from "../ui/field";
import CommentsButton from "../common/feed/complementary/card/buttons/comment-buttons";
import { useState } from "react";
import CommentsList from "../common/feed/complementary/comments/commentsList";

interface Props {
  opinion: Opinion;
}

const SimpleFooter = ({opinion}: Props) => {

  const [showComments, setShowComments] = useState<boolean>(false)
  const {
    loadCommentsFirstTime, 
    comments, 
    commentsCount, 
    addComment, 
    isLoading, 
    loadMoreComments, 
    notMore, 
    deleteComment
  } = useComments(opinion.id);

  const opinionDate = formatDate(opinion.createdAt);

    const handleShowComments = () => {
    if (!showComments && comments.length === 0) {
      loadCommentsFirstTime();
    }
    setShowComments(!showComments);
  };

  return (
   <div className="w-full flex flex-col mt-2">
      <FieldSeparator />

      <div className="flex justify-between w-full mt-2">
        <div className="flex gap-2 items-center">
          <LikeButton
            initialCountLikes={opinion.likesCount}
            initialIsLiked={opinion.isLiked}
            opinionId={opinion.id}
          />

          <CommentsButton
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
      {showComments && (
        <CommentsList
          comments={comments}
          opinionId={opinion.id}
          addComment={addComment}
          loadMoreComments={loadMoreComments}
          notMore={notMore}
          isLoading={isLoading}
          deleteComment={deleteComment}
        />
      )}
    </div>
  )
}

export default SimpleFooter