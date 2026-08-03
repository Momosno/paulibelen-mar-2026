"use client";

interface AgeModalProps {
  onConfirm: () => void;
  onExit: () => void;
}

/**
 * Presentational only — <AgeGate /> owns the verified state, because whether
 * the explicit content mounts at all depends on it.
 */
export default function AgeModal({ onConfirm, onExit }: AgeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-zinc-900 p-6 text-center">
        <div className="mb-4 text-4xl">🔞</div>
        <h2 className="mb-2 text-xl font-semibold text-white">
          Contenido para adultos
        </h2>
        <p className="mb-6 text-sm text-zinc-400">
          Esta pagina contiene contenido para adultos. Debes tener 18 años o mas para ver este contenido.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full rounded-full bg-pink-600 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-700"
          >
            Soy mayor de 18 años
          </button>
          <button
            onClick={onExit}
            className="w-full rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-400 transition-colors hover:bg-zinc-800"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
