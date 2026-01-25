"use client"
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner';

interface Props {
  initialIsLiked: boolean,
  initialCountLikes: number,
  opinionId: string,
}

const LikeButton = ({initialCountLikes, initialIsLiked, opinionId}: Props) => {

  const [countLikes, setCountLikes] = useState<number>(initialCountLikes);
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLike = async () => {
    if(isLoading) return;

    const prevIsLiked = isLiked;
    const prevLikesCount = countLikes;

    const newIsLiked = !isLiked;
    const newCountLikes = newIsLiked ? countLikes +1 : countLikes -1;

    setIsLiked(newIsLiked);
    setCountLikes(newCountLikes);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ opinionId: opinionId })
      });

      if(!response.ok) {
        toast.error('Something is wrong', {
          position: 'top-right',
          duration: 3000,
        });
        return;
      };
      
    } catch{
      toast.error('Something is wrong', {
          position: 'top-right',
          duration: 3000,
        });
      
      setIsLiked(prevIsLiked);
      setCountLikes(prevLikesCount);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div 
      className='flex gap-2 justify-center items-center cursor-pointer hover:bg-red-50/10 transition-all rounded-lg px-2 py-1 select-none'
      onClick={handleLike}
    >
      <Heart 
        className={`transition-transform duration-300 ${
            isLiked ? 'animate-like-bump text-red-600' : 'scale-100'
          }`}

          fill={isLiked ? "currentColor" : "none"} 
          strokeWidth={2}
      />
      <span className='text-sm'>{countLikes}</span>
    </div>
  )
}

export default LikeButton