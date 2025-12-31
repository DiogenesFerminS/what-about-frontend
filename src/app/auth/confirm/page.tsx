import AccountValidator from "@/components/auth/verify-account";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ConfirmPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  return (
    <div className="dark:bg-stone-950 bg-gray-100 flex justify-center items-center min-h-screen">
      <Card className="w-90">
        <CardHeader>
          <CardTitle>What About?</CardTitle>
          <CardDescription>
            We are verifying your account, please wait a moment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountValidator token={token} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmPage;
