/**
 * Section Icons - Roman numeral SVGs with noise effect for each comparison section
 */

export const SECTION_ICONS: Record<string, React.ReactNode> = {
  PerfilGeneral: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="72"
      viewBox="0 0 23 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#perfilGeneral-a)">
        <path d="M22.7 0v71.8H0V0z" fill="#ff2727" />
      </g>
      <defs>
        <filter
          id="perfilGeneral-a"
          x="0"
          y="0"
          width="22.699"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  ExperienciaPolitica: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="72"
      viewBox="0 0 54 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#experienciaPolitica-a)">
        <path d="M22.7 0v71.8H0V0zm30.664 0v71.8h-22.7V0z" fill="#ff2727" />
      </g>
      <defs>
        <filter
          id="experienciaPolitica-a"
          x="0"
          y="0"
          width="53.363"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  ExperienciaProfesional: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="85"
      height="72"
      viewBox="0 0 85 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#experienciaGestion-a)">
        <path
          d="M22.7 0v71.8H0V0zm30.664 0v71.8h-22.7V0zm30.664 0v71.8h-22.7V0z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="experienciaGestion-a"
          x="0"
          y="0"
          width="84.027"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  IdeologiaPolitica: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="119"
      height="72"
      viewBox="0 0 119 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#ideologiaPolitica-a)">
        <path
          d="M22.7 0v71.8H0V0zm62.164 71.8h-25.2l-34-71.8h25.5l21.5 46.8L94.464 0h24.4z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="ideologiaPolitica-a"
          x="0"
          y="0"
          width="118.863"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  PropuestasPrincipales: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="94"
      height="72"
      viewBox="0 0 94 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#propuestasPrincipales-a)">
        <path d="M59.2 71.8H34L0 0h25.5L47 46.8 68.8 0h24.4z" fill="#ff2727" />
      </g>
      <defs>
        <filter
          id="propuestasPrincipales-a"
          x="0"
          y="0"
          width="93.199"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  CoherenciaconelPlan: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="119"
      height="72"
      viewBox="0 0 119 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#coherenciaConElPlan-a)">
        <path
          d="M59.2 71.8H34L0 0h25.5L47 46.8 68.8 0h24.4zM118.911 0v71.8h-22.7V0z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="coherenciaConElPlan-a"
          x="0"
          y="0"
          width="118.91"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  Controversias: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="72"
      viewBox="0 0 150 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#controversias-a)">
        <path
          d="M59.2 71.8H34L0 0h25.5L47 46.8 68.8 0h24.4zM118.911 0v71.8h-22.7V0zm30.664 0v71.8h-22.7V0z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="controversias-a"
          x="0"
          y="0"
          width="149.574"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  Transparencia: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="181"
      height="72"
      viewBox="0 0 181 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#transparencia-a)">
        <path
          d="M59.2 71.8H34L0 0h25.5L47 46.8 68.8 0h24.4zM118.911 0v71.8h-22.7V0zm30.664 0v71.8h-22.7V0zm30.664 0v71.8h-22.7V0z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="transparencia-a"
          x="0"
          y="0"
          width="180.238"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  Competenciaspersonales: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="119"
      height="72"
      viewBox="0 0 119 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#competenciasPersonales-a)">
        <path
          d="M22.7 0v71.8H0V0zm34.364 0 15.3 18.8L87.564 0h28.4l-29.4 34.2 32.4 37.6h-28.5l-18.2-22.2-18.2 22.2h-28.4l32.3-37.6L28.564 0z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="competenciasPersonales-a"
          x="0"
          y="0"
          width="118.965"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  PercepcionPublica: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="94"
      height="72"
      viewBox="0 0 94 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#percepcionPublica-a)">
        <path
          d="m31.4 0 15.3 18.8L61.9 0h28.4L60.9 34.2l32.4 37.6H64.8L46.6 49.6 28.4 71.8H0l32.3-37.6L2.9 0z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="percepcionPublica-a"
          x="0"
          y="0"
          width="93.301"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  InnovacionyVision: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="119"
      height="72"
      viewBox="0 0 119 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#innovacionYVision-a)">
        <path
          d="m31.4 0 15.3 18.8L61.9 0h28.4L60.9 34.2l32.4 37.6H64.8L46.6 49.6 28.4 71.8H0l32.3-37.6L2.9 0zm87.609 0v71.8h-22.7V0z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="innovacionYVision-a"
          x="0"
          y="0"
          width="119.008"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),

  HistorialLegislativo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="72"
      viewBox="0 0 150 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto"
    >
      <g filter="url(#historialLegislativo-a)">
        <path
          d="m31.4 0 15.3 18.8L61.9 0h28.4L60.9 34.2l32.4 37.6H64.8L46.6 49.6 28.4 71.8H0l32.3-37.6L2.9 0zm87.609 0v71.8h-22.7V0zm30.664 0v71.8h-22.7V0z"
          fill="#ff2727"
        />
      </g>
      <defs>
        <filter
          id="historialLegislativo-a"
          x="0"
          y="0"
          width="149.672"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  ),
};
