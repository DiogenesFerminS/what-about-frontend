"use client";

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
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { useModalContext } from "@/context/modal/modal-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MakeOpinionForm = () => {
  const form = useForm<CreateOpinionForm>({
    defaultValues: {
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

    formData.append("content", data.content );

    if (data.file) {
      formData.append("file", data.file);
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/opinions/create`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if(!response.ok) {
        toast.error('An error occurred while creating the opinion', {
          description: "Please try again later",
          position: "top-right",
          duration: 3000,
        });
        setLoading(false);
        return;
      }

      toast.success('Opinion created correctly',{
        position: "top-right",
        duration: 3000
      });
      form.reset();
      setPreviewUrl(null);

      setTimeout(() => {
        router.push('/wa/explore')
      },3000)
    } catch (error) {

      console.log(error)
      setLoading(false);
      toast.error('Something is wrong', {
      description: 'An unexpected error has occurred, please try again later',
      position: "top-right",
      duration: 3000
    })
    }
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
    if(!previewUrl) {
      toast('Something is wrong', {
        position: 'top-left',
        duration: 3000
      });
      return null
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
          className="absolute top-0 right-0" variant={"ghost"}
          onClick={() => closeModal()}
        >X</Button>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Your opinion:</FieldLabel>
                <div className="relative">
                  <Textarea
                    {...field}
                    disabled={loading}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Tell us what you think"
                    autoComplete="off"
                    className="min-h-37.5 w-full resize-none"
                    maxLength={500}
                  />

                  <span className="text-xs absolute bottom-0 right-2">{`${
                    form.getValues("content").length
                  } / 500`}</span>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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
          <Button 
            type="submit"
            disabled={loading}
          >
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
