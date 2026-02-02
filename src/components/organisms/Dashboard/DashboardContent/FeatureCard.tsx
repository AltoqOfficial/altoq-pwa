import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  buttonHref: string;
  variant?: "default" | "bordered";
  isDark?: boolean;
}

export function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonHref,
  variant = "default",
  isDark = false,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl overflow-hidden transition-colors",
        isDark ? "bg-[#1a1a1a]" : "bg-white",
        variant === "bordered" &&
          (isDark ? "border-2 border-white/10" : "border-2 border-gray-200")
      )}
    >
      {/* Image */}
      <div className="relative w-full h-32 sm:h-36 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <h3
          className={cn(
            "text-sm font-bold mb-1",
            isDark ? "text-white" : "text-gray-900"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-xs mb-3 sm:mb-4 flex-1 leading-relaxed line-clamp-3",
            isDark ? "text-white/60" : "text-gray-500"
          )}
        >
          {description}
        </p>

        {/* Button */}
        <Link
          href={buttonHref}
          className="w-full py-2 sm:py-2.5 px-4 bg-[#FF2727] hover:bg-[#E82323] text-white text-xs font-semibold rounded-lg text-center transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
