import { useEffect, useState } from "react";
import { debounce } from "@/utils/lodash-impl";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const handleResize = debounce(update, 150);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  return isMobile;
}
