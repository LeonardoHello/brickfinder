import { useEffect, useState } from "react";

// `useEffect` is not invoked during server rendering, meaning
// we can use this to determine if we're on the server or not.

export default function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
