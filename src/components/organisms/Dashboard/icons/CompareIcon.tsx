interface IconProps {
  className?: string;
  isActive?: boolean;
}

export function CompareIcon({ className, isActive = false }: IconProps) {
  const strokeColor = isActive ? "#ff2727" : "#868686";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      className={className}
    >
      <path
        d="M18.75 16.25c0-2.09-1.67-5.068-4-5.727m-2 5.727c0-2.651-2.686-6-6-6s-6 3.349-6 6m12-9.5a3 3 0 0 0 0-6m-3 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
