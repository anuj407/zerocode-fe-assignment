// hooks/useAutoScroll.ts
import { useEffect, RefObject } from "react";

export default function useAutoScroll<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, deps);
}
