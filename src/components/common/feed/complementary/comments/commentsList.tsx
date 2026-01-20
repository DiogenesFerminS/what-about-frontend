"use client"

import { Comment } from "@/interfaces/comments/commentData.interface";
import CommentItem from "./commentItem";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCommentForm, createCommentSchema } from "@/schemas/comments/create-comment.schema";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCommentAction } from "@/actions/comments";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    comments: Comment[];
    opinionId: string;
    addComment: (comment: Comment) => void;
    loadMoreComments: () => void;
    notMore: boolean
    isLoading: boolean
}

const CommentsList = ({ comments, opinionId, addComment, loadMoreComments, notMore, isLoading }: Props) => {
    const form = useForm<CreateCommentForm>({
        defaultValues: {
            content: ''
        },
        resolver: zodResolver(createCommentSchema),
    });

    const [loading, setLoading] = useState<boolean>(false);
    const listRef = useRef<HTMLDivElement>(null);
    const [justAddedComment, setJustAddedComment] = useState<boolean>(false);

    useEffect(() => {
        if (justAddedComment && listRef.current) {
            listRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            setTimeout(() => setJustAddedComment(false), 300);
        }
    }, [justAddedComment]);

    const onSubmit = async (formData: CreateCommentForm) => {
        setLoading(true);
        const { success, data, error } = await createCommentAction({ content: formData.content, opinionId: opinionId });

        if (!success && error) {
            toast.error(error, {
                position: 'top-right',
                duration: 3000,
            });
            return;
        };

        if (!data) {
            toast.error('Something went wrong', {
                position: 'top-right',
                duration: 3000,
            });
            return;
        };

        addComment(data);
        setLoading(false);
        form.reset();
        setJustAddedComment(true);
    };

    //TODO: MANGE LOADING FIRST COMMENTS
    return (
        <div className="mt-3 flex flex-col gap-2">
            {
                comments.length > 0
                    ? (
                        <div
                            ref={listRef}
                            className="max-h-105 overflow-y-scroll scrollbar-track-violet-600"
                        >
                            {comments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))}

                            {
                                isLoading 
                                ?(
                                    <div className="w-full flex justify-center">
                                        <Spinner className="text-violet-600 size-6"/>
                                    </div>
                                )
                                :(
                                    notMore
                                    ? (
                                        <div
                                            className="mt-2"
                                        >
                                            <span className="text-center block text-sm text-gray-300">You have reached the end :(</span>
                                        </div>
                                    )
                                    : (
                                        <div
                                            className="mt-2"
                                            onClick={() => loadMoreComments()}
                                        >
                                            <span className="text-center block text-sm text-gray-300 hover:underline">load more comments</span>
                                        </div>
                                    )
                                )
                                
                            }
                        </div>

                    )
                    : (
                        <div className="text-center py-4 text-gray-500 text-sm">
                            No comments yet. Be the first to comment!
                        </div>
                    )
            }

            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className="flex gap-2">
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your comment"
                                    autoComplete="off"
                                    className="w-[80%]"
                                    maxLength={500}
                                    disabled={loading}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                <Button
                                    className="flex-1"
                                    disabled={loading}
                                >Send</Button>
                            </div>
                        </Field>
                    )}
                />
            </form>
        </div>

    );
};

export default CommentsList;