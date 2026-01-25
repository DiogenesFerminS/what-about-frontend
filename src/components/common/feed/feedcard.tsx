"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { useAuthContext } from "@/context/auth/auth-context";
import { useState } from "react";
import CustomHeader from "./complementary/card/custom-header";
import CustomCardBody from "./complementary/card/custom-body";
import FooterCard from "@/components/common/feed/complementary/card/footer-card";

interface Props {
  opinion: Opinion,
  onDeleteOpinion: (id: string) => void;
  isDeleted: boolean;
}

const FeedCard = ({ opinion, onDeleteOpinion, isDeleted }: Props) => {
  const {
    user: { id },
  } = opinion;

  const { user } = useAuthContext();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const isRepost = !!opinion.originalOpinion

  const isMyOpinion = id === user?.id;

  return (
    <>
      <div
        className={`
        transition-all duration-500 ease-in-out overflow-hidden
        ${isDeleted 
            ? "opacity-0 max-h-0 mb-0 scale-95 -translate-x-10"
            : "opacity-100 mb-4 scale-100 translate-x-0"
          }
      `}
      >
        <Card className="my-2">
          <CardHeader>
            <CustomHeader 
              isMyOpinion={isMyOpinion} 
              opinion={opinion} 
              setDeleteModal={setDeleteModal} 
              key={opinion.id} 
              deleteModal={deleteModal}
              onDeleteOpinion={onDeleteOpinion}
            />
          </CardHeader>

          <CardContent>
            <CustomCardBody opinion={opinion} isRepost={isRepost}/>
          </CardContent>
          <CardFooter>
            <FooterCard createdAt={opinion.createdAt} initialCountLikes={opinion.likesCount} initialIsLiked={opinion.isLiked} opinionId={opinion.id}/>

          </CardFooter>

        </Card>

      </div>

    </>
  );
};

export default FeedCard;
