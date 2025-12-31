"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { type LoginForm, loginSchema } from "@/lib/schemas/login.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
  const form = useForm<LoginForm>({
    defaultValues: {
      term: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const resp = await res.json();

      if (!res.ok) {
        form.setError("term", {
          type: "manual",
          message: resp.error,
        });

        form.setError("password", {
          type: "manual",
          message: resp.error,
        });
        return;
      }

      router.push("/wa");
    } catch{
      toast.error('Something is wrong', {
        description: 'An unexpected error has occurred, please try again later',
        position: "top-center",
        duration: 3000
      })
    }
  };

  return (
    <form className="mt-3" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="my-4">
        <Controller
          name="term"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Username or Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your username or email"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                placeholder="Enter your password"
                autoComplete="off"
                type={showPassword ? "text" : "password"}
              />

              <FieldDescription>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm hover:underline text-left w-fit font-medium cursor-pointer"
                >
                  {showPassword ? "Hide password" : "Show Password"}
                </button>
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div>
        <Button className="w-full" variant={"default"}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
