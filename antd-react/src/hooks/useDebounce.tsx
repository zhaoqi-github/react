import { useEffect, useState } from "react";

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handle = window.setTimeout(() => {
      console.log('set')
      setDebounceValue(value)
    }, delay)
    return () => {
      console.log('leave')
      clearTimeout(handle)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce