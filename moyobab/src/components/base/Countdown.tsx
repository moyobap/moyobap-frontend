import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
  onExpire?: () => void;
  className?: string;
}

export default function Countdown({
  targetDate,
  onExpire,
  className = "",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff > 0) {
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return { minutes, seconds, expired: false };
    }
    return { minutes: 0, seconds: 0, expired: true };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const next = calculateTimeLeft();
      setTimeLeft(next);
      if (next.expired && onExpire) onExpire();
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  const format = (num: number) => num.toString().padStart(2, "0");

  if (timeLeft.expired) {
    return (
      <span className={`text-[#EF4444] font-medium ${className}`}>마감됨</span>
    );
  }

  return (
    <span className={`font-mono font-medium ${className}`}>
      {format(timeLeft.minutes)}:{format(timeLeft.seconds)}
    </span>
  );
}
