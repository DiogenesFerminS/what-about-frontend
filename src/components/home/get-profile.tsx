"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";

export interface Data {
    id:                 string;
    email:              string;
    username:           string;
    name:               string;
    bio:                string;
    avatarUrl:          null;
    location:           string;
    isVerified:         boolean;
    isActive:           boolean;
    verifyToken:        null;
    resetPasswordToken: null;
    createdAt:          Date;
    updatedAt:          Date;
}


const GetProfile = () => {
  const [profile, setProfile] = useState<Data | null>(null);
  const [error, setError] = useState< string | null>('');

  const router = useRouter();

  const punchEndPoint = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,{
        credentials: "include",
    });

    const data = await resp.json();
  
    if(!data.ok) {
        setError(data.error);
    }

    setProfile(data.data);
  }

  const logout = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      credentials: "include",
    });

    const data = await resp.json();

    router.push('/auth/login');
  }

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div>
          <Button
            variant={"default"}
            onClick={() => punchEndPoint()}
          >Get Profile</Button>

          <Button
            variant={"destructive"}
            onClick={() => logout() }
          >Logout</Button>
      </div>
        
        <pre>{JSON.stringify(profile, null, 2)}</pre>
        <span>{error}</span>

    </div>
  )
}

export default GetProfile