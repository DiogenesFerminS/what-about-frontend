import { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { isFollowedAction, createFollowAction, unfollowAction } from "@/actions/follows";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

interface Props {
  userId: string
}

const FollowButton = ({userId}: Props) => {

  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const verifyFollow = async () => {
        setIsLoading(true);
        const {success, data, error} = await isFollowedAction(userId);

        if(!success && error) {
            toast.error(error, {
                position: "top-right",
                duration: 3000,
            });
            return;
        };

        if(typeof data !== "boolean") {
            toast.error("Something is wrong", {
                position: "top-right",
                duration: 3000,
            });
            return;
        }
        setIsFollowed(data);
        setIsLoading(false);
    };

    verifyFollow();
  }, [userId]);

  const handleFollowToggle = async () => {
    setIsLoading(true);

    try {
      if (isFollowed) {
        // Unfollow
        const { success, error } = await unfollowAction(userId);

        if (!success && error) {
          toast.error(error, {
            position: "top-right",
            duration: 3000,
          });
          setIsLoading(false);
          return;
        }

        setIsFollowed(false);
        toast.success("Unfollowed successfully", {
          position: "top-right",
          duration: 3000,
        });
      } else {
        // Follow
        const { success, error } = await createFollowAction(userId);

        if (!success && error) {
          toast.error(error, {
            position: "top-right",
            duration: 3000,
          });
          setIsLoading(false);
          return;
        }

        setIsFollowed(true);
        toast.success("Followed successfully", {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch {
      toast.error("Something went wrong", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner/>
      </div>
    )
  }

  return (
    <div>
        <Button
          className="mx-auto block w-80"
          onClick={handleFollowToggle}
          disabled={isLoading}
          variant={isFollowed ? "destructive" : "default"}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
    </div>
  )
}

export default FollowButton