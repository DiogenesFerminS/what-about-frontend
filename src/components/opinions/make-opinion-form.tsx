"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateOpinionForm,
  createOpinionSchema,
} from "@/schemas/opinions/create-opinion.schema";
import { Button } from "../ui/button";
import Image from "next/image";
import { useModalContext } from "@/context/modal/modal-context";
import { toast } from "sonner";
import { createOpinionAction } from "@/actions/opinions/createOpinion";

const MakeOpinionForm = () => {
  const form = useForm<CreateOpinionForm>({
    defaultValues: {
      title: "",
      content: "",
      file: undefined,
    },
    resolver: zodResolver(createOpinionSchema),
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openModal, closeModal } = useModalContext();

  const router = useRouter();

  const onSubmit = async (data: CreateOpinionForm) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("content", data.content);
    formData.append("title", data.title);

    if (data.file) {
      formData.append("file", data.file);
    }

    const { success, error } = await createOpinionAction(formData);

    if (!success && error) {
      toast.error(error, {
        position: "top-right",
        duration: 3000,
      });

      setLoading(false);
      return;
    }

    toast.success("Opinion created", {
      position: "top-right",
      duration: 3000,
    });
    setLoading(false);

    router.push("/wa/explore");
  };

  const resetPhoto = () => {
    setPreviewUrl(null);
    form.setValue("file", undefined);
  };

  const changeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file || !(file instanceof File)) {
      setPreviewUrl(null);
      form.setValue("file", undefined);
      (event.target as HTMLInputElement).value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    form.setValue("file", file);
    (event.target as HTMLInputElement).value = "";
  };

  const handleOpenModal = () => {
    if (!previewUrl) {
      toast("Something is wrong", {
        position: "top-left",
        duration: 3000,
      });
      return null;
    }

    openModal(
      <div className="flex flex-col relative w-full h-full">
        <Image
          src={previewUrl}
          alt="Imagen post"
          fill
          className="object-contain p-1 rounded-lg"
          sizes="100%"
        />

        <Button
          className="absolute top-0 right-0"
          variant={"ghost"}
          onClick={() => closeModal()}
        >
          X
        </Button>
      </div>,
    );
  };

  return (
    <>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Field>
            <FieldLabel>Your opinion:</FieldLabel>

            <div className="relative">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    disabled={loading}
                    className="border-none rounded-none rounded-tl-lg rounded-tr-lg py-3 font-bold text-lg"
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
                  <>
                    <Textarea
                      {...field}
                      disabled={loading}
                      id="content"
                      placeholder="Tell us what you think"
                      autoComplete="off"
                      className="h-55 w-full resize-none overflow-y-scroll border-none rounded-none rounded-br-lg rounded-bl-lg"
                      maxLength={2700}
                      aria-invalid={fieldState.invalid}
                    />

                    <span className="text-xs absolute bottom-2 right-2 text-violet-500 font-mono bg-white/50 dark:bg-black/50 px-1 rounded">
                      {`${field.value ? field.value.length : 0} / 2700`}
                    </span>
                  </>
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

          <Controller
            name="file"
            control={form.control}
            render={({
              field: { value, onChange, ...fieldProps },
              fieldState,
            }) => (
              <Field>
                <FieldLabel htmlFor={fieldProps.name}>Add a photo:</FieldLabel>
                <div
                  className="relative w-full aspect-video rounded-xl overflow-hidden border bg-muted shadow
                hover:shadow-primary hover:border-violet-900 transition-all cursor-pointer"
                >
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Imagen del post"
                      fill
                      className="object-cover transition-transform duration-300"
                      onClick={handleOpenModal}
                    />
                  ) : (
                    <div
                      className="w-full flex justify-center items-center h-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <CirclePlus size={40} strokeWidth={1.2} />
                    </div>
                  )}
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <Input
                  {...fieldProps}
                  disabled={loading}
                  id={fieldProps.name}
                  aria-invalid={fieldState.invalid}
                  type="file"
                  ref={fileInputRef}
                  onChange={changeFile}
                  className="hidden"
                />
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex gap-3 justify-start items-center mt-3">
          <Button type="submit" disabled={loading}>
            Share opinion
          </Button>
          {previewUrl && (
            <Button
              type="button"
              variant="destructive"
              onClick={resetPhoto}
              disabled={loading}
            >
              Delete Photo
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default MakeOpinionForm;
