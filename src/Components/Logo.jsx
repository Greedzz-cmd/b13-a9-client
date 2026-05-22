export default function DocAppointLogo({
  showTagline = false,
  size = "md",
  theme = "auto",
  className = "",
}) {
  const sizes = {
    sm: { width: 200, height: 40 },
    md: { width: 320, height: 60 },
    lg: { width: 480, height: 90 },
  };

  const isDark =
    theme === "dark" ? true : theme === "light" ? false : undefined;

  const textPrimary =
    isDark === true ? "#F9FAFB" : isDark === false ? "#172554" : undefined;
  const textMuted =
    isDark === true ? "#93C5FD" : isDark === false ? "#3B82F6" : undefined;

  const { width, height } = sizes[size];
  const scale = height / 72;
  const fontSize = height * 0.56;
  const totalHeight = showTagline ? height + 20 : height;

  const docTextWidth = fontSize * 3 * 0.52;
  const dotGap = fontSize * 0.22;
  const dotRadius = height * 0.046;
  const dotCx = docTextWidth + dotGap;
  const appointX = dotCx + dotGap + dotRadius;

  const iconWidth = scale * 72;
  const wordmarkX = iconWidth + 14;

  return (
    <svg
      width={width}
      height={totalHeight}
      viewBox={`0 0 ${width} ${totalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="docAppoint"
      role="img"
      className={className}
    >
      {isDark === undefined && (
        <style>{`
          .da-text-primary { fill: #172554; }
          .da-text-muted   { fill: #3B82F6; }
          @media (prefers-color-scheme: dark) {
            .da-text-primary { fill: #F9FAFB; }
            .da-text-muted   { fill: #93C5FD; }
          }
        `}</style>
      )}

      <title>docAppoint</title>

      {/* Icon */}
      <g transform={`scale(${scale})`}>
        <circle cx="36" cy="36" r="36" fill="#172554" />
        <rect x="20" y="26" width="32" height="33" rx="3" fill="white" />
        <rect
          x="27"
          y="22"
          width="14"
          height="8"
          rx="3"
          fill="white"
          stroke="#172554"
          strokeWidth="1.5"
        />
        <rect x="30" y="20" width="8" height="5" rx="2" fill="#172554" />
        <line
          x1="25"
          y1="38"
          x2="47"
          y2="38"
          stroke="#172554"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
        <line
          x1="25"
          y1="44"
          x2="42"
          y2="44"
          stroke="#172554"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
        <line
          x1="25"
          y1="50"
          x2="38"
          y2="50"
          stroke="#172554"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
        <circle cx="52" cy="58" r="10" fill="#00C98D" />
        <polyline
          points="47,58 50.5,61.5 57,54"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Wordmark */}
      <g transform={`translate(${wordmarkX}, 0)`}>
        {/* "doc" in blue-500 */}
        <text
          y={height * 0.62}
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize={fontSize}
          fontWeight="400"
          letterSpacing="-0.5"
          fill={textMuted}
          className={isDark === undefined ? "da-text-muted" : undefined}
        >
          doc
        </text>

        <circle cx={dotCx} cy={height * 0.36} r={dotRadius} fill="#172554" />

        {/* "Appoint" in blue-950 */}
        <text
          x={appointX}
          y={height * 0.62}
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize={fontSize}
          fontWeight="500"
          letterSpacing="-0.5"
          fill={textPrimary}
          className={isDark === undefined ? "da-text-primary" : undefined}
        >
          Appoint
        </text>

        {showTagline && (
          <text
            x="2"
            y={height + 14}
            fontFamily="'Helvetica Neue', Arial, sans-serif"
            fontSize={12}
            fontWeight="400"
            letterSpacing="0.4"
            fill={textMuted}
            className={isDark === undefined ? "da-text-muted" : undefined}
          >
            Smart scheduling for healthcare
          </text>
        )}
      </g>
    </svg>
  );
}
