"use client"
import { getCommentsByOpinionAction } from "@/actions/comments";
import { Comment } from "@/interfaces/comments/commentData.interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useComments = (opinionId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number>(1);
    const [notMore, setNotMore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const resetHook = () => {
            setComments([]);
            setCommentPage(1);
            setNotMore(false);
        };

        resetHook();
    }, [opinionId]);

    const loadComments = async (page: number) => {
        if (isLoading) return;
        setIsLoading(true);
        const { success, data, error } = await getCommentsByOpinionAction(opinionId, page);
    
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
    
        const {data:newComments} = data;
        if(newComments.length === 0) {
          setNotMore(true);
          setIsLoading(false);
          return;
        };
    
        setComments((prev) => [...prev, ...newComments]);
        setCommentPage(page);
        setIsLoading(false);
      }
    
      const addComment = (comment: Comment) => {
        setComments((prev) => [comment, ...prev ]);
      }
    
      const loadMoreComments = () => {
        loadComments(commentPage + 1);
      }
    
  return {
    addComment,
    loadComments,
    comments,
    isLoading,
    notMore,
    loadMoreComments
  }
}

export default useComments