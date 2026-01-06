import { OpinionsService } from "@/services/opinions.service"
import { redirect } from "next/navigation";

const ExplorePage = async () => {
  const {success, statusCode, data} = await OpinionsService.getAllOpinions({limit: 5, page: 1});

  if (!success) {
    if (statusCode === 401) {
      redirect("/auth/login");
    }
    
    return (
      <div className="text-center p-10 text-red-500">
        <h2 className="text-xl font-bold">Oops!</h2>
        <p>We were unable to load the feed. Please try again later.</p>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center p-10 text-red-500">
        <h2 className="text-xl font-bold">Oops!</h2>
        <p>Opinions not found. Please try again later</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex justify-center w-105 h-screen overflow-y-scroll">
        <pre className="text-wrap">
          {
            JSON.stringify(data.data, null, 2)
          }
        </pre>
    </div>
  )
}

export default ExplorePage