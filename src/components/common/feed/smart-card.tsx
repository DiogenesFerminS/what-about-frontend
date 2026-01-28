import { useOpinionInteraction } from "@/context/opinion/opinion-context-provider"
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { useEffect, useState } from "react";
import FeedCard from "./feedcard";

interface Props {
  opinion: Opinion,
  currentUserId: string,
  onDeleteOpinion: (id:string) => void;
  isDeleted: boolean;
}

const SmartCard = ({currentUserId, isDeleted, onDeleteOpinion,opinion }: Props) => {
  const {repostOverride} = useOpinionInteraction();

  const [isZombie, setIsZombie] = useState(false);
  const isRepost = !!opinion.originalOpinion;
  const parentId = isRepost ? opinion.originalOpinion.id : opinion.id;

  const isMyRepost = opinion.user.id === currentUserId;

  const overrideStatus = parentId ? repostOverride[parentId] : undefined;

  useEffect(() => {
    const setZombie = () => {
      setIsZombie(true);
    };
    if(isRepost && isMyRepost && overrideStatus === false) {
        setZombie();
    }
  }, [isRepost, isMyRepost, overrideStatus])

  if(isZombie) return null;

  return <FeedCard opinion={opinion} onDeleteOpinion={onDeleteOpinion} isDeleted={isDeleted}/>
}

export default SmartCard