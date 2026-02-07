interface IconProps {
  className?: string;
  isActive?: boolean;
}

export function MatchIcon({ className, isActive = false }: IconProps) {
  const strokeColor = isActive ? "#ff2727" : "#868686";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M9 12h6m-3-3v6m-3 5.5C5.5 20.5 2 17 2 12.5 2 8 5.5 4.5 9 4.5c2.2 0 3 1 3 1s.8-1 3-1c3.5 0 7 3.5 7 8 0 4.5-3.5 8-7 8.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
