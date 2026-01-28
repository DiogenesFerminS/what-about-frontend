"use client"
import { getCommentsByOpinionAction, getCommentsCountByOpinionAction } from "@/actions/comments";
import { deleteCommentAction } from "@/actions/comments/deleteComment";
import { Comment } from "@/interfaces/comments/commentData.interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useComments = (opinionId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number>(1);
    const [notMore, setNotMore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [commentsCount, setCommentsCount] = useState<number>(0);

    useEffect(() => {
        const resetHook = () => {
            setComments([]);
            setCommentPage(1);
            setNotMore(false);
            setCommentsCount(0);
        };

        resetHook();
    }, [opinionId]);

    useEffect(() => {
        const loadCommentsCount = async () => {
          const { success, data, error } = await getCommentsCountByOpinionAction(opinionId);

          if(!success && error) {
            toast.error(error, {
                position: 'top-right',
                duration: 3000,
            });
            return 
          }

          if (success && data) {
            setCommentsCount(data.count);
          }
        };
        
        loadCommentsCount();
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
    
        const {data:newComment} = data;
        if(newComment.length === 0) {
          setNotMore(true);
          setIsLoading(false);
          return;
        };

        setComments((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));

          const newValidComment = newComment.filter((c) => !existingIds.has(c.id));

          return [...prev, ...newValidComment];
        });
        setCommentPage(page);
        setIsLoading(false);
      }
    
      const addComment = (comment: Comment) => {
        setComments((prev) => [comment, ...prev]);
        setCommentsCount(prev => prev + 1);
      }

      const deleteComment = async (commentId: string) => {
        const { success, error } = await deleteCommentAction(commentId);
          if(!success && error) {
            toast.error(error, {
              position: 'top-right',
              duration: 3000,
            });
            return
          };
          setComments((prev) => prev.filter(comment => comment.id !== commentId));
          setCommentsCount(prev => Math.max(0, prev - 1));
        
      }

      const loadCommentsFirstTime = () => {
        loadComments(commentPage);
      }
    
      const loadMoreComments = () => {
        loadComments(commentPage + 1);
      }
    
  return {
    addComment,
    deleteComment,
    loadComments,
    comments,
    isLoading,
    notMore,
    commentsCount,
    loadMoreComments,
    loadCommentsFirstTime,
  }
}

export default useComments