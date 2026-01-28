"use client"
import { createContext } from "react";

interface InteractionState {
  repostOverride: Record<string, boolean>;
  notifyRepostChange: (originalId:string, newState:boolean) => void;
}

export const InteractionContext = createContext<InteractionState | undefined>(undefined);