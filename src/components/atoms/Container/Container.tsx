import React from "react";

import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
  children: React.ReactNode;
}

/**
 * Container Component (Atom)
 * Wrapper component with responsive max-width and centered content
 */
export const Container: React.FC<ContainerProps> = ({
  maxWidth = "xl",
  padding = true,
  className,
  children,
  ...props
}) => {
  const maxWidthStyles = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthStyles[maxWidth],
        padding && "px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
