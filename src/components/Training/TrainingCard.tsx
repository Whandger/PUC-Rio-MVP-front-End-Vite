import { useState } from 'react';
import type { Training, ExerciseFormData } from '../../types';

interface Props {
  training: Training;
  onDelete: (id: number) => void;
  onUpdateExercise: (exerciseId: number, data: ExerciseFormData) => void;
}

export default function TrainingCard({ training, onDelete, onUpdateExercise }: Props) {
  const baseUrl = import.meta.env.BASE_URL;
  const [expanded, setExpanded] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<ExerciseFormData>({
    nomeExercicio: '',
    serie: '',
    repeticoes: '',
  });

  const startEditing = (exerciseId: number, nome: string, series: number, reps: number) => {
    setEditingId(exerciseId);
    setEditValues({
      nomeExercicio: nome,
      serie: String(series),
      repeticoes: String(reps),
    });
  };

  const saveEditing = () => {
    if (editingId === null) return;
    onUpdateExercise(editingId, editValues);
    setEditingId(null);
  };

  return (
    <div className="w-[92%] bg-white rounded-lg shadow border border-[#3498db] overflow-hidden transition-all">
      {/* Cabeçalho */}
      <div
        onClick={() => setExpanded(!expanded)}
        className={`flex justify-between items-center px-4 py-3 cursor-pointer ${
          expanded ? 'bg-[#e9e9e9] rounded-t-lg border-b border-[#3498db]' : 'bg-[#f9f9f9] rounded-lg'
        }`}
      >
        <span className="font-bold text-[#2c3e50]">{training.nome}</span>
        <span className="bg-[#3498db] text-white text-xs px-3 py-1 rounded-full">
          {training.exercicios.length} exercícios
        </span>
      </div>

      {/* Conteúdo expandido */}
      {expanded && (
        <div className="border-t-2 border-[#3498db]">
          {/* Header da tabela */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 px-4 py-2 bg-[#34495e] text-white font-bold text-sm">
            <span>Exercício</span>
            <span className="justify-self-center">Séries</span>
            <span className="justify-self-center">Reps</span>
            <span></span>
          </div>

          {/* Exercícios */}
          {training.exercicios.map((ex) => (
            <div key={ex.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 px-4 py-2 border-b border-gray-200 items-center">
              {editingId === ex.id ? (
                <>
                  <input
                    className="w-full border border-gray-300 rounded px-1 text-blue-600"
                    value={editValues.nomeExercicio}
                    onChange={(e) => setEditValues({ ...editValues, nomeExercicio: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-12 border border-gray-300 rounded text-center text-blue-600 justify-self-center"
                    value={editValues.serie}
                    onChange={(e) => setEditValues({ ...editValues, serie: e.target.value })}
                  />
                  <input
                    type="number"
                    className="w-12 border border-gray-300 rounded text-center text-blue-600 justify-self-center"
                    value={editValues.repeticoes}
                    onChange={(e) => setEditValues({ ...editValues, repeticoes: e.target.value })}
                  />
                  <div className="justify-self-center cursor-pointer" onClick={saveEditing}>
                    <img src={`${baseUrl}disk_icon.svg`} className='h-6 w-6 opacity-60' />
                  </div>
                </>
              ) : (
                <>
                  <span className="">{ex.nome_exercicio}</span>
                  <span className="justify-self-center">{ex.series}</span>
                  <span className="justify-self-center">{ex.repeticoes}</span>
                  <div
                    className="justify-self-center cursor-pointer opacity-50 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(ex.id, ex.nome_exercicio, ex.series, ex.repeticoes);
                    }}
                  >
                    ✏️
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Footer com lixeira */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 px-4 py-2 items-center">
            <div></div>
            <div></div>
            <div></div>
            <div
              className="justify-self-center cursor-pointer"
              onClick={() => onDelete(training.id)}
            >
              <img src={`${baseUrl}trash_icon.svg`} className='h-6 w-6 opacity-60' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}