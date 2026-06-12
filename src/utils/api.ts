/**
 * API Url resolver utility to support cross-origin API proxying from 
 * static platforms (like Firebase Hosting) back to our container.
 */
export function getApiUrl(path: string): string {
  const isExternal = window.location.hostname.includes("web.app") || 
                     window.location.hostname.includes("firebaseapp.com");
  
  const remoteOrigin = import.meta.env.VITE_API_URL || "https://ais-pre-gkrycme45aokwqcnohyix7-980378852791.asia-southeast1.run.app";
  
  if (isExternal) {
    return `${remoteOrigin}${path.startsWith("/") ? "" : "/"}${path}`;
  }
  
  return path.startsWith("/") ? path : `/${path}`;
}
