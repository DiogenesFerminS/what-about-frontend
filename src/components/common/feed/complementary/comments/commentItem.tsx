"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/interfaces/comments/commentData.interface";
import { formatDate } from "@/helpers/formatDateSmart";
import { useRouter } from "next/navigation";
import { Ellipsis, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Props {
  comment: Comment;
  deleteComment: (id:string) => void;
}

const CommentItem = ({ comment, deleteComment }: Props) => {
  const { user, content, createdAt } = comment;
  const commentDate = formatDate(createdAt);

  const router = useRouter();

  return (
    <div className="mb-3 p-2">

      <div className="flex gap-3 relative">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatarUrl || ""} alt={user.username} />
          <AvatarFallback>
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-semibold text-sm hover:underline"
              onClick={() => { router.push(`/wa/profile/${user.id}`) }}
            >{user.username}</span>
            <span className="text-xs text-gray-500">{commentDate}</span>
          </div>

          <p className="text-sm ">{content}</p>
        </div>

        <div className="absolute top-0 right-0 hover:bg-gray-300/10 rounded-lg">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="p-1">
              <Ellipsis className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="m-2">
              <DropdownMenuItem
                onClick={() => deleteComment(comment.id)}
              >
                <div
                  className="flex items-center"
                >
                  <Trash className="text-red-500" />
                  <div className="ml-2">
                    <span>Delete</span>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>



    </div>
  );
};

export default CommentItem;