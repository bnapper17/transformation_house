import { useSyncExternalStore } from "react";
import { APPLE_MAPS_HREF, GOOGLE_MAPS_HREF } from "./contactInfo";

// The maps link depends on navigator.userAgent, which isn't available during
// SSR. useSyncExternalStore lets the server render the Google Maps default
// and swap to the Apple Maps link post-hydration without an effect + setState
// (which the react-hooks lint rule flags as an avoidable extra render).
function subscribe() {
  return () => {};
}

function getSnapshot() {
  const isApplePlatform = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  return isApplePlatform ? APPLE_MAPS_HREF : GOOGLE_MAPS_HREF;
}

function getServerSnapshot() {
  return GOOGLE_MAPS_HREF;
}

export function useMapsHref() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
