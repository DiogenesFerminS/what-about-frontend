"use client"

import { useOpinionInteraction } from "@/context/opinion/opinion-context-provider";

export const useRepostState = (originalId:string, initialValueFromServer: boolean, initialCount: number) => {

    const {notifyRepostChange, repostOverride} = useOpinionInteraction();

    const isRepostedOverride = repostOverride[originalId];

    const isReposted = isRepostedOverride !== undefined
    ? isRepostedOverride
    : initialValueFromServer;

    const initialValue = initialValueFromServer ? 1 : 0;
    const currentValue = isReposted ? 1 : 0;

    const delta = currentValue - initialValue;

    const repostCount = initialCount + delta;

    const toggleRepost = (newState: boolean) => {
        notifyRepostChange(originalId, newState);
    };

    return {isReposted, toggleRepost, repostCount};

};