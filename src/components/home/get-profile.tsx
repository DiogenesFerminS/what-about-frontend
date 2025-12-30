"use client"

import { useState } from "react"
import { Button } from "../ui/button"

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
  const [profile, setProfile] = useState<Data | null>(null)
  const [error, setError] = useState< string | null>('')

  const punchEndPoint = async () => {
    const resp = await fetch('http://localhost:8080/api/users/profile',{
        credentials: "include",
    });

    const data = await resp.json();

    if(!data.ok) {
        setError(data.error);
    }

      setProfile(data.data);
  }

  return (
    <div>
        <Button
            variant={"default"}
            onClick={() => punchEndPoint()}
        >Get Profile</Button>
        <pre>{JSON.stringify(profile)}</pre>
        <span>{error}</span>
    </div>
  )
}

export default GetProfile