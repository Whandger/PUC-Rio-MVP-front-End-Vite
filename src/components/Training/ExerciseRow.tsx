import { useState, useRef, useEffect } from "react";
import type { ExerciseFormData, ExercicioJSON } from "../../types";

interface Props {
  values: ExerciseFormData;
  exerciciosData: ExercicioJSON[];
  onChange: (field: keyof ExerciseFormData, value: string) => void;
}

export default function ExerciseRow({
  values,
  exerciciosData,
  onChange,
}: Props) {
  // Estados dos dropdowns
  const [muscleOpen, setMuscleOpen] = useState(false);
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string>("Músculo");

  // Refs para fechar ao clicar fora
  const muscleRef = useRef<HTMLDivElement>(null);
  const exerciseRef = useRef<HTMLDivElement>(null);

  // Lista única de músculos
  const muscles = [
    ...new Set(exerciciosData.flatMap((e) => e.musculoAlvo)),
  ].sort();

  // Exercícios filtrados pelo músculo selecionado
  const filteredExercises =
    selectedMuscle !== "Músculo"
      ? exerciciosData.filter((e) => e.musculoAlvo.includes(selectedMuscle))
      : [];

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (muscleRef.current && !muscleRef.current.contains(e.target as Node)) {
        setMuscleOpen(false);
      }
      if (
        exerciseRef.current &&
        !exerciseRef.current.contains(e.target as Node)
      ) {
        setExerciseOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMuscle = (muscle: string) => {
    setSelectedMuscle(muscle);
    setMuscleOpen(false);
    onChange("nomeExercicio", "");
    onChange("jsonId", "");
    setExerciseOpen(true);
  };

  const handleSelectExercise = (ex: ExercicioJSON) => {
    onChange("nomeExercicio", ex.nome);
    onChange("jsonId", ex.exerciseId);
    setExerciseOpen(false);
  };

  return (
    <div className="flex gap-2 w-full items-start">
      {/* Coluna Músculo */}
      <div className="w-24 shrink-0 relative" ref={muscleRef}>
        <button
          type="button"
          onClick={() => setMuscleOpen(!muscleOpen)}
          className="w-full border border-gray-300 rounded px-2 py-1.5 bg-white text-sm text-left truncate"
        >
          {selectedMuscle}
        </button>
        {muscleOpen && (
          <div className="absolute z-10 w-min-44 bg-white border rounded shadow max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {muscles.map((m) => (
              <div
                key={m}
                className="px-2 py-1.5 hover:bg-blue-50 cursor-pointer text-sm"
                onClick={() => handleSelectMuscle(m)}
              >
                {m}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coluna Exercício */}
      <div className="flex-1 min-w-0 relative" ref={exerciseRef}>
        <input
          type="text"
          placeholder="Exercício"
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
          value={values.nomeExercicio}
          readOnly
          onClick={() => setExerciseOpen((prev) => !prev)}
          required
        />
        {exerciseOpen && filteredExercises.length > 0 && (
          <div className="absolute z-10 -left-34 sm:left-0 sm:right-0 w-screen sm:w-80 md:w-96 lg:w-md bg-white border rounded shadow max-h-[80dvh] sm:max-h-60 md:max-h-80 lg:max-h-186 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredExercises.map((ex) => (
              <div
                key={ex.exerciseId}
                className="flex items-center gap-3 border-gray-200 border sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelectExercise(ex)}
              >
                <img
                  src={ex.gifUrl}
                  alt={ex.nome}
                  className="w-28 h-28 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-40 lg:h-40 rounded object-cover shrink-0"
                />
                <span className="text-sm sm:text-base md:text-lg truncate whitespace-normal wrap-break-word">
                  {ex.nome}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coluna Séries */}
      <div className="w-10 shrink-0">
        <input
          type="number"
          placeholder="Sér."
          className="w-full border border-gray-300 rounded px-1 py-1.5 text-sm text-center"
          value={values.serie}
          onChange={(e) => onChange("serie", e.target.value)}
          required
        />
      </div>

      {/* Coluna Repetições */}
      <div className="w-10 shrink-0">
        <input
          type="number"
          placeholder="Rep."
          className="w-full border border-gray-300 rounded px-1 py-1.5 text-sm text-center"
          value={values.repeticoes}
          onChange={(e) => onChange("repeticoes", e.target.value)}
          required
        />
      </div>
    </div>
  );
}
