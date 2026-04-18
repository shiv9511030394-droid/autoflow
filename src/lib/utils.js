import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const currencies = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'INR', symbol: '₹', rate: 83 },
  { code: 'AUD', symbol: 'A$', rate: 1.52 },
  { code: 'CAD', symbol: 'C$', rate: 1.36 },
  { code: 'JPY', symbol: '¥', rate: 149 },
]

export const formatPrice = (price, currency) => {
  const curr = currencies.find(c => c.code === currency) || currencies[0]
  const convertedPrice = Math.round(price * curr.rate)
  return `${curr.symbol}${convertedPrice}`
}
