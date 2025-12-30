import RegisterForm from "@/components/auth/register-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldSeparator } from "@/components/ui/field"
import Link from "next/link"

const RegisterPage = () => {
  return (
    <div className="dark:bg-stone-950 bg-gray-100 flex justify-center items-center min-h-screen">
        <Card className="min-w-70 md:min-w-90">
            <CardHeader>
                <CardTitle>
                    <h1 className="md:text-lg text-[16px]">Register on What About?</h1>
                </CardTitle>
                <CardDescription>
                    <p>Register to enjoy everything our platform has to offer</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldSeparator>o</FieldSeparator>
                <RegisterForm/>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col">
                    <Link
                      className="hover:underline mx-auto"
                      href={"/auth/login"}
                    >You have an account, log in here</Link>

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

export default RegisterPage