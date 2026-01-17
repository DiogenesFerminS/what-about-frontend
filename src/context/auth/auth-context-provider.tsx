"use client";

import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { User } from "@/interfaces/common/user-interface";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export interface AuthError {
  error: boolean,
  message: string | null,
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError>({
    error: false,
    message: null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const updateUser = (user: User) => {
    setUser(user);
  }

  const checkAuth = useCallback( async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
        {
          credentials: "include",
        }
      );

      const data = await resp.json();

      if (!data.ok) {
        setUser(null);
        setError({
            error: true,
            message: 'Your identity could not be verified',
        });
      };

      setUser(data.data);
    } catch {
      setError({
        error: true,
        message: 'Something has gone wrong',
      });
      setUser(null);
      router.push('/auth/login');
    }finally{
      setLoading(false);
    }
  }, [setUser, router]);

    const logout = async () => {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        credentials: "include",
        });

        if(!resp.ok) {
            setError({
                error: true,
                message: 'This happened when you logged out.'
            })
            return;
        }

        setUser(null);
        router.push('/auth/login');
      } catch {
        setError({
          error: true,
          message: 'Something has gone wrong',
        });
      }
    }

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);


  return (
    <AuthContext.Provider value={{ user, error, loading, logout, checkAuth, updateUser }}>{children}</AuthContext.Provider>
  );
};
