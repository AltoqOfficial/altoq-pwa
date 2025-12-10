import { SectionHeader } from "./SectionHeader";

interface SectionWrapperProps {
  id: string;
  title: string;
  sectionId: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section Wrapper Component
 * Wraps each comparison section with header
 * Used for horizontal carousel layout
 */
export function SectionWrapper({
  id,
  title,
  sectionId,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <div id={id} className={className ? `w-full ${className}` : "w-full"}>
      <div className="px-4 md:px-12 space-y-4 md:space-y-6">
        <SectionHeader title={title} sectionId={sectionId} />
        {children}
      </div>
    </div>
  );
}
