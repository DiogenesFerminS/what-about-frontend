import loadOpinionsByUser from "@/actions/opinions/loadOpinionsByUser";
import Feed from "@/components/common/feed/feed";
import { Button } from "@/components/ui/button";
import { OpinionsService } from "@/services/opinions.service";
import { UsersService } from "@/services/users.service";
import Image from "next/image";
import Link from "next/link";

interface Props {
    params: Promise<{id: string}>
}
const ProfilePage = async ({params} : Props) => {
  const {id} = await params;
  const userService = new UsersService();
  const {data:user} = await userService.getUserById(id);

  const {data} = await OpinionsService.getOpinionsByUser({limit: 10, page: 1}, id);

  const wrappedFnLoad = async (page: number) => {
    "use server"
    return loadOpinionsByUser(page, id);
  };

  if(!user) {
    return (
      <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
        <h1 className="text-2xl font-bold capitalize">Profile not found :(</h1>
        <Link href={'/wa/explore'} className="underline">Go to Explore</Link>
      </div>
    )
  }

  const isMyProfile = true;

  return (
    <>
      <div className="flex flex-col w-full px-2 py-4 max-w-2xl mx-auto items-center">
        <div className="flex flex-col lg:flex-row w-full gap-3 items-center">
          <div className="w-48 h-48 flex-none relative">
            {
              user.avatarUrl
              ? (
                <Image
                  src={user.avatarUrl ?? ""}
                  fill
                  alt="User photo"
                  className="rounded-full aspect-square object-cover"
                  sizes="200px"
                />
              )
              : (
                <div className="w-full h-full rounded-full flex justify-center items-center text-4xl dark:bg-stone-800">
                  <span>{user.username.split('')[0].toUpperCase()}</span>
                </div>
              )
            }
            
          </div>

          <div className="flex flex-col gap-1 flex-1 p-2">
            <span className="text-2xl capitalize">{user.username}</span>
            <span>{user.name}</span>

            <div className="flex gap-4">
              <p>
                <span className="font-bold">{data?.meta.total ?? 10}</span> opinions
              </p>
              <p>
                <span className="font-bold">190</span> followers
              </p>
              <p>
                <span className="font-bold">390</span> follow
              </p>
            </div>

            <p>{user.bio ?? "--"}</p>
            <span className="font-bold">{user.location ?? "--"}</span>
          </div>
        </div>
        <div className="mt-5 w-full">
          {isMyProfile ? (
            <div className="flex gap-4 px-3">
              <Button className="flex-1">Update Profile</Button>
              <Button variant={"destructive"} className="flex-1">
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button className="mx-auto block w-80">Follow</Button>
            </div>
          )}
        </div>
      </div>
      <div className="px-2">
        <div className="py-2">
          <span className="font bold text-center mx-auto block text-xl capitalize">Opinions created by {user.username}</span>
        </div>
          {data ? (<Feed initalData={data?.data} fetchMoreData={wrappedFnLoad}/> )
          
          :(<span className="capitalize text-sm mx-auto block text-center py-4 text-red-400">{user.username} does not have opinions :(</span>)}

      </div>
    </>
  );
}

export default ProfilePage;