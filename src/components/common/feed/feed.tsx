"use client"
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import FeedCard from "./feedcard";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { deleteOpinionAction } from "@/actions/opinions";
import { toast } from "sonner";
import DeleteModal from "./complementary/deleteModal";
import { useFeed } from "@/hooks/feed/useFeed";

const Feed = ({ initalData, fetchMoreData }: { initalData: Opinion[], fetchMoreData: (page: number) => Promise<Opinion[]> }) => {
  const { opinions, setOpinions, hasMore, error, ref } = useFeed({ initalData, fetchMoreData });

  const [idsDeleting, setIdsDeleting] = useState<Set<string>>(new Set());
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [currentDeleteId, setCurrentDeleteId] = useState<string>('');


  const onDeleteOpinion = (id: string) => {
    setCurrentDeleteId(id);
    setDeleteModal(true);
  }

  const handleDeleteOpinion = async () => {
    const resp = await deleteOpinionAction(currentDeleteId);
    const { success, error } = resp;
    if (!success && error) {
      toast.error(error, {
        position: 'top-right',
        duration: 3000,
      });
      return
    }

    setIdsDeleting(prev => new Set(prev).add(currentDeleteId));

    setTimeout(() => {
      setOpinions((prev) => prev.filter((op) => op.id !== currentDeleteId));
      toast.success('Opinion successfully removed', {
        position: 'top-right',
        duration: 3000,
      });

    }, 2000)
  }

  return (
    <>
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} handleDeleteOpinion={handleDeleteOpinion} />
      <div className="mx-auto flex flex-col justify-start w-full lg:max-w-6/12 sm:max-w-110 ">
        {
          opinions.map((opinion) => (
            <FeedCard 
              opinion={opinion} 
              key={opinion.id} 
              onDeleteOpinion={onDeleteOpinion} 
              isDeleted={idsDeleting.has(opinion.id)} 
            />
          ))
        }

        {
          hasMore
            ? (
              <div
                ref={ref}
                className="flex justify-center">
                <Spinner className="size-7 text-violet-600" />
              </div>
            )
            : (
              <div className="text-center p-4 text-muted-foreground text-sm">
                No more opinions available, please come back later
              </div>
            )
        }

        {
          error &&
          (
            <div className="text-center p-4 text-sm text-red-600">
              An error has occurred, please try again later.
            </div>
          )
        }
      </div>
    </>
  )
}

export default Feed;