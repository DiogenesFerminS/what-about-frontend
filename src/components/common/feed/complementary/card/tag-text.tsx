"use client"

import { Tag } from "@/interfaces/opinions/opinionData.interface";

interface Props {
  part: string;
  tags: Tag[];
}

const TagText = ({ part, tags }: Props) => {
  const currentTag = tags.find((t) => t.name === part.slice(1).toLowerCase());
  return (
    <span
      className="text-violet-500 inline group cursor-pointer relative"
    >
      <span className="hidden absolute group-hover:inline-block bg-stone-900 z-10 -translate-y-2/2 rounded-lg p-1 text-sm text-center w-max">
        {currentTag?.count} opinions
      </span>
      <span className="hover:underline">{part}</span>
    </span>
  );
};

export default TagText;
