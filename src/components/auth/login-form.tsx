"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { type LoginForm, loginSchema } from "@/lib/schemas/login.schema";

const LoginForm = () => {
  const form = useForm<LoginForm>({
    defaultValues: {
      term: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: LoginForm) => {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    const result = await res.json();

    if (!result.ok) {
      form.setError("term", {
        type: "manual",
        message: result.error,
      });

      form.setError("password", {
        type: "manual",
        message: result.error,
      });
    }
    console.log(result);
    
  }

  return (
    <form 
      className="mt-3"
      onSubmit={form.handleSubmit(onSubmit)}
    >
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
