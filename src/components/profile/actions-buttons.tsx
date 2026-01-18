"use client"

import { useAuthContext } from "@/context/auth/auth-context"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { useRouter } from "next/navigation"
import FollowButton from "./follow-button"
interface Props {
  userId: string
}

const ActionsButtons = ({userId}: Props) => {

  const {user, loading, logout} = useAuthContext();
  const router = useRouter();

  if(!user || loading) {
    return (
        <div className="flex justify-center items-center">
            <Spinner/>
        </div>
    );
  };

  const isMyProfile = user.id === userId;

  const handleUpdate = () => {
    router.push('/wa/account/update');
  }

  return (
    <>
      {isMyProfile ? (
        <div className="flex gap-4 px-3">
          <Button 
            className="flex-1"
            onClick={handleUpdate}
          >Update Profile</Button>
          <Button 
            variant={"destructive"} 
            className="flex-1"
            onClick={() => {logout()}}
            >
            Logout
          </Button>
        </div>
      ) : (
        <FollowButton userId={userId}/>
      )}
    </>
  );           
}

export default ActionsButtons