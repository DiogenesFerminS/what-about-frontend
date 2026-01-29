"use client";
import useComments from "@/hooks/comments/useComments";
import LikeButton from "../../like-button";
import CommentsList from "../comments/commentsList";
import { FieldSeparator } from "../../../../ui/field";
import { formatDate } from "@/helpers/formatDateSmart";
import RepostButton from "./buttons/repost-button";
import CommentsButton from "./buttons/comment-buttons";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { useRouter } from "next/navigation";
import { deleteRepostAction } from "@/actions/reposts";
import { toast } from "sonner";
import useRepostState from "@/hooks/feed/useRepostState";
import { useState } from "react";
interface Props {
  opinion: Opinion;
}

const FooterCard = ({ opinion }: Props) => {

  const {
    id,
    createdAt,
    isLiked: initialIsLiked,
    likesCount: initialCountLikes,
  } = opinion;
  const [showComments, setShowComments] = useState<boolean>(false);
  const opinionDate = formatDate(createdAt);

  const {
    addComment,
    comments,
    commentsCount,
    deleteComment,
    isLoading,
    loadCommentsFirstTime,
    loadMoreComments,
    notMore,
  } = useComments(id);

  const router = useRouter();

  const targetId = opinion.originalOpinion ? opinion.originalOpinion.id : opinion.id;

  const {isReposted, toggleRepost, repostCount} = useRepostState(targetId, opinion.isRepostedByMe, opinion.repostCount);

  const handleShowComments = () => {
    if (!showComments && comments.length === 0) {
      loadCommentsFirstTime();
    }
    setShowComments(!showComments);
  };

  const handleRepost = async () => {
    if(!isReposted){
      router.push(`/wa/repost/${opinion.id}`);
    }else {
      const {success, error} = await deleteRepostAction(targetId)
      toggleRepost(false);
      if (!success && error) {
        toast.error(error, {
          duration: 3000,
          position: 'top-right',
        });
        return;
      }

      toast.success('Repost deleted', {
        duration: 3000,
        position: 'top-right'
      })
    }
  }

  return (
    <div className="w-full flex flex-col mt-2">
      <FieldSeparator />

      <div className="flex justify-between w-full mt-2">
        <div className="flex gap-2 items-center">
          <LikeButton
            initialCountLikes={initialCountLikes}
            initialIsLiked={initialIsLiked}
            opinionId={id}
          />

          <CommentsButton
            handleShowComments={handleShowComments}
            commentsCount={commentsCount}
          />

          <RepostButton
            isRepostedByMe={isReposted}
            repostNumber={repostCount}
            handleRepost={handleRepost}
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
          opinionId={id}
          addComment={addComment}
          loadMoreComments={loadMoreComments}
          notMore={notMore}
          isLoading={isLoading}
          deleteComment={deleteComment}
        />
      )}
    </div>
  );
};

export default FooterCard;
