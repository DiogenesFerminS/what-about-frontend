import UpdateForm from "@/components/account/update/update-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { UsersService } from "@/services/users.service";

const UpdatePage = async () => {
  const { data } = await UsersService.getUser();
  if( !data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner/>
      </div>
    )
  }

  return (
    <div className="mx-auto flex flex-col justify-center w-full max-w-105 sm:max-w-110 h-full px-2 lg:max-w-150">
      <Card className="min-w-70 md:min-w-90">
        <CardHeader>
          <CardTitle>
            <h1 className="md:text-lg text-[16px]">Update your profile</h1>
          </CardTitle>
          <CardDescription>
            <p>Here you can update your account information</p>
          </CardDescription>
        </CardHeader>
        <FieldSeparator />
        <CardContent>
          <UpdateForm user={data}/>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePage;
