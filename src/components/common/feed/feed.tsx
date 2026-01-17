"use client"
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import FeedCard from "./feedcard";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";

const Feed = ({initalData, fetchMoreData}: {initalData: Opinion[], fetchMoreData: (page:number) => Promise<Opinion[]>}) => {
  const [opinions, setOpinions] = useState<Opinion[]>(initalData);
  const [page, setPage] = useState<number>(2)
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {ref, inView} = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const loadNewOpinions = useCallback( async () => {
    if(!hasMore || loading) return;
    
    setLoading(true);

    try {
        const newOpinions = await fetchMoreData(page);
        if(newOpinions.length === 0) {
            setHasMore(false);
        }else {
            setOpinions((prev) => [...prev, ...newOpinions]);
            setPage((prev) => prev + 1);
        }
    } catch{
        setError(true);
    }finally{
      setLoading(false);
    }
  }, [page, hasMore, loading, fetchMoreData]);

  useEffect(() => {
    if(inView) {
        loadNewOpinions();
    }
  }, [inView, loadNewOpinions, hasMore]);


  const onDeleteOpinion = (id: string) => {
    setOpinions((prev) => prev.filter((op) => op.id !== id));
  }

  return (
    <div className="mx-auto flex flex-col justify-start w-full lg:max-w-6/12 sm:max-w-110 ">
        {
            opinions.map((opinion) => (
                <FeedCard opinion={opinion} key={opinion.id} onDeleteOpinion={onDeleteOpinion}/>
            ))
        }

        {
            hasMore 
            ? (
                <div
                    ref={ref}
                    className="flex justify-center">
                    <Spinner className="size-7 text-violet-600"/>
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
  )
}

export default Feed;