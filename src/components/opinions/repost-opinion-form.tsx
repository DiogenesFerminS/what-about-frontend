"use client";
import {
  CreateRepostForm,
  createRepostSchema,
} from "@/schemas/opinions/create-repost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { createRepostAction } from "@/actions/reposts";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import TextArea from "./text-area";

interface Props {
  opinionId: string;
}



const RepostOpinionForm = ({ opinionId }: Props) => {
  const form = useForm<CreateRepostForm>({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: zodResolver(createRepostSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: CreateRepostForm) => {
    setLoading(true);

    const { success, error } = await createRepostAction(
      opinionId,
      data.title,
      data.content,
    );

    if (!success && error) {
      toast.error(error, {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (!data) {
      toast.error("An unexpected error has occurred", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    toast.success("Repost created successfully", {
      duration: 3000,
      position: "top-right",
    });

    setTimeout(() => {
      router.refresh();
      router.back();
    }, 2000);
  };

  

  return (
    <form className="p-3" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <div className="relative border rounded-lg shadow-sm">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  disabled={loading}
                  className="border-none shadow-none focus-visible:ring-0 rounded-none rounded-tl-lg rounded-tr-lg py-3 font-bold text-lg"
                  placeholder="Your title"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
              )}
            />

            <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />

            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="relative w-full h-56 rounded-br-lg rounded-bl-lg overflow-hidden">
                  <TextArea
                    ariaInvalid={fieldState.invalid}
                    onChange={field.onChange}
                    value={field.value}
                    disabled={loading}
                    maxLength={2700}
                    placeholder="Tell us what you think"
                  />
                  <span className="text-xs absolute bottom-2 right-2 text-violet-500 font-mono bg-white/80 dark:bg-black/80 px-1 rounded z-20 pointer-events-none">
                    {`${field.value ? field.value.length : 0} / 2700`}
                  </span>
                </div>
              )}
            />
          </div>

          {form.formState.errors.title && (
            <FieldError errors={[form.formState.errors.title]} />
          )}
          {form.formState.errors.content && (
            <FieldError errors={[form.formState.errors.content]} />
          )}
        </Field>
      </FieldGroup>

      <div className="flex gap-2 mt-4">
        <Button aria-label="submit-form" type="submit" disabled={loading}>
          Create Repost
        </Button>

        <Button
          aria-label="back-button"
          variant={"destructive"}
          type="button"
          disabled={loading}
          onClick={() => {
            router.refresh();
            router.back();
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
};

export default RepostOpinionForm;
