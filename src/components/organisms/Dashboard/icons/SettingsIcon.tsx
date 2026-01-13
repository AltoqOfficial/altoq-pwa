interface IconProps {
  className?: string;
  isActive?: boolean;
}

export function SettingsIcon({ className, isActive = false }: IconProps) {
  const strokeColor = isActive ? "#ff2727" : "#868686";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      className={className}
    >
      <path
        d="M11.25 9.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 2.64c0 1.435-1.802 2.534-3.074 1.792C1.406 3.21-.32 6.577 1.686 7.928c1.224.714 1.225 2.88 0 3.595-2.163 1.311-.189 4.66 1.99 3.486 1.38-.804 3.075.512 3.075 1.956 0 2.411 3.98 2.35 3.98 0 0-1.47 1.67-2.775 3.074-1.956 2.24 1.207 4.168-2.312 1.99-3.486-1.226-.715-1.225-2.89 0-3.604 2.163-1.31.19-4.66-1.99-3.487-1.243.726-3.073-.363-3.074-1.792 0-2.56-3.98-2.48-3.98 0"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
