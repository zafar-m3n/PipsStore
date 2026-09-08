import { useEffect } from "react";
import { captureAdTracking } from "@/lib/tracking";

/** Capture gclid / keyword / loc_physical into sessionStorage once on mount. */
export function useAdTracking() {
  useEffect(() => {
    captureAdTracking();
  }, []);
}

export default useAdTracking;
