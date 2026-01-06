"use client";

import {
  type ResetForm,
  resetPasswordSchema,
} from "@/lib/schemas/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ResetPasswordForm = ({token}: {token: string}) => {
  const form = useForm<ResetForm>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [fieldLock, setFieldLock] = useState<boolean>(false);
  const [wasUpdated, setWasUpdate] = useState<boolean>(false);

  const onSubmit = async (data: ResetForm) => {
    setFieldLock(true);

    try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: data.password,
        }),
     });

     if (res.status === 401) {
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000);
     };

     const resp = await res.json();

     if (!resp.ok) {
        form.setError("password", {
            type: "manual",
            message: resp.error,
        });
        
        form.setError("confirmPassword", {
            type: "manual",
            message: resp.error,
        });

        return;
     }

     toast.success("Your password was successfully updated", {
        position: "top-center",
        duration: 5000,
     });
     setFieldLock(true)
     setWasUpdate(true);        
    } catch{
      toast.error('Something is wrong', {
        description: 'An unexpected error has occurred, please try again later',
        position: "top-center",
        duration: 3000
      });
      setFieldLock(false);   
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-3 flex flex-col gap-3"
    >
      <FieldGroup>
        <Controller
          disabled={fieldLock}
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>

              <Input
                disabled={fieldLock}
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

        <Controller
          disabled={fieldLock}
          name="confirmPassword"
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm your password</FieldLabel>

              <Input
                disabled={fieldLock}
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Confirm your password"
                autoComplete="off"
                type={showConfirm ? "text" : "password"}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
              
              <FieldDescription>
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-sm hover:underline text-left w-fit font-medium cursor-pointer"
                >
                    {showConfirm ? "Hide password" : "Show Password"}
                </button>
              </FieldDescription>

              
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-3">
        <Button 
            className="w-full" 
            variant={"default"}
            disabled={wasUpdated}
        >
          Update Password
        </Button>
      </div>

      {
        wasUpdated 
        && (
          <div className="mt-2">
            <Link href={'/auth/login'} className="font-bold block text-center hover:underline">Go to Login</Link>
          </div>
        )
      }

    </form>
  );
};

export default ResetPasswordForm;
