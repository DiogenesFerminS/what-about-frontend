"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { useAuthContext } from "@/context/auth/auth-context";
import CustomHeader from "./complementary/card/custom-header";
import CustomCardBody from "./complementary/card/custom-body";
import FooterCard from "@/components/common/feed/complementary/card/footer-card";

interface Props {
  opinion: Opinion,
}

const FeedCard = ({ opinion }: Props) => {
  const {
    user: { id },
  } = opinion;

  const { user } = useAuthContext();

  const isRepost = !!opinion.originalOpinion

  const isMyOpinion = id === user?.id;

  return (
    <>
      <div
        className='transition-all duration-1000 ease-in-out overflow-hidden mb-4'
      >
        <Card className="my-2">
          <CardHeader>
            <CustomHeader 
              isMyOpinion={isMyOpinion} 
              opinion={opinion} 
              key={opinion.id} 
            />
          </CardHeader>

          <CardContent>
            <CustomCardBody opinion={opinion} isRepost={isRepost}/>
          </CardContent>
          <CardFooter>
            <FooterCard opinion={opinion}/>

          </CardFooter>

        </Card>

      </div>

    </>
  );
};

export default FeedCard;
