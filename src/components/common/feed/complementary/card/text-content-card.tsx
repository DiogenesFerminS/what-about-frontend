interface Props {
  content: string
}

const TAG_REGEX = /(#[a-zA-Z0-9_ñÑáéíóúÁÉÍÓÚ]+)/g;

const TextContentCard = ({content}: Props) => {
  const shortContent = content.slice(0, 300);
  const parts = shortContent.split(TAG_REGEX);

  return (
    <p className="whitespace-pre-wrap wrap-break-word">
        {
            parts.map((part, index) => {
                if(part.match(TAG_REGEX)) {
                    const tagSlug = part.slice(1);
                    return (
                        <span key={index} className="text-violet-500">{part}</span>
                    )
                }

                return <span key={index}>{part}</span>
                
            })
        }

    </p>
  )
}

export default TextContentCard