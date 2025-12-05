import { Typography } from "@/components/atoms";
import { SECTION_ICONS } from "./SectionIcons";

interface SectionHeaderProps {
  title: string;
  sectionId: string;
}

/**
 * Section Header Component
 * Displays a section title with roman numeral SVG indicator
 */
export function SectionHeader({ title, sectionId }: SectionHeaderProps) {
  // Normalize sectionId to match SECTION_ICONS keys (remove spaces and special chars)
  const normalizedId = sectionId.replace(/[\s-]/g, "");
  const icon = SECTION_ICONS[normalizedId];

  return (
    <div className="flex gap-3 md:gap-4 lg:gap-6 items-center">
      {icon && <div className="shrink-0">{icon}</div>}
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
