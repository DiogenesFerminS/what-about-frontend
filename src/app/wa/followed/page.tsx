import { getFollowOpinionsAction } from "@/actions/opinions";
import Feed from "@/components/common/feed/feed";
import FeedProvider from "@/context/feed/feed-context-provider";
import { OpinionsService } from "@/services/opinions.service";
import Link from "next/link";
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Followed',
 description: 'Here you will find all the opinions from the users you follow',
};

const FollowedPage = async() => {
  const {success, statusCode, data} = await OpinionsService.getFollowOpinions({limit: 10, page: 1});

  if (!success) {
    if (statusCode === 401) {
      redirect("/auth/login");
    }
    
    return (
      <div className="text-center p-10 text-red-500">
        <h2 className="text-xl font-bold">Oops!</h2>
        <p>We were unable to load the feed. Please try again later - Unauthorized</p>
      </div>
    );
  }

  if (data!.data.length === 0) {
    return (
      <div className="p-10 text-violet-500 w-full h-full flex justify-center items-center flex-col gap-2">
        <p className="text-xl font-bold text-center">It seems you don&apos;t follow anyone, to see the opinions in this section start following users</p>
        <span className="block text-xl font-bold">:(</span>
        <Link href={'/wa/explore'} className="hover:underline font-bold text-white">Go to Explore</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex flex-col justify-start w-full lg:max-w-6/12 sm:max-w-110 px-3 gap-5 py-1 md:border-x border-gray-600 ">
      <FeedProvider fetchMoreData={getFollowOpinionsAction} initialData={data!.data}>
        <Feed />
      </FeedProvider>
    </div>
  )
}

export default FollowedPage