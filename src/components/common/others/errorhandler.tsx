import Link from "next/link";

interface Props {
  errorMessage: string;
}

const ErrorHandler = ({ errorMessage }: Props) => {
  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      <h1 className="text-2xl font-bold capitalize">{errorMessage}</h1>
      <Link href={"/wa/explore"} className="underline">
        Go to Explore
      </Link>
    </div>
  );
};

export default ErrorHandler;
