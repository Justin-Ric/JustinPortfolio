function FlowingWaves() {
  return (
    <svg
      className="flowing-waves"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="wave-violet-blue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4f46e5" stopOpacity="0.05" />
          <stop offset="0.45" stopColor="#8b75ff" stopOpacity="0.64" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="wave-blue-indigo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.08" />
          <stop offset="0.5" stopColor="#536dfe" stopOpacity="0.48" />
          <stop offset="1" stopColor="#7162ee" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="wave-indigo-violet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6254d9" stopOpacity="0.04" />
          <stop offset="0.56" stopColor="#7068f8" stopOpacity="0.44" />
          <stop offset="1" stopColor="#4489fa" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <g className="wave-ribbon wave-ribbon--one">
        <path
          className="wave-glow"
          d="M-180 158 C80 76 215 241 470 174 S855 82 1085 167 S1390 229 1630 123"
          stroke="url(#wave-violet-blue)"
        />
        <path
          className="wave-line"
          d="M-180 158 C80 76 215 241 470 174 S855 82 1085 167 S1390 229 1630 123"
          stroke="url(#wave-violet-blue)"
        />
      </g>
      <g className="wave-ribbon wave-ribbon--two">
        <path
          className="wave-glow"
          d="M-190 382 C76 462 255 301 515 365 S890 465 1110 376 S1415 298 1640 400"
          stroke="url(#wave-blue-indigo)"
        />
        <path
          className="wave-line"
          d="M-190 382 C76 462 255 301 515 365 S890 465 1110 376 S1415 298 1640 400"
          stroke="url(#wave-blue-indigo)"
        />
      </g>
      <g className="wave-ribbon wave-ribbon--three">
        <path
          className="wave-glow"
          d="M-170 612 C90 520 265 684 510 615 S865 526 1115 608 S1420 689 1630 578"
          stroke="url(#wave-indigo-violet)"
        />
        <path
          className="wave-line"
          d="M-170 612 C90 520 265 684 510 615 S865 526 1115 608 S1420 689 1630 578"
          stroke="url(#wave-indigo-violet)"
        />
      </g>
      <g className="wave-ribbon wave-ribbon--four">
        <path
          className="wave-glow"
          d="M-180 810 C100 728 265 886 540 810 S915 733 1145 814 S1420 877 1640 774"
          stroke="url(#wave-blue-indigo)"
        />
        <path
          className="wave-line"
          d="M-180 810 C100 728 265 886 540 810 S915 733 1145 814 S1420 877 1640 774"
          stroke="url(#wave-blue-indigo)"
        />
      </g>
    </svg>
  )
}

export default FlowingWaves
