import { getFollowOpinionsAction } from "@/actions/opinions";
import Feed from "@/components/common/feed/feed";
import { OpinionsService } from "@/services/opinions.service";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    <div className="px-2">
      <Feed initalData={data!.data} fetchMoreData={getFollowOpinionsAction}/>
    </div>
  )
}

export default FollowedPage