"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "age-verified";

export default function AgeModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem(STORAGE_KEY);
    if (!isVerified) {
      setShowModal(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShowModal(false);
  };

  const handleExit = () => {
    window.location.href = "https://google.com";
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-zinc-900 p-6 text-center">
        <div className="mb-4 text-4xl">🔞</div>
        <h2 className="mb-2 text-xl font-semibold text-white">
          Adult Content Warning
        </h2>
        <p className="mb-6 text-sm text-zinc-400">
          This page contains adult content. You must be 18 years or older to
          view this content.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full rounded-full bg-pink-600 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-700"
          >
            I am 18+
          </button>
          <button
            onClick={handleExit}
            className="w-full rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-400 transition-colors hover:bg-zinc-800"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
