"use client";
import {
  type RecoveryForm,
  recoverySchema,
} from "@/schemas/auth/recovery-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { recoveryPasswordAction } from "@/actions/auth/recoveryPasswordAction";

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
    const { success, error, data:dataResponse } = await recoveryPasswordAction(data);

    if(!success && error) {
      toast.error(error, {
        position: 'top-right',
        duration: 3000,
      });
      setLoading(false);
      return;
    };

    if(!data) {
      toast.error(error, {
        position: 'top-right',
        duration: 3000,
      });
      setLoading(false);
      return;
    };

    toast.success(dataResponse, {
      position: 'top-right',
      duration: 3000,
    });
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
        <Button className="w-full" variant={"default"} disabled={loading}>
          Send instructions
        </Button>
      </div>
    </form>
  );
};

export default RecoveryPasswordForm;
