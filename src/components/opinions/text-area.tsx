import { cn } from "@/lib/utils";
import { RichTextarea } from "rich-textarea";

interface Props {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  ariaInvalid: boolean;
}

const TAG_REGEX = /(#[a-zA-Z0-9_ñÑáéíóúÁÉÍÓÚ]+)/g;

const TextArea = ({
  onChange,
  value,
  className,
  disabled,
  maxLength,
  placeholder,
  ariaInvalid
}: Props) => {
  return (
    <RichTextarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      placeholder={placeholder}
      autoComplete="off"
      aria-invalid={ariaInvalid}
      disabled={disabled}
      className={cn(
        "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 border-0 border-red-500 aria-invalid:border rounded-t-none placeholder:text-gray-300",
        className,
      )}
      style={{
        minHeight: "224px",
        fontFamily: "inherit",
        lineHeight: "1.5",
        resize: "none",
        width: "100%"
      }}
    >
      {(text) => {
        const parts = text.split(/(#[a-zA-Z0-9_ñÑáéíóúÁÉÍÓÚ]+)/g);
        
        return parts.map((part, index) => {
          if (part.match(TAG_REGEX)) {
            return (
              <span 
                key={index} 
                className="text-violet-600"
                style={{ 
                  whiteSpace: 'pre-wrap'
                }}
              >
                {part}
              </span>
            );
          }
          
          return part;
        });
      }}
    </RichTextarea>
  );
};

export default TextArea;
