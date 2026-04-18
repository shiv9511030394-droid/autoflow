// Option 2: Lightning Bolt "A" — Electric neon feel
export default function LogoOption2({ size = 'md', showTagline = false }) {
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
            'drop-shadow(0 0 6px rgba(250,204,21,0.8)) drop-shadow(0 0 16px rgba(99,102,241,0.6))',
        }}
      >
        <defs>
          <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>

        {/* Letter A shape with lightning bolt cutout */}
        {/* Outer A */}
        <path
          d="M50 8 L88 88 H68 L60 68 H40 L32 88 H12 Z"
          fill="url(#boltGrad)"
        />
        {/* Crossbar cutout */}
        <path
          d="M36 60 H64 L58 44 H42 Z"
          fill="#0f172a"
        />
        {/* Inner triangle cutout (top of A) */}
        <path
          d="M50 22 L62 52 H38 Z"
          fill="#0f172a"
        />
        {/* Lightning bolt overlay */}
        <path
          d="M54 18 L44 46 H52 L42 78 L66 42 H56 Z"
          fill="#facc15"
          opacity="0.9"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span style={{
          fontSize: s.text,
          fontWeight: 800,
          letterSpacing: '0.12em',
          background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 50%, #facc15 100%)',
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
