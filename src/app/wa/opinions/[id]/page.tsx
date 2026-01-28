import GoBackButton from "@/components/common/feed/complementary/card/buttons/go-back.btn";
import FooterCard from "@/components/common/feed/complementary/card/footer-card";
import ImageOpinion from "@/components/common/feed/complementary/card/image-opinion";
import ErrorHandler from "@/components/common/others/errorhandler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OpinionsService } from "@/services/opinions.service";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const OpinionPage = async ({ params }: Props) => {
  const { id } = await params;
  const { data: opinion, error, success } = await OpinionsService.getAllOneById(id);

  if (!success && error) {
    <ErrorHandler errorMessage={error}/>
    return;
  }

  if(!opinion) {
    <ErrorHandler errorMessage="Opinion not found"/>
    return;
  }

  return (
    <div className="w-full h-full px-2 my-5">
      <Card className="mx-auto w-full lg:max-w-6/12 sm:max-w-110 md:max-w-120 p-2">
        <CardHeader className="text-center py-2 relative">
          <GoBackButton/>
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              {opinion?.title}
            </h1>
          </div>
          <div className="flex items-center mt-2 gap-2 justify-center">
            <div>
              <Avatar>
                <AvatarImage
                  src={opinion.user.avatarUrl}
                  alt="Avatar image from user"
                />
                <AvatarFallback>
                  {opinion.user.username.split("")[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <div>
              <Link
                className="hover:underline"
                href={`/wa/profile/${opinion.user.id}`}
              >{opinion.user.username}</Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <section>
            <p className="whitespace-pre-wrap indent-8">{opinion?.content}</p>
          </section>

          {opinion.imageUrl && (
            <div>
              <ImageOpinion imageUrl={opinion.imageUrl} />
            </div>
          )}
        </CardContent>

        <div className="px-2">
          <FooterCard
            opinion={opinion}
          />
        </div>
      </Card>
    </div>
  );
};

export default OpinionPage;
