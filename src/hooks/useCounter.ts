import { useEffect, useState } from "react";

export function useCounter() {
  const [timeOut, setTimeOut] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOut(false);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [timeOut]);

  function activeCount() {
    setTimeOut(true);
  }

  return { timeOut, setTimeOut, activeCount };
}
