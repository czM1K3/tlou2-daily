import React, { useState, useEffect, FC } from "react";

const Midnight: FC = () => {
  // Returns the milliseconds until the next UTC midnight
  const getTimeLeftMs = (): number => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const day = now.getUTCDate();
    // Timestamp (ms) for next-day UTC midnight
    const nextMidnight = Date.UTC(year, month, day + 1);
    return nextMidnight - now.getTime();
  };

  const [timeLeftMs, setTimeLeftMs] = useState<number>(getTimeLeftMs());

  useEffect(() => {
    const update = () => setTimeLeftMs(getTimeLeftMs());
    const timerId = setInterval(update, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Convert ms → h:m:s
  const totalSeconds = Math.max(0, Math.floor(timeLeftMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number): string => String(n).padStart(2, "0");

  return (
    <div>
      Closes in: {pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </div>
  );
}

export default Midnight;
