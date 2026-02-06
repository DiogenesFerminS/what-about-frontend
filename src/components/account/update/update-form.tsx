"use client";

import { updateUserAction } from "@/actions/users/updateUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/auth/auth-context";
import { User } from "@/interfaces/common/user-interface";
import {
  type UpdateProfileForm,
  updateProfileSchema,
} from "@/schemas/profile/update-profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateForm = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  const { updateUser } = useAuthContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<UpdateProfileForm>({
    defaultValues: {
      name: user.name ?? "",
      bio: user.bio ?? "",
      location: user.location ?? "",
      file: undefined,
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file || !(file instanceof File)) {
      setPreview(null);
      form.setValue("file", undefined);
      (e.target as HTMLInputElement).value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    form.setValue("file", file);
    (e.target as HTMLInputElement).value = "";
  };

  const onSubmit = async (inputData: UpdateProfileForm) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("name", inputData.name);
    formData.append("bio", inputData.bio);
    formData.append("location", inputData.location);

    if (inputData.file) {
      formData.append("file", inputData.file);
    }

    const { success, data, error } = await updateUserAction(formData);

    setLoading(false);

    if (!success && error) {
      toast.error(error, {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    if (!data) {
      toast.error("Updated profile failed", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    updateUser(data);

    toast.success("Profile updated", {
      position: "top-right",
      duration: 3000,
    });

    setTimeout(() => {
      const url = `/wa/profile/${user.id}`;
      router.push(url);
    }, 2000);
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center gap-4 mb-4 rounded-lg w-fit">
          <Avatar className="size-25">
            <AvatarImage src={preview || ""} className="object-cover" />
            <AvatarFallback>
              {user.username.split("")[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="capitalize">{user.username}</h3>
            <Button
              className="capitalize mt-2"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              change photo
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageChange}
            className="hidden"
          />
        </div>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  disabled={loading}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your new name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="location"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  disabled={loading}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your new location"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Biography:</FieldLabel>
                <div className="relative">
                  <Textarea
                    {...field}
                    disabled={loading}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your new biography"
                    autoComplete="off"
                    className="min-h-37.5 w-full resize-none"
                    maxLength={160}
                  />

                  <span className="text-xs absolute bottom-0 right-2">{`${
                    form.getValues("bio").length
                  } / 160`}</span>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex gap-2 mt-5">
          <Button type="submit">
            Update Profile
          </Button>

          <Button 
            type="button"
            variant={"destructive"}
            onClick={() => {
              router.back()
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateForm;
