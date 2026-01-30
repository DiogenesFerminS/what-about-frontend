"use client";

import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import LikeButton from "../common/feed/like-button";
import useComments from "@/hooks/comments/useComments";
import { formatDate } from "@/helpers/formatDateSmart";
import { FieldSeparator } from "../ui/field";
import CommentsButton from "../common/feed/complementary/card/buttons/comment-buttons";
import { useState } from "react";
import CommentsList from "../common/feed/complementary/comments/commentsList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Pencil, Settings, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth/auth-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { deleteOpinionAction } from "@/actions/opinions";
import { toast } from "sonner";

interface Props {
  opinion: Opinion;
}

const SimpleFooter = ({ opinion }: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const {
    loadCommentsFirstTime,
    comments,
    commentsCount,
    addComment,
    isLoading,
    loadMoreComments,
    notMore,
    deleteComment,
  } = useComments(opinion.id);

  const opinionDate = formatDate(opinion.createdAt);
  const { user } = useAuthContext();

  const handleShowComments = () => {
    if (!showComments && comments.length === 0) {
      loadCommentsFirstTime();
    }
    setShowComments(!showComments);
  };

  const router = useRouter();
  const isRepost = !!opinion.originalOpinion;
  const isMyOpinion = opinion.user.id === user?.id;

  const handleDeletePost = async () => {
    const {success, error} = await deleteOpinionAction(opinion.id)

    if(!success && error) {
      toast(error, {
        position: 'top-right',
        duration: 3000,
      });
      return
    };

    toast.success('post successfully deleted', {
      position: 'top-right',
      duration: 2000,
    });

    setTimeout(() => {
      router.refresh();
      router.back();
    }, 500);
  }

  return (
    <>
      <AlertDialog open={showDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you absolutely sure you want to delete the Opinion? This action cannot be reversed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeletePost()
              }}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

            {isMyOpinion && (
              <div className="hover:bg-gray-300/10 rounded-full">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger
                    className="p-1"
                    aria-label="config-button"
                  >
                    <Settings />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="m-2">
                    <DropdownMenuItem
                      onClick={() => {
                        router.push(
                          `/wa/opinions/update/${opinion.id}${isRepost ? "?repost=true" : ""}`,
                        );
                      }}
                    >
                      <div className="flex items-center">
                        <Pencil />
                        <div className="ml-2">
                          <span>Edit</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setShowDeleteModal(true);
                      }}
                    >
                      <div className="flex items-center">
                        <Trash className="text-red-600" />
                        <div className="ml-2">
                          <span>Delete</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
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
    </>
  );
};

export default SimpleFooter;
