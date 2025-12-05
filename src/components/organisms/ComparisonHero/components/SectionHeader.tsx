import { Typography } from "@/components/atoms";

interface SectionHeaderProps {
  title: string;
  barCount?: number;
}

/**
 * Section Header Component
 * Displays a section title with red indicator bars
 */
export function SectionHeader({ title, barCount = 3 }: SectionHeaderProps) {
  return (
    <div className="flex gap-3 md:gap-4 lg:gap-6">
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          className={`bg-[#FF2727] w-3 md:w-4 lg:w-5 ${index > 0 ? "-ml-2 md:-ml-3 lg:-ml-4" : ""}`}
        />
      ))}
      <div className="flex flex-col">
        <Typography
          font="sohneBreit"
          color="primary"
          weight="800"
          variant="h6"
          align="left"
          className="text-xs md:text-sm lg:text-base"
        >
          SECCIÓN
        </Typography>
        <Typography
          font="sohneBreit"
          color="white"
          weight="800"
          variant="h1"
          align="left"
          className="text-xl md:text-2xl lg:text-4xl"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
}
