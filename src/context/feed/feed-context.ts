"use client"

import { Opinion } from "@/interfaces/opinions/opinionData.interface"
import { createContext, Dispatch, SetStateAction, useContext } from "react"

interface FeedContext {
 opinions: Opinion[],
 hasMore: boolean,
 error: boolean,
 ref:(node?: Element | null | undefined) => void, 
 onDeleteOpinion: (id:string) => void,
 handleDeleteOpinion: () => Promise<void>,
 deleteModal: boolean,
 setDeleteModal: Dispatch<SetStateAction<boolean>>,
 onRepostStateChange: (id: string, state: boolean) => void,
 repostState: Record<string, boolean>
 deleteChilds: (fatherId: string) => void,
 };

export const FeedContext = createContext<FeedContext | undefined>(undefined);

export const useFeedContext = () => {
  const context = useContext(FeedContext);

  if (!context) {
    throw new Error("You are trying to use the context outside the provider (FEED PROVIDER)");
  };

  return context;
};