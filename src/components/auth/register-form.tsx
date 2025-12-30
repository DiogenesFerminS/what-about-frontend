"use client"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { type RegisterForm, registerSchema } from "@/lib/schemas/register.schema"

const RegisterForm = () => {
  const form = useForm<RegisterForm>({
    defaultValues: {
        username: "",
        email: "",
        password: "",
    },
    resolver: zodResolver(registerSchema)
  });

const [showPassword, setShowPassword] = useState<boolean>(false);

const onSubmit = (data: RegisterForm) => {
    console.log(data);
}
  
  return (
    <form 
      className="mt-3 flex flex-col gap-3"
      onSubmit={form.handleSubmit(onSubmit)} 
    >
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Username</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Create a unique username"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}


              <FieldDescription>
                <span>The username must be at least 6 characters long.</span>
              </FieldDescription>

            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="off"
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

              <FieldDescription>
                <span>Enter a valid and active email address.</span>
              </FieldDescription>

            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Create your password"
                autoComplete="off"
                type={showPassword ? "text" : "password"}
              />
              
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        
              <FieldDescription className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm hover:underline text-left w-fit font-medium cursor-pointer"
                >
                  {showPassword ? "Hide password" : "Show Password"}
                </button>
                
                <span>
                  the password must include: lowercase letters, uppercase
                  letters, and special characters{" "}
                </span>
              </FieldDescription>

            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-3">
        <Button className="w-full" variant={"default"}>
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm