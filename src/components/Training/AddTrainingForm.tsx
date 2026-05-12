import type { ExerciseFormData } from '../../types';

import ExerciseRow from './ExerciseRow';

import { useAddTrainingForm } from '../../hooks/useAddTrainingForm';

interface Props {
  visible: boolean;

  onAdd: (data: {
    nome: string;
    exercicios: ExerciseFormData[];
  }) => void;

  onCancel: () => void;

  onToggle: () => void;
}

export default function AddTrainingForm({
  visible,
  onAdd,
  onCancel,
  onToggle,
}: Props) {
  const {
    nomeTreino,
    exercicios,

    setNomeTreino,

    addRow,
    updateRow,
    handleSubmit,
  } = useAddTrainingForm({ onAdd });

  return (
    <section className="w-[92%]">
      {!visible ? (
        <div
          className="bg-white rounded-lg shadow p-4 text-center cursor-pointer text-[#bababa] text-4xl font-thin"
          onClick={onToggle}
        >
          +
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Nome do treino"
            className="border-b-2 border-[#2686cf] outline-none text-lg pb-1"
            value={nomeTreino}
            onChange={(e) =>
              setNomeTreino(e.target.value)
            }
            required
          />

          {exercicios.map((ex, idx) => (
            <ExerciseRow
              key={idx}
              values={ex}
              onChange={(field, val) =>
                updateRow(idx, field, val)
              }
            />
          ))}

          <button
            type="button"
            onClick={addRow}
            className="text-[#3588d4] font-bold self-start"
          >
            + Adicionar exercício
          </button>

          <div className="flex justify-center gap-8">
            <img
              src="/trash_icon.svg"
              alt="Cancelar"
              className="w-6 opacity-60 cursor-pointer"
              onClick={onCancel}
            />

            <button type="submit">
              <img
                src="/disk_icon.svg"
                alt="Salvar"
                className="w-6 opacity-60 cursor-pointer"
              />
            </button>
          </div>
        </form>
      )}
    </section>
  );
}