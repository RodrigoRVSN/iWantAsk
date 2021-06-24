import { useEffect, useState } from "react";

export function Counter() {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{timer < 10 ? `00:0${timer}` : `00:${timer}`}</>;
}
