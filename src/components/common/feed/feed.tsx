"use client"
import { Spinner } from "@/components/ui/spinner";
import DeleteModal from "./complementary/deleteModal";
import FeedCard from "./feedcard";
import { useFeedContext } from "@/context/feed/feed-context";

const Feed = () => {
  const { 
      opinions, 
      hasMore, 
      error, 
      ref, 
      deleteModal,
      handleDeleteOpinion,
      setDeleteModal 
    } = useFeedContext();

  return (
    <>
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} handleDeleteOpinion={handleDeleteOpinion} />
      <div>
        {
          opinions.map((opinion) => (
            <FeedCard key={opinion.id} 
              opinion={opinion} 
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