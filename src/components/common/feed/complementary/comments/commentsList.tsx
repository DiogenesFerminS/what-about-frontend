"use client"

import { Comment } from "@/interfaces/comments/commentData.interface";
import CommentItem from "./commentItem";

interface Props {
    comments: Comment[];
}

const CommentsList = ({ comments }: Props) => {

    if (comments.length === 0) {
        return (
            <div className="text-center py-4 text-gray-500 text-sm">
                No comments yet. Be the first to comment!
            </div>
        );
    }

    return (
        <div className="mt-3 flex flex-col gap-2">
            <div>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>

            <div

            >

            </div>
        </div>

    );
};

export default CommentsList;