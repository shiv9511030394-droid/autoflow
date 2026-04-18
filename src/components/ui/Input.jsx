import { cn } from '@/lib/utils'

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full glass rounded-lg px-4 py-2.5 text-white placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  )
}
