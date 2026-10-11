import { useSyncExternalStore } from "react";

// Most pages here are statically prerendered at build/deploy time, so a plain
// `new Date().getFullYear()` in a component body gets baked into the HTML
// once and never updates again until the next deploy. useSyncExternalStore
// lets the server/initial render use a fixed fallback, then recomputes the
// real year in the visitor's own browser on every page load.
function subscribe() {
  return () => {};
}

function getSnapshot() {
  return new Date().getFullYear();
}

const BUILD_YEAR = getSnapshot();

function getServerSnapshot() {
  return BUILD_YEAR;
}

export function useCurrentYear() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
