import MakeOpinionForm from "@/components/opinions/make-opinion-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldSeparator } from "@/components/ui/field"

const MakeOpinionPage = () => {
  return (
    <div className="mx-auto flex flex-col justify-center w-full max-w-105 sm:max-w-110 h-full px-2 lg:max-w-150">
        <Card className="min-w-70 md:min-w-90 my-2">
            <CardHeader>
                <CardTitle>
                    <h1 className="md:text-lg text-[16px]">Make a new Opinion</h1>
                </CardTitle>
                <CardDescription>
                  <p>Write an opinion on any topic in a respectful and responsible manner.</p>
                </CardDescription>
                <CardDescription>
                    <p>Log in to your account to start posting</p>
                </CardDescription>
            </CardHeader>
            <FieldSeparator/>
            <CardContent>
              <MakeOpinionForm/>
            </CardContent>
        </Card>

    </div>
  )
}

export default MakeOpinionPage