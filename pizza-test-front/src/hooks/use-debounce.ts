import { useRef } from 'react'

export function useDebouncedCallback<T extends (...args: Array<any>) => void>(
  callback: T,
  delay = 300,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
