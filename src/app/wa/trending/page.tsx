import { getTrendingTagsActions } from "@/actions/tags/getTrendingTags";
import ErrorHandler from "@/components/common/others/errorhandler";
import Link from "next/link";


export const metadata = {
 title: 'Trending Page',
 description: 'On this page you will find the most used or most popular tags from What about?',
};

const TrendingPage = async () => {
  const { success, data, error } = await getTrendingTagsActions();

  if (!success && error) {
    return <ErrorHandler errorMessage={error} />;
  }

  if (!data) {
    return <ErrorHandler errorMessage="Trending tags not found" />;
  }
  return (
    <div className="mx-auto flex flex-col justify-start w-full lg:max-w-6/12 sm:max-w-110 px-3 gap-5 py-1 md:border-x border-gray-600 h-full">
      <span className="text-xl font-bold text-center mt-2">
        Trending Top Tags
      </span>

      {data.map((tag) => (
        <div
          key={tag.id}
          className="w-full flex justify-between border border-violet-600 py-2 px-5 rounded-lg animate-up-down max-w-140 mx-auto"
        >
          <Link
            href={`/wa/explore?tag=${tag.name}`}
            className="text-lg font-bold text-gray-200 hover:underline capitalize"
          >
            {tag.name}
          </Link>
          <span className="w-fit block text-lg font-bold text-gray-200">
            {tag.count}
          </span>
        </div>
      ))}

      <div className="text-center mt-3">
        <Link href={"/wa/explore"} className="text-lg hover:underline">
          Go to Explore
        </Link>
      </div>
    </div>
  );
};

export default TrendingPage;
