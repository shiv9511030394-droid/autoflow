import { cn } from '@/lib/utils'

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'glass rounded-xl p-6 transition-all duration-300',
        hover && 'hover:bg-white/10 hover:scale-[1.02]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
