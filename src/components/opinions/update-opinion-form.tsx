"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Image from "next/image";
import { useModalContext } from "@/context/modal/modal-context";
import { toast } from "sonner";
import { Opinion } from "@/interfaces/opinions/opinionData.interface";
import { type UpdateOpinionForm, updateOpinionSchema } from "@/schemas/opinions/update-opinion.schema";
import { updateOpinionAction } from "@/actions/opinions";

interface Props {
  opinion: Opinion
}

const UpdateOpinionForm = ({opinion}: Props) => {
  const form = useForm<UpdateOpinionForm>({
    defaultValues: {
      content: opinion.content,
      file: undefined,
      deleteImage: undefined,
    },
    resolver: zodResolver(updateOpinionSchema),
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(opinion.imageUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openModal, closeModal } = useModalContext();

  const router = useRouter();

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onSubmit = async (data: UpdateOpinionForm) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("content", data.content );
    if (data.deleteImage !== undefined) {
      formData.append("deleteImage", String(data.deleteImage));
    }

    if (data.file) {
      formData.append("file", data.file);
    };

    const {success, error} = await updateOpinionAction(formData, opinion.id);

    if(!success && error) {
      toast.error(error, {
        position: 'top-right',
        duration: 3000,
      });

      setLoading(false);
      return;
    }

    toast.success('Opinion updated', {
      position: 'top-right',
      duration: 3000,
    });
    setLoading(false);

    router.push(`/wa/profile/${opinion.user.id}`);
  };

  const resetPhoto = () => {
    setPreviewUrl(null);
    form.setValue("file", undefined);
    form.setValue("deleteImage", true);
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
    form.setValue("deleteImage", false);
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
              Update opinion
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

export default UpdateOpinionForm;
