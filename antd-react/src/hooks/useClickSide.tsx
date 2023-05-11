import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLDivElement>, handler: Function) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) { // 点击的是下拉框
        return;
      }
      // 点击的是其他地方
      handler(e)
    }

    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside