// Option 3: Hexagon with "A" — Tech/SaaS premium look
export default function LogoOption3({ size = 'md', showTagline = false }) {
  const sizes = {
    sm: { icon: 28, text: 15, sub: 9, gap: 8 },
    md: { icon: 36, text: 19, sub: 10, gap: 10 },
    lg: { icon: 56, text: 28, sub: 13, gap: 14 },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center select-none" style={{ gap: s.gap }}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter:
            'drop-shadow(0 0 8px rgba(6,182,212,0.8)) drop-shadow(0 0 18px rgba(139,92,246,0.5))',
        }}
      >
        <defs>
          <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="hexFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Hexagon shape */}
        <path
          d="M50 5 L92 27.5 L92 72.5 L50 95 L8 72.5 L8 27.5 Z"
          fill="url(#hexFill)"
          stroke="url(#hexGrad)"
          strokeWidth="4"
        />

        {/* Inner hexagon glow ring */}
        <path
          d="M50 14 L84 32 L84 68 L50 86 L16 68 L16 32 Z"
          fill="none"
          stroke="url(#hexGrad)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Letter A inside hexagon */}
        <path
          d="M50 22 L70 72 H60 L55 58 H45 L40 72 H30 Z"
          fill="url(#hexGrad)"
        />
        {/* A crossbar */}
        <path
          d="M43 52 H57 L54 42 H46 Z"
          fill="#0f172a"
        />
        {/* A inner cutout */}
        <path
          d="M50 30 L58 52 H42 Z"
          fill="#0f172a"
        />

        {/* Corner dots — circuit feel */}
        <circle cx="50" cy="5" r="3" fill="#06b6d4" opacity="0.8" />
        <circle cx="92" cy="27.5" r="3" fill="#8b5cf6" opacity="0.8" />
        <circle cx="92" cy="72.5" r="3" fill="#06b6d4" opacity="0.8" />
        <circle cx="50" cy="95" r="3" fill="#8b5cf6" opacity="0.8" />
        <circle cx="8" cy="72.5" r="3" fill="#06b6d4" opacity="0.8" />
        <circle cx="8" cy="27.5" r="3" fill="#8b5cf6" opacity="0.8" />
      </svg>

      <div className="flex flex-col leading-none">
        <span style={{
          fontSize: s.text,
          fontWeight: 800,
          letterSpacing: '0.12em',
          background: 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          AOTUFLOW
        </span>
        {showTagline && (
          <span style={{ fontSize: s.sub, fontWeight: 400, letterSpacing: '0.18em', color: '#64748b', marginTop: 3 }}>
            Automate. Engage. Convert.
          </span>
        )}
      </div>
    </div>
  )
}
