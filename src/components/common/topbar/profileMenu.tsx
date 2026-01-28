"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useAuthContext } from "@/context/auth/auth-context"
import { useRouter } from "next/navigation";

const ProfileMenu = () => {
  const {user, loading } = useAuthContext();

  const router = useRouter();

  if(loading) {
    return (
        <Spinner/>
    )
  }

  if(!user) {
    return (
        <Spinner/>

    )
  }
  //TODO: DRIVE ERROR
  
  const handleProfile = () => {
    router.push(`/wa/profile/${user.id}`);
  }
  
  return (
    <div>
        <Avatar 
          onClick={handleProfile}
          className="hover:cursor-pointer"
        >
            <AvatarImage src={user.avatarUrl ?? ''} alt="Profile avatar"/>
            <AvatarFallback>{user.username.split('')[0].toUpperCase()}</AvatarFallback>
        </Avatar>
    </div>
  )
}

export default ProfileMenu