import LogoOption2 from '@/components/LogoOption2'
import LogoOption3 from '@/components/LogoOption3'

export default function LogoPreview() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-16 p-12">
      <h1 className="text-3xl font-bold text-white">Logo Options — Choose One</h1>

      {/* Option 2 */}
      <div className="glass rounded-2xl p-12 flex flex-col items-center gap-8 w-full max-w-lg">
        <p className="text-gray-400 text-sm uppercase tracking-widest">Option 2 — Lightning Bolt A</p>
        <LogoOption2 size="lg" />
        <LogoOption2 size="md" />
        <LogoOption2 size="sm" />
      </div>

      {/* Option 3 */}
      <div className="glass rounded-2xl p-12 flex flex-col items-center gap-8 w-full max-w-lg">
        <p className="text-gray-400 text-sm uppercase tracking-widest">Option 3 — Hexagon Tech A</p>
        <LogoOption3 size="lg" />
        <LogoOption3 size="md" />
        <LogoOption3 size="sm" />
      </div>
    </div>
  )
}
