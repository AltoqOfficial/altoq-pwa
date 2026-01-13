interface IconProps {
  className?: string;
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      className={className}
    >
      <path
        d="M8.25 9c3.942 0 7.987 2.563 8.249 7.712a.75.75 0 0 1-.71.787c-2.08.106-11.713.171-15.077 0a.75.75 0 0 1-.711-.787C.263 11.564 4.308 9 8.25 9m0-9a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5"
        fill="#000"
      />
    </svg>
  );
}
