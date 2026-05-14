import { useState, useEffect } from "react";
import MuscleSelect from "../shared/MuscleSelect";
import ExerciseSelect from "../shared/ExerciseSelect";
import type { ExerciseFormData, ExercicioJSON } from "../../types";

interface Props {
  values: ExerciseFormData;
  exerciciosData: ExercicioJSON[];
  onChange: (field: keyof ExerciseFormData, value: string) => void;
  showDelete?: boolean;
  onDelete?: () => void;
  initialMuscle?: string;
  initialExerciseId?: string;
}

export default function ExerciseRow({
  values,
  exerciciosData,
  onChange,
  showDelete = false,
  onDelete,
  initialMuscle,
  initialExerciseId,
}: Props) {
  const [selectedMuscle, setSelectedMuscle] = useState<string>("Músculo");
  const baseUrl = import.meta.env.BASE_URL;
  const muscles = [
    ...new Set(exerciciosData.flatMap((e) => e.musculoAlvo)),
  ].sort();

  const filteredExercises =
    selectedMuscle !== "Músculo"
      ? exerciciosData.filter((e) => e.musculoAlvo.includes(selectedMuscle))
      : [];

  useEffect(() => {
    if (initialMuscle && muscles.includes(initialMuscle)) {
      setSelectedMuscle(initialMuscle);
    }
    if (initialExerciseId) {
      const ex = exerciciosData.find(e => e.exerciseId === initialExerciseId);
      if (ex) {
        onChange("nomeExercicio", ex.nome);
        onChange("jsonId", ex.exerciseId);
      }
    }
  }, []);

  const handleMuscleSelect = (muscle: string) => {
    setSelectedMuscle(muscle);
    onChange("nomeExercicio", "");
    onChange("jsonId", "");
  };

  const handleExerciseSelect = (ex: ExercicioJSON) => {
    onChange("nomeExercicio", ex.nome);
    onChange("jsonId", ex.exerciseId);
  };

  const isMuscleSelected = selectedMuscle !== "Músculo";

  return (
    <div className="flex items-center gap-2">
      {/* Músculo */}
      <div className="w-20 sm:w-24 shrink-0">
        <MuscleSelect
          muscles={muscles}
          selected={selectedMuscle}
          onSelect={handleMuscleSelect}
        />
      </div>

      {/* Exercício */}
      <div className="flex-1 min-w-0">
        {isMuscleSelected ? (
          <ExerciseSelect
            exercises={filteredExercises}
            selectedName={values.nomeExercicio}
            onSelect={handleExerciseSelect}
          />
        ) : (
          <input
            type="text"
            placeholder="Digite o nome do exercício"
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={values.nomeExercicio}
            onChange={(e) => onChange("nomeExercicio", e.target.value)}
            required
          />
        )}
      </div>

      {/* Séries */}
      <div className="w-12 shrink-0">
        <input
          type="number"
          placeholder="Sér."
          className="w-full border border-gray-300 rounded px-1 py-1.5 text-sm text-center"
          value={values.serie}
          onChange={(e) => onChange("serie", e.target.value)}
          required
        />
      </div>

      {/* Repetições */}
      <div className="w-12 shrink-0">
        <input
          type="number"
          placeholder="Rep."
          className="w-full border border-gray-300 rounded px-1 py-1.5 text-sm text-center"
          value={values.repeticoes}
          onChange={(e) => onChange("repeticoes", e.target.value)}
          required
        />
      </div>

      {/* Peso */}
      <div className="w-12 shrink-0">
        <input
          type="text"
          placeholder="Kg"
          className="w-full border border-gray-300 rounded px-1 py-1.5 text-sm text-center"
          value={values.peso || ""}
          onChange={(e) => onChange("peso", e.target.value)}
        />
      </div>

      {/* Lixeira */}
      <div className="w-6 shrink-0 flex justify-center">
        {showDelete && onDelete && (
          <div className="cursor-pointer" onClick={onDelete}>
            <img
              src={`${baseUrl}trash_icon.svg`}
              alt="Excluir exercício"
              className="h-7 w-7 opacity-70 hover:opacity-100"
            />
          </div>
        )}
      </div>
    </div>
  );
}