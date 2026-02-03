import loadMoreOpinions from "@/actions/opinions/loadMoreOpinions";
import { loadOpinionsByTagAction } from "@/actions/opinions/loadOpinionsByTag";
import { loadOpinionsByTermAction } from "@/actions/opinions/loadOpinionsByTerm";
import Feed from "@/components/common/feed/feed";
import SearchBar from "@/components/search/searchBar";
import FeedProvider from "@/context/feed/feed-context-provider";
import { Opinion, OpinionData } from "@/interfaces/opinions/opinionData.interface";
import { OpinionsService } from "@/services/opinions.service"
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{[Key:string]: string | string[] | undefined}>
}

const ExplorePage = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const term = search.term as string;
  const tag = search.tag as string;

  const loadOpinionsByTerm = async(page: number) => {
    "use server";

    return loadOpinionsByTermAction(search.term as string, page)
  };

  const loadOpinionsByTag = async(page: number) => {
    "use server";

    return loadOpinionsByTagAction(tag, page);
  };

  let success: boolean;
  let statusCode: number;
  let data: OpinionData | undefined;
  let callBackFn: (page:number) => Promise<Opinion[]>;
  let feedKey: string = 'default-key';

  if(term) {
    const response = await OpinionsService.findByterm(term.toLowerCase().trim(), {limit: 10, page: 1});
    success = response.success;
    statusCode = response.statusCode;
    data = response.data
    callBackFn = loadOpinionsByTerm;
    feedKey = `term-key-${term}`
  }else if(tag) {
    const response = await OpinionsService.getOpinionsByTag(tag.toLowerCase().trim(), {limit: 10, page: 1})
    success = response.success;
    statusCode = response.statusCode;
    data = response.data;
    callBackFn = loadOpinionsByTag
    feedKey = `tag-key-${tag}`
  }
  else {
    const response = await OpinionsService.getOpinions({limit: 10, page: 1});
    success = response.success;
    statusCode = response.statusCode;
    data = response.data
    callBackFn = loadMoreOpinions;
    feedKey = 'default-key'
  }

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

  return (
    <div className="mx-auto flex flex-col justify-start w-full lg:max-w-6/12 sm:max-w-110 px-3 gap-5 py-1 md:border-x border-gray-600 h-full">
      <SearchBar/>
      {
        !data || data.data.length === 0
        ?(
          <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <span className="text-gray-300 text-center block">No results were found :(</span>
              <Link
                href={'/wa/explore'}
                className="font-bold hover:underline"
              >Back to explore</Link>
          </div>
        )

        :(
          <FeedProvider 
            fetchMoreData={callBackFn} 
            initialData={data.data}
            key={feedKey}
          >
            <Feed
            />
          </FeedProvider>
        )
      }
    </div>
  )
}

export default ExplorePage