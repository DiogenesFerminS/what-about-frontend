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
import { type LoginForm, loginSchema } from "@/schemas/auth/login.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth/auth-context";
import { loginAction } from "@/actions/auth/loginAction";

const LoginForm = () => {
  const form = useForm<LoginForm>({
    defaultValues: {
      term: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { checkAuth } = useAuthContext();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    const { success, error, statusCode } = await loginAction(data);
    if (!success && error) {
      toast.error(error, {
        position: "top-right",
        duration: 3000,
      });


      if (statusCode === 401 && error) {
        form.setError("password", { message: error });
        form.setError("term", { message: error });
        return;
      }

      return;
    }

    toast("Logging in...", {
      position: "top-right",
      duration: 3000,
    });

    checkAuth();
    router.push("/wa/explore");
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
