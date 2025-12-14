export function QuestionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
    >
      <g clipPath="url(#question-clip)">
        <path
          d="M56.666 3.333H23.333c-3.667 0-6.667 3-6.667 6.667v60c0 3.667 3 6.667 6.667 6.667h33.333c3.667 0 6.667-3 6.667-6.667V10c0-3.667-3-6.667-6.667-6.667m0 60H23.333V16.667h33.333zM39.999 22.4c-6.533 0-11.666 5.067-11.666 11.567h5.833c0-3.1 2.733-5.834 5.833-5.834s5.834 2.734 5.834 5.834c0 5.833-8.767 5.233-8.767 14.833h5.867c0-6.533 8.733-7.3 8.733-14.833 0-6.534-5.133-11.567-11.667-11.567m-3.333 30.933h6.667V60h-6.667z"
          fill="url(#question-gradient)"
        />
      </g>
      <defs>
        <linearGradient
          id="question-gradient"
          x1="39.999"
          y1="3.333"
          x2="39.999"
          y2="76.667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e40004" />
          <stop offset="1" stopColor="#ff2727" />
        </linearGradient>
        <clipPath id="question-clip">
          <path fill="#fff" d="M0 0h80v80H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
