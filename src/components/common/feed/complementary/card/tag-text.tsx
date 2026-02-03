"use client"

import { Tag } from "@/interfaces/opinions/opinionData.interface";
import Link from "next/link";

interface Props {
  part: string;
  tags: Tag[];
}

const TagText = ({ part, tags }: Props) => {
  const slug = part.slice(1).toLowerCase();
  const currentTag = tags.find((t) => t.name === part.slice(1).toLowerCase());
  return (
    <span
      className="text-violet-500 inline group cursor-pointer relative"
    >
      <span className="hidden absolute group-hover:inline-block bg-stone-900 z-10 -translate-y-2/2 rounded-lg p-1 text-sm text-center w-max">
        {currentTag ? currentTag.count : 0} opinions
      </span>
      <Link href={`/wa/explore?tag=${slug}`} className="hover:underline">{part}</Link>
    </span>
  );
};

export default TagText;
