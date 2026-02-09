"use client";

import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { User } from "@/interfaces/common/user-interface";
import { useRouter } from "next/navigation";
import { checkAuthAction } from "@/actions/auth/checkAuthAction";
import { logoutAction } from "@/actions/auth/logoutAction";

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
      const {success, data, error} = await checkAuthAction();

      if(!success && error) {
        setError({
          error: true,
          message: error
        });

        return;
      }

      if(!data) {
        setError({
          error: true,
          message: 'An unexpected error occurred while verifying your identity.',
        })
        return;
      }
      setUser(data);
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
     const { success } = await logoutAction();

     if (!success) {
      setError({
        error: true,
        message: 'An unexpected error occurred while closing your session.',
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
