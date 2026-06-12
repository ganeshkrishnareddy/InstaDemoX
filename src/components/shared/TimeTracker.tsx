import { useEffect, useRef } from "react";
import { getApiUrl } from "../../utils/api";

interface TimeTrackerProps {
  slug: string;
}

export default function TimeTracker({ slug }: TimeTrackerProps) {
  const secondsRef = useRef<number>(0);

  useEffect(() => {
    // Increment timer every second
    const interval = setInterval(() => {
      secondsRef.current += 1;
    }, 1000);

    // Save timer progression to server
    const saveTime = async (seconds: number) => {
      if (seconds <= 0) return;
      try {
        await fetch(getApiUrl("/api/track"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug, seconds }),
        });
      } catch (err) {
        // Fail silently
      }
    };

    // Save every 20 seconds as a keepalive (safe, lightweight)
    const keepaliveInterval = setInterval(() => {
      saveTime(secondsRef.current);
    }, 20000);

    // Save on unmount or beforeunload
    const handleUnload = () => {
      // Use sendBeacon for more reliable upload on closing/routing away, fallback to normal fetch
      const payload = JSON.stringify({ slug, seconds: secondsRef.current });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(getApiUrl("/api/track"), new Blob([payload], { type: "application/json" }));
      } else {
        saveTime(secondsRef.current);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);

    return () => {
      clearInterval(interval);
      clearInterval(keepaliveInterval);
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, [slug]);

  return null; // Invisible component
}
