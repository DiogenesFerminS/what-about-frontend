"use client";
import {
  type RecoveryForm,
  recoverySchema,
} from "@/lib/schemas/recovery-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";

const RecoveryPasswordForm = () => {
  const form = useForm<RecoveryForm>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(recoverySchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: RecoveryForm) => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resp = await res.json();

      if (!res.ok) {
        form.setError("email", {
          type: "manual",
          message: resp.error,
        });
        return;
      };

      toast.success(resp.data, {
        position: "top-center",
        duration: 5000,
      });

    } catch {
      toast.error("Something is wrong", {
        description: "An unexpected error has occurred, please try again later",
        position: "top-center",
        duration: 3000,
      });
    }finally {
        setLoading(false)
    }
  };

  return (
    <form
      className="mt-3 flex flex-col gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
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
                placeholder="Enter the email associated with your account"
                autoComplete="off"
                disabled={loading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-3">
        <Button className="w-full" variant={"default"}>
          Send instructions
        </Button>
      </div>
    </form>
  );
};

export default RecoveryPasswordForm;
