"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams ? `?${searchParams}` : ""}`;

    // Track pageview locally / to analytics beacon
    if (typeof window !== "undefined") {
      const sessionCount = parseInt(localStorage.getItem("pv_session_count") || "0", 10) + 1;
      localStorage.setItem("pv_session_count", sessionCount.toString());
      localStorage.setItem("pv_last_page", url);
      localStorage.setItem("pv_last_active", new Date().toISOString());

      // Send beacon data if analytics provider configured
      if (window.gtag) {
        window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
          page_path: url,
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}
