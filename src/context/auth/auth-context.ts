"use client"

import { User } from "@/interfaces/common/user-interface";
import { createContext, useContext } from "react";
import { AuthError } from "./auth-context-provider";

interface AuthContextType {
    user: User | null,
    logout: () => void;
    checkAuth: () => void;
    error: AuthError;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("You are trying to use the context outside the provider. (AUTH PROVIDER)")
    }

    return context;
}