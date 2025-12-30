import LoginForm from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import Link from "next/link";


export const metadata = {
 title: 'Login - What-About?',
 description: '',
};

const LoginPage = () => {
  return (
    <div className="dark:bg-stone-950 bg-gray-100 flex justify-center items-center min-h-screen">
        <Card className="min-w-70 md:min-w-90">
            <CardHeader>
                <CardTitle>
                    <h1 className="md:text-lg text-[16px]">Login on What About?</h1>
                </CardTitle>
                <CardDescription>
                    <p>Log in to your account to start posting</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldSeparator>o</FieldSeparator>
                <LoginForm/>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col">
                    <Link
                      className="hover:underline mx-auto"
                      href={"/auth/register"}
                    >You don&apos;t have an account? Register here</Link>

                    <FieldSeparator className="my-3">o</FieldSeparator>

                    <Link
                      className="hover:underline mx-auto"
                      href={"/auth/recovery-password"}
                    >Don&apos;t remember your password? Reset it here</Link>
                </div>
            </CardFooter>
        </Card>

    </div>
  )
}

export default LoginPage