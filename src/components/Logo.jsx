export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { icon: 34, text: 13, gap: 8 },
    md: { icon: 46, text: 18, gap: 12 },
    lg: { icon: 68, text: 26, gap: 16 },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center select-none" style={{ gap: s.gap }}>
      {/* Icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter:
            'drop-shadow(0 0 8px rgba(6,182,212,0.9)) drop-shadow(0 0 20px rgba(236,72,153,0.5))',
        }}
      >
        <defs>
          <radialGradient id="bgDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0d1117" />
            <stop offset="100%" stopColor="#060a10" />
          </radialGradient>
          <linearGradient id="planeMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="planeFold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Dark background circle */}
        <circle cx="50" cy="50" r="48" fill="url(#bgDark)" />

        {/* Outer circuit ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ringGrad)" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ringGrad)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ringGrad)" strokeWidth="0.4" />

        {/* Circuit tick marks on outer ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24
          const rad = (angle * Math.PI) / 180
          const r1 = 44, r2 = i % 6 === 0 ? 40 : 42
          return (
            <line
              key={i}
              x1={50 + r1 * Math.cos(rad)}
              y1={50 + r1 * Math.sin(rad)}
              x2={50 + r2 * Math.cos(rad)}
              y2={50 + r2 * Math.sin(rad)}
              stroke="#06b6d4"
              strokeWidth={i % 6 === 0 ? "1" : "0.5"}
              opacity={i % 6 === 0 ? "0.6" : "0.25"}
            />
          )
        })}

        {/* Octagon outer frame */}
        <path
          d="M50 4 L82 18 L96 50 L82 82 L50 96 L18 82 L4 50 L18 18 Z"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.8"
          opacity="0.2"
        />

        {/* Paper plane body — main (cyan to pink) */}
        <path
          d="M18 55 L60 24 L52 55 Z"
          fill="url(#planeMain)"
          opacity="0.95"
        />
        {/* Paper plane right wing */}
        <path
          d="M52 55 L60 24 L80 60 Z"
          fill="url(#planeMain)"
          opacity="0.65"
        />
        {/* Paper plane bottom fold — purple/pink */}
        <path
          d="M18 55 L52 55 L44 74 Z"
          fill="url(#planeFold)"
          opacity="0.9"
        />
        {/* Center fold crease */}
        <line x1="18" y1="55" x2="52" y2="55" stroke="white" strokeWidth="0.6" opacity="0.3" />

        {/* Curl/swirl at tail */}
        <path
          d="M44 74 Q36 78 32 72 Q28 64 36 60 Q42 57 44 62"
          stroke="url(#planeFold)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Tip glow */}
        <circle cx="60" cy="24" r="2" fill="#06b6d4" opacity="0.9" />

        {/* Pink accent dot */}
        <circle cx="14" cy="64" r="2" fill="#ec4899" opacity="0.85" />

        {/* Small circuit dots */}
        <circle cx="82" cy="30" r="1.2" fill="#06b6d4" opacity="0.5" />
        <circle cx="82" cy="70" r="1.2" fill="#a855f7" opacity="0.5" />
        <circle cx="18" cy="30" r="1.2" fill="#06b6d4" opacity="0.5" />
      </svg>

      {/* AOTUFLOW text */}
      <span
        style={{
          fontSize: s.text,
          fontWeight: 800,
          letterSpacing: '0.08em',
          fontStyle: 'italic',
          background: 'linear-gradient(90deg, #94a3b8 0%, #818cf8 50%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        AOTUFLOW
      </span>
    </div>
  )
}
