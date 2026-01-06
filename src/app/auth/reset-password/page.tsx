import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldSeparator } from "@/components/ui/field"
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{[key:string]: string | undefined}>;
};

const RecoveryPage = async ({searchParams}: Props) => {
  const {token} = await searchParams;

  if (!token) {
    notFound();
  }

  return (
     <div className="dark:bg-stone-950 bg-gray-100 flex justify-center items-center min-h-screen">
        <Card className="min-w-70 md:min-w-90">
            <CardHeader>
                <CardTitle>
                    <h1 className="md:text-lg text-[16px]">Reset your Password on What About?</h1>
                </CardTitle>
                <CardDescription>
                    <p>create a new password</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldSeparator>o</FieldSeparator>
                <ResetPasswordForm token={token}/>
            </CardContent>
        </Card>

    </div>
  )
}

export default RecoveryPage