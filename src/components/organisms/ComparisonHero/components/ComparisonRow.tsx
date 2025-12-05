import { Typography } from "@/components/atoms";

interface ComparisonRowProps {
  label: string;
  leftValue: string | string[];
  rightValue: string | string[];
  layout?: "three-column" | "two-column-left" | "two-column-right";
}

/**
 * Comparison Row Component
 * Displays a single comparison row with label and two values
 */
export function ComparisonRow({
  label,
  leftValue,
  rightValue,
  layout = "three-column",
}: ComparisonRowProps) {
  const renderValue = (value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <span key={index}>
          {index + 1}. {item}
          {index < value.length - 1 && <br />}
        </span>
      ));
    }
    return value;
  };

  if (layout === "three-column") {
    return (
      <div className="flex flex-col md:grid md:grid-cols-3 w-full gap-2 md:gap-0">
        {/* Mobile: Label first */}
        <Typography
          color="white"
          variant="h6"
          align="center"
          weight="600"
          className="max-w-full md:max-w-[18rem] flex justify-center items-center mx-auto order-first md:order-2 text-sm md:text-base lg:text-lg mb-2 md:mb-0"
        >
          {label}
        </Typography>
        <Typography
          color="white"
          variant="h6"
          align="center"
          weight="200"
          className="max-w-full md:max-w-md mx-auto order-2 md:order-1 text-xs md:text-sm lg:text-base"
        >
          {renderValue(leftValue)}
        </Typography>
        <Typography
          color="white"
          variant="h6"
          align="center"
          weight="200"
          className="order-3 text-xs md:text-sm lg:text-base"
        >
          {renderValue(rightValue)}
        </Typography>
      </div>
    );
  }

  const displayValue = layout === "two-column-left" ? leftValue : rightValue;

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-2 md:gap-0">
      <Typography
        color="white"
        variant="h6"
        align="left"
        weight="600"
        className="max-w-full md:max-w-[18rem] text-sm md:text-base lg:text-lg"
      >
        {label}
      </Typography>
      <Typography
        color="white"
        variant="h6"
        align="left"
        weight="200"
        className="max-w-full md:max-w-[20rem] flex md:justify-center items-center md:mx-auto text-xs md:text-sm lg:text-base"
      >
        {renderValue(displayValue)}
      </Typography>
    </div>
  );
}
