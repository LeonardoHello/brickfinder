// `useEffect` is not invoked during server rendering, meaning
import { useEffect, useState } from "react";

// we can use this to determine if we're on the server or not.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const [value, setValue] = useState<S | C>(server);

  useEffect(() => {
    setValue(client);
  }, [client]);

  return value;
}
