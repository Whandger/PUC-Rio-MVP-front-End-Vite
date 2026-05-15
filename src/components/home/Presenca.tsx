// src/components/home/Presenca.tsx
import { usePresenca } from "../../hooks/usePresenca";
import type { Training } from "../../types";

interface PresencaProps {
  training: Training | null;
}

export default function Presenca({ training }: PresencaProps) {
  const { timeString, horas, setHoras, minutos, setMinutos, marcarPresenca } =
    usePresenca({ training });

  return (
    <section className="bg-white w-[92%] rounded-lg shadow-md flex flex-col items-center justify-center py-3">
      <h3 className="text-gray-700 font-bold text-lg">
        {timeString || "Carregando..."}
      </h3>

      {/* Editor de duração */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-gray-600 text-sm">Duração do treino:</span>
        <div className="flex items-center gap-1">
          <input
            type="text"
            inputMode="numeric"
            min="0"
            max="24"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            className="w-14 border border-gray-300 rounded px-1 py-0.5 text-sm text-center"
            placeholder="0"
          />
          <span className="text-gray-600 text-sm">h</span>
          <input
            type="text"
            inputMode="numeric"
            min="0"
            max="59"
            value={minutos}
            onChange={(e) => setMinutos(e.target.value)}
            className="w-14 border border-gray-300 rounded px-1 py-0.5 text-sm text-center"
            placeholder="0"
          />
          <span className="text-gray-600 text-sm">m</span>
        </div>
      </div>

      <button
        onClick={marcarPresenca}
        className="bg-[#3588d4] text-white px-4 py-1 rounded mt-3 cursor-pointer hover:bg-blue-600 transition"
      >
        Marcar presença
      </button>
    </section>
  );
}
