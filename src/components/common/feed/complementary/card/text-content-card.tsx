import { Tag } from "@/interfaces/opinions/opinionData.interface";
import TagText from "./tag-text";

interface Props {
  content: string
  tags: Tag[],
}

const TAG_REGEX = /(#[a-zA-Z0-9_ñÑáéíóúÁÉÍÓÚ]+)/g;

const TextContentCard = ({content, tags}: Props) => {
  const shortContent = content.slice(0, 400);
  const parts = shortContent.split(TAG_REGEX);

  return (
    <div className="whitespace-pre-wrap wrap-break-word">
        {
            parts.map((part, index) => {
                if(part.match(TAG_REGEX)) {
                    return <TagText tags={tags} part={part} key={index}/>
                }

                return <span key={index} className="inline">{part}</span>
                
            })
        }

    </div>
  )
}

export default TextContentCard