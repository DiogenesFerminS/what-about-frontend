import { useFeedContext } from "@/context/feed/feed-context"

const useRepostState = (originalId: string, initialServerState: boolean, initialCount: number) => {

  const {onRepostStateChange, repostState, deleteChilds } = useFeedContext();

  const isOverrideRepost = repostState[originalId];

  const isReposted = isOverrideRepost !== undefined
  ? repostState[originalId]
  : initialServerState

  const initialVal = initialServerState ? 1 : 0;
  const currentVal = isReposted ? 1 : 0;
  
  const delta = currentVal - initialVal;
  const repostCount = initialCount + delta;

  const toggleRepost = (state: boolean) => {
    onRepostStateChange(originalId, state);
    if (!state){
        deleteChilds(originalId);
    }
  }

  return {
    isReposted,
    toggleRepost,
    repostCount,
  }
}

export default useRepostState