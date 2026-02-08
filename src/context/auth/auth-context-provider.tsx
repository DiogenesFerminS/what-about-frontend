"use client";

import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { User } from "@/interfaces/common/user-interface";
import { useRouter } from "next/navigation";
import { getNotReadAction } from "@/actions/notifications/getNotReadAction";
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
  const [notRead, setNotRead] = useState<number>(0);

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

    const getNotRead = useCallback( async () => {
      const {success, data, error} = await getNotReadAction();

      if(!success && error) {
        return;
      }

      if(!data) return;

      setNotRead(data.count);
    }, [])

    useEffect(() => {
      checkAuth();
      getNotRead();
    }, [checkAuth, getNotRead]);


  return (
    <AuthContext.Provider value={{ user, error, loading, logout, checkAuth, updateUser,notRead }}>{children}</AuthContext.Provider>
  );
};
