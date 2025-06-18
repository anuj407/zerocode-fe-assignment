import { useEffect, RefObject } from "react";

export default function useAutoScroll(
  ref: RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
