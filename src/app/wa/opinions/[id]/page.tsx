import GoBackButton from "@/components/common/feed/complementary/card/buttons/go-back.btn";
import ImageOpinion from "@/components/common/feed/complementary/card/image-opinion";
import TextContentCard from "@/components/common/feed/complementary/card/text-content-card";
import ErrorHandler from "@/components/common/others/errorhandler";
import SimpleFooter from "@/components/opinions/simple-footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OpinionsService } from "@/services/opinions.service";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const OpinionPage = async ({ params }: Props) => {
  const { id } = await params;
  const {
    data: opinion,
    error,
    success,
  } = await OpinionsService.getAllOneById(id);

  const isRepost = !!opinion?.originalOpinion;

  if (!success && error) {
    return <ErrorHandler errorMessage={error} />;
  }

  if (!opinion) {
    return <ErrorHandler errorMessage="Opinion not found" />;
  }

  return (
    <div className="w-full h-full px-2 my-5">
      <Card className="mx-auto w-full lg:max-w-6/12 sm:max-w-110 md:max-w-120 p-2">
        <CardHeader className="text-center py-2 relative">
          <GoBackButton />
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
              >
                {opinion.user.username}
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isRepost && (
            <div className="p-4 border border-violet-500 rounded-lg mb-4 flex flex-col gap-3">
              <span className="text-lg text-violet-500 font-bold">
                This opinion is a repost
              </span>

              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    src={opinion.originalOpinion.user.avatarUrl}
                    alt="Original-author"
                  />
                  <AvatarFallback>
                    {opinion.originalOpinion.user.username.split("")[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{opinion.originalOpinion.title}</p>
                  <Link
                    className="text-violet-500 font-bold hover:underline block mt-2"
                    href={`/wa/opinions/${opinion.originalOpinion.id}`}
                  >Go to original opinion</Link>
                </div>
              </div>
            </div>
          )}

          <section>
            <TextContentCard content={opinion.content} tags={opinion.tags}/>
          </section>

          {opinion.imageUrl && (
            <div>
              <ImageOpinion imageUrl={opinion.imageUrl} />
            </div>
          )}
        </CardContent>
        <SimpleFooter opinion={opinion}/>

      </Card>
    </div>
  );
};

export default OpinionPage;
