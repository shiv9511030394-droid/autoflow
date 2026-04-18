import { cn } from '@/lib/utils'

export default function Select({ options, className, ...props }) {
  return (
    <select
      className={cn(
        'glass rounded-lg px-4 py-2.5 text-white',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        'transition-all duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-gray-900">
          {option.label}
        </option>
      ))}
    </select>
  )
}
