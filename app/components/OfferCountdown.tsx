"use client";

import { useEffect, useState } from "react";

const OFFER_DURATION_SECONDS = 15 * 60;

function getTimeParts(totalSeconds: number) {
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-9 flex-col items-center">
      <span className="text-xl font-extrabold tabular-nums text-white">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[10px] font-semibold text-white/70">{label}</span>
    </div>
  );
}

export default function OfferCountdown() {
  const [remaining, setRemaining] = useState(OFFER_DURATION_SECONDS);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setRemaining(Math.max(OFFER_DURATION_SECONDS - elapsed, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const { hours, minutes, seconds } = getTimeParts(remaining);

  return (
    <section className="flex flex-col items-center" aria-label="Oferta por tiempo limitado">
      <div className="rounded-md bg-zinc-700 px-4 py-1.5 text-lg font-extrabold text-white shadow-lg">
        75% OFF
      </div>
      <div className="mt-5 flex items-start gap-2" aria-live="polite">
        <TimeUnit value={hours} label="hrs" />
        <span className="pt-0.5 text-xl font-bold text-white">:</span>
        <TimeUnit value={minutes} label="min" />
        <span className="pt-0.5 text-xl font-bold text-white">:</span>
        <TimeUnit value={seconds} label="sec" />
      </div>
    </section>
  );
}
