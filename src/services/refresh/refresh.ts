"use server"
import { cookies } from "next/headers"

export const refreshToken = async (): Promise<boolean> => {
  const cookiesStore = await cookies()
  const refreshToken = cookiesStore.get("refresh-token")?.value;
  if(!refreshToken) return false;

  const urlObj = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`)

  const resp = await fetch(urlObj.toString(), {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': cookiesStore.toString(), 
    },
  })

  if (!resp.ok) {
    return false
  };

  const response: { ok:boolean, message: string, data: {accessToken: string, refreshToken: string} } = await resp.json();

  if(!response.ok) return false;

  cookiesStore.set("auth-token", response.data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15
  });

    cookiesStore.set("refresh-token", response.data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return true;

}