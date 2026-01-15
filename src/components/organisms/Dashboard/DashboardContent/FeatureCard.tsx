import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  buttonHref: string;
  variant?: "default" | "bordered";
}

export function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonHref,
  variant = "default",
}: FeatureCardProps) {
  return (
    <div
      className={`flex flex-col bg-white rounded-xl overflow-hidden ${
        variant === "bordered" ? "border-2 border-gray-200" : ""
      }`}
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
        <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-3 sm:mb-4 flex-1 leading-relaxed line-clamp-3">
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
