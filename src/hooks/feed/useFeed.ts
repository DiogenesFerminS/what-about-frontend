import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface UseFeedProps {
  initalData: Opinion[];
  fetchMoreData: (page: number) => Promise<Opinion[]>;
}

export const useFeed = ({ initalData, fetchMoreData }: UseFeedProps) => {
  const [opinions, setOpinions] = useState<Opinion[]>(initalData);
  const [page, setPage] = useState<number>(2);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const loadNewOpinions = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const newOpinions = await fetchMoreData(page);
      if (newOpinions.length === 0) {
        setHasMore(false);
      } else {
        setOpinions((prev) => [...prev, ...newOpinions]);
        setPage((prev) => prev + 1);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading, fetchMoreData]);

  useEffect(() => {
    if (inView) {
      loadNewOpinions();
    }
  }, [inView, loadNewOpinions, hasMore]);

  return {
    opinions,
    setOpinions,
    hasMore,
    loading,
    error,
    ref,
  };
};