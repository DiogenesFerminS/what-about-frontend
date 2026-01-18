import { getFollowOpinionsAction } from "@/actions/opinions";
import Feed from "@/components/common/feed/feed";
import { OpinionsService } from "@/services/opinions.service";
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

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center p-10 text-red-500">
        <h2 className="text-xl font-bold">Oops!</h2>
        <p>Opinions not found. Please try again later - No data</p>
      </div>
    )
  }

  return (
    <div className="px-2">
      <Feed initalData={data.data} fetchMoreData={getFollowOpinionsAction}/>
    </div>
  )
}

export default FollowedPage