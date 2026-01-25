"use client"
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  
  const router = useRouter();

  return (
    <div 
      className="absolute top-0 left-0"
      onClick={() => router.back()}
    >
      <X />
    </div>
  );
};

export default GoBackButton;
