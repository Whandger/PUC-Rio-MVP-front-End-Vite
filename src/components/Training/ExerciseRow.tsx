import type { ExerciseFormData } from '../../types';

interface Props {
  values: ExerciseFormData;
  onChange: (field: keyof ExerciseFormData, value: string) => void;
}

export default function ExerciseRow({ values, onChange }: Props) {
  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        placeholder="Exercício"
        className="flex-1 border border-gray-300 rounded px-2 py-1"
        value={values.nomeExercicio}
        onChange={(e) => onChange('nomeExercicio', e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Séries"
        className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
        value={values.serie}
        onChange={(e) => onChange('serie', e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Reps"
        className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
        value={values.repeticoes}
        onChange={(e) => onChange('repeticoes', e.target.value)}
        required
      />
    </div>
  );
}