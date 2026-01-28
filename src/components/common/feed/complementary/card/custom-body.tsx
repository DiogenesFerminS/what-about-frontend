import ImageOpinion from "@/components/common/feed/complementary/card/image-opinion";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import Link from "next/link";

interface Props {
  opinion: Opinion;
  isRepost: boolean;
}

const CustomCardBody = ({ opinion, isRepost }: Props) => {
  return (
    <div>
      {isRepost ? (
        <div>
          <div>
            <div className="font-bold text-xl mb-2">
              <span>{opinion.title}</span>
            </div>
            <div>
              <p>
                {" "}
                {`${opinion.content.slice(0, 400)} `}
                {opinion.content.length > 400 && (
                  <Link
                    href={`/wa/opinions/${opinion.id}`}
                    className="text-violet-400 capitalize hover:underline"
                  >
                    ...See more
                  </Link>
                )}
              </p>
            </div>
          </div>

          <div className="border border-gray-600 rounded-lg p-3 mt-4">
            <span className="text-violet-600 capitalize font-bold py-2 block">{`${opinion.user.username} has reposted this`}</span>
            <div>
              <div className="font-bold text-lg mb-2">
                <span>{opinion.originalOpinion.title}</span>
              </div>

              <p>
                {`${opinion.originalOpinion.content.slice(0, 300)} `}
                {opinion.originalOpinion.content.length > 300 && (
                  <Link
                    href={`/wa/opinions/${opinion.originalOpinion.id}`}
                    className="text-violet-500 capitalize hover:underline"
                  >
                    ...See more
                  </Link>
                )}
              </p>
            </div>
            {opinion.originalOpinion.imageUrl && (
              <ImageOpinion imageUrl={opinion.originalOpinion.imageUrl} />
            )}
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className="font-bold text-lg mb-2">
              <span>{opinion.title}</span>
            </div>

            <p>
              {`${opinion.content.slice(0, 400)} `}
              {opinion.content.length > 400 && (
                <Link
                  href={`/wa/opinions/${opinion.id}`}
                  className="text-violet-500 capitalize hover:underline"
                >
                  ...See more
                </Link>
              )}
            </p>
          </div>
          {opinion.imageUrl && <ImageOpinion imageUrl={opinion.imageUrl} />}
        </>
      )}
    </div>
  );
};

export default CustomCardBody;
