import { redirect, notFound } from "next/navigation";
import ErrorHandler from "@/components/common/others/errorhandler";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import { OpinionsService } from "@/services/opinions.service";
import { UsersService } from "@/services/users.service";
import UpdateOpinionForm from "@/components/opinions/update-opinion-form";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{[Key:string]: string | string[] | undefined}>;
}

const UpdatePage = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const {repost} = await searchParams;

  const allowValues = ['true', 'false'];

  if(repost && !allowValues.includes(repost as string)) {
    notFound();
  } 

  const [opinionResponse, userResponse] = await Promise.all([
    OpinionsService.findOneById(id),
    UsersService.getUser(),
  ]);

  const { data: opinion, success, error } = opinionResponse;
  const { data: user } = userResponse;

  if (!success || error) {
    return <ErrorHandler errorMessage={error || "Error loading opinion"} />;
  }

  if (!opinion) {
    notFound();
  }

  if (!user) {
    redirect("/auth/login"); 
  }

  if (user.id !== opinion.user.id) {
    redirect("/wa/explore");
  }

  return (
    <div className="mx-auto flex flex-col justify-center w-full max-w-105 sm:max-w-110 h-full px-2 lg:max-w-150">
      <Card className="min-w-70 md:min-w-90 my-2">
        <CardHeader>
          <CardTitle>
            <h1 className="md:text-lg text-[16px]">Update your Opinion</h1>
          </CardTitle>
          <CardDescription>
            <p>Make changes to your post below.</p>
          </CardDescription>
        </CardHeader>
        <FieldSeparator />
        <CardContent>
            <UpdateOpinionForm opinion={opinion} repost={repost}/>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePage;