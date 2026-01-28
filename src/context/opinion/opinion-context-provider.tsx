import { useContext, useState } from "react";
import { InteractionContext } from "./opinion-context";

interface Props {
  children: React.ReactNode;
}

export const OpinionInteractionProvider = ({children}: Props) => {
    const [repostOverride, setRepostOverride] = useState<Record<string, boolean>>({});
    const notifyRepostChange = (originalId:string, newState: boolean) => {
        setRepostOverride((prev) => ({
            ...prev,
            [originalId]: newState
        }));
    }

    return (
        <InteractionContext.Provider value={{repostOverride, notifyRepostChange}}>
            {children}
        </InteractionContext.Provider>
    )
}

export const useOpinionInteraction = () => {
    const context = useContext(InteractionContext);
    if (!context) throw new Error("useOpinionInteractions must be used within provider");

    return context;
}