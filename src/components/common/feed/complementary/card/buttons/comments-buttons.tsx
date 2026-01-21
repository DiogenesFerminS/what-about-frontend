import { MessageSquare } from 'lucide-react'

interface Props {
  handleShowComments: () => void;
  commentsCount: number;
}

const CommentsButtons = ({commentsCount, handleShowComments}: Props) => {
  return (
    <div 
    className='flex gap-2 justify-center items-center cursor-pointer hover:bg-red-50/10 transition-all rounded-lg px-2 py-1 select-none'
    onClick={handleShowComments}
  >
    <MessageSquare 
        strokeWidth={2} 
    />
    <span className='text-sm'>{commentsCount}</span>
  </div>
  )
}

export default CommentsButtons