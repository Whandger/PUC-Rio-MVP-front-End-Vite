import { useState, useRef, useEffect } from 'react';
import type { ExerciseFormData } from '../../types';

// Adicione essa interface (ou importe de types.ts)
interface ExercicioJSON {
  nome: string;
  exerciseId: string;
  musculoAlvo: string[];
  gifUrl: string;
}

interface Props {
  values: ExerciseFormData;
  exerciciosData: ExercicioJSON[];  // NOVA prop
  onChange: (field: keyof ExerciseFormData, value: string) => void;
}

export default function ExerciseRow({ values, exerciciosData, onChange }: Props) {
  // Estados dos dropdowns
  const [muscleOpen, setMuscleOpen] = useState(false);
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string>('Músculo');

  // Refs para fechar ao clicar fora
  const muscleRef = useRef<HTMLDivElement>(null);
  const exerciseRef = useRef<HTMLDivElement>(null);

  // Lista única de músculos
  const muscles = [...new Set(exerciciosData.flatMap(e => e.musculoAlvo))].sort();

  // Exercícios filtrados pelo músculo selecionado
  const filteredExercises = selectedMuscle !== 'Músculo'
    ? exerciciosData.filter(e => e.musculoAlvo.includes(selectedMuscle))
    : [];

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (muscleRef.current && !muscleRef.current.contains(e.target as Node)) {
        setMuscleOpen(false);
      }
      if (exerciseRef.current && !exerciseRef.current.contains(e.target as Node)) {
        setExerciseOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectMuscle = (muscle: string) => {
    setSelectedMuscle(muscle);
    setMuscleOpen(false);
    onChange('nomeExercicio', '');
    onChange('jsonId', '');
    setExerciseOpen(true);
  };

  const handleSelectExercise = (ex: ExercicioJSON) => {
    onChange('nomeExercicio', ex.nome);
    onChange('jsonId', ex.exerciseId);
    setExerciseOpen(false);
  };

  return (
    <div className="flex gap-2 w-full items-start">
      {/* Botão Músculo + Dropdown */}
      <div className="relative" ref={muscleRef}>
        <button
          type="button"
          onClick={() => setMuscleOpen(!muscleOpen)}
          className="border border-gray-300 rounded py-1 bg-white text-sm"
        >
          {selectedMuscle}
        </button>
        {muscleOpen && (
          <div className="absolute z-10 mt-1 w-40 bg-white border rounded shadow max-h-40 overflow-y-auto">
            {muscles.map(m => (
              <div
                key={m}
                className="px-2 py-1 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelectMuscle(m)}
              >
                {m}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Exercício + Dropdown */}
      <div className="relative flex-1" ref={exerciseRef}>
        <input
          type="text"
          placeholder="Exercício"
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={values.nomeExercicio}
          readOnly
          onClick={() => setExerciseOpen(prev => !prev)}
          required
        />
        {exerciseOpen && filteredExercises.length > 0 && (
          <div className="absolute z-10 mt-0 w-62.5 bg-white border rounded shadow max-h-100 overflow-y-auto">
            {filteredExercises.map(ex => (
              <div
                key={ex.exerciseId}
                className="flex items-center gap-4 px-0 py-0 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelectExercise(ex)}
              >
                <img src={ex.gifUrl} alt={ex.nome} className="w-20 h-20 rounded object-cover" />
                <span>{ex.nome}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Séries e Repetições */}
      <input
        type="number"
        placeholder="Séries"
        className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
        value={values.serie}
        onChange={e => onChange('serie', e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Reps"
        className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
        value={values.repeticoes}
        onChange={e => onChange('repeticoes', e.target.value)}
        required
      />
    </div>
  );
}