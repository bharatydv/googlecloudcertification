/**
 * An original abstract visual for the hero: three stacked planes suggesting
 * the foundational / associate / professional progression, with a light
 * connective graph above them. Purely decorative and hidden from screen
 * readers.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 320"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="gcp-plane-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f6fe4" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2f6fe4" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gcp-plane-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f6fe4" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#2f6fe4" stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id="gcp-plane-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#123882" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1a58cc" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Connective graph */}
      <g stroke="#8ab0f6" strokeWidth="1.2" opacity="0.75">
        <path d="M120 62 L210 34 L300 62" fill="none" />
        <path d="M210 34 L210 96" fill="none" />
        <path d="M120 62 L210 96 L300 62" fill="none" />
      </g>
      <g fill="#ffffff" stroke="#2f6fe4" strokeWidth="1.6">
        <circle cx="210" cy="34" r="7" />
        <circle cx="120" cy="62" r="6" />
        <circle cx="300" cy="62" r="6" />
      </g>
      <circle cx="210" cy="96" r="5" fill="#2f6fe4" />

      {/* Three stacked planes */}
      <g>
        <path
          d="M210 118 L346 158 L210 198 L74 158 Z"
          fill="url(#gcp-plane-a)"
          stroke="#b6cffb"
          strokeWidth="1.2"
        />
        <path
          d="M210 160 L346 200 L210 240 L74 200 Z"
          fill="url(#gcp-plane-b)"
          stroke="#8ab0f6"
          strokeWidth="1.2"
        />
        <path
          d="M210 202 L346 242 L210 282 L74 242 Z"
          fill="url(#gcp-plane-c)"
          stroke="#123882"
          strokeWidth="1.2"
        />
      </g>

      {/* Progress marks along the lowest plane */}
      <g fill="#8ab0f6">
        <circle cx="150" cy="242" r="3.2" />
        <circle cx="180" cy="251" r="3.2" />
        <circle cx="210" cy="260" r="3.2" />
      </g>
      <circle cx="240" cy="251" r="3.2" fill="#ffffff" opacity="0.55" />
      <circle cx="270" cy="242" r="3.2" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}
