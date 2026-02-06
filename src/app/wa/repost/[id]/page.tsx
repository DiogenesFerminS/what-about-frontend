import ErrorHandler from "@/components/common/others/errorhandler";
import RepostOpinionForm from "@/components/opinions/repost-opinion-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { OpinionsService } from "@/services/opinions.service";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({params}: {
  params: {id: string}
}): Promise<Metadata> {
  const post = await OpinionsService.getAllOneById(params.id);

  const title = post.data?.title ?? 'Opinion title';
  return {
    title: 'Resposts',
    description: `On this page you can create a repost of opinion: ${title}`
  }
}

interface Props {
  params: Promise<{id: string}>
}
const RepostPage = async ({params}:Props) => {
  const { id } = await params;
  const { data: opinion, error, success } = await OpinionsService.getAllOneById(id);

  if(!success && error) {
    return <ErrorHandler errorMessage={error}/>
  }

  if(!opinion) {
    return <ErrorHandler errorMessage="Opinion not found"/>
  }


  const isRepost = !!opinion.originalOpinion;

  const idOriginalOpinion = isRepost ? opinion.originalOpinion.id : opinion.id;
  const originalAvatar = isRepost ? opinion.originalOpinion.user.avatarUrl : opinion.user.avatarUrl;
  const originalUsername = isRepost ? opinion.originalOpinion.user.username : opinion.user.username;
  const originalTitle = isRepost ? opinion.originalOpinion.title : opinion.title;
  
  return (
    <div className="mx-auto flex flex-col justify-center w-full max-w-105 sm:max-w-110 h-full px-2 lg:max-w-150">
        <Card className="min-w-70 md:min-w-90 my-2">
          <CardHeader>
            <span className="text-violet-600 font-bold text-sm block mb-2">
              You are reposting this opinion:
            </span>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={originalAvatar}
                  alt="Originial opinion user avatar"
                />
                <AvatarFallback>
                  {originalUsername.split("")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <span className="font-bold">{originalTitle}</span>
                <Link
                  href={`/wa/opinions/${idOriginalOpinion}`}
                  className="font-bold text-sm text-violet-600 hover:underline"
                >
                  Go to the original opinion
                </Link>
              </div>
            </div>
          </CardHeader>
          <RepostOpinionForm opinionId={opinion.id} />
        </Card>
    </div>

  )
}

export default RepostPage