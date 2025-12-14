import { Typography } from "@/components/atoms";
import { ReactNode } from "react";

interface StepCardProps {
  stepNumber: number;
  icon: ReactNode;
  title: string;
  description: string;
}

export function StepCard({
  stepNumber,
  icon,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="bg-[#F9F9F9] p-8">
      <div className="flex justify-center items-center flex-col gap-8">
        <span className="self-start">{stepNumber}</span>
        {icon}
        <div className="gap-2 flex-col flex items-center">
          <Typography variant="h5" weight="600">
            {title}
          </Typography>
          <Typography
            variant="p"
            className="max-w-[23rem] text-[#868686]"
            align="center"
          >
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
}
