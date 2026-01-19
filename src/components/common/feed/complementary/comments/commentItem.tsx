"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/interfaces/comments/commentData.interface";
import { formatDate } from "@/helpers/formatDateSmart";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const { user, content, createdAt } = comment;
  const commentDate = formatDate(createdAt);

  return (
    <div className="mb-3 p-2">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatarUrl || ""} alt={user.username} />
          <AvatarFallback>
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{user.username}</span>
            <span className="text-xs text-gray-500">{commentDate}</span>
          </div>

          <p className="text-sm ">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;