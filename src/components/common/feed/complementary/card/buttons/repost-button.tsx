import { Repeat } from "lucide-react";

interface Props {
  isRepostedByMe: boolean;
  repostNumber: number
  handleRepost: () => void;
}

const RepostButton = ({isRepostedByMe, repostNumber, handleRepost}: Props) => {
  return (
    <div 
        className="flex gap-2 justify-center items-center cursor-pointer hover:bg-red-50/10 transition-all rounded-lg px-2 py-1 select-none"
        onClick={handleRepost}
    >
      <Repeat
        className={`${isRepostedByMe ? "text-yellow-500 transition-all" : "text-white"}`}
      />
      
      <span className="text-sm">{repostNumber}</span>
        
    </div>
  );
};

export default RepostButton;
