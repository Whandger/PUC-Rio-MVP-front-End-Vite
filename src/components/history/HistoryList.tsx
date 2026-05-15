// src/components/history/HistoryList.tsx
import { useTrainingContext } from "../../context/TrainingContext";
import TrainingCard from "../shared/TrainingCard";
import type { ExerciseFormData } from "../../types";

export default function HistoryList() {
  const { history, updateTrainingRecord, deleteTrainingRecord } = useTrainingContext();

  if (history.length === 0) {
    return (
      <section className="bg-white w-[92%] rounded-lg shadow-md p-4">
        <p className="text-gray-500">Nenhum treino realizado ainda</p>
      </section>
    );
  }

  const handleEditExercise = (exerciseId: number, field: keyof ExerciseFormData, value: string) => {
    const record = history.find(r => r.exercicios.some(ex => ex.id === exerciseId));
    if (record) {
      const updatedExercicios = record.exercicios.map(ex =>
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      );
      updateTrainingRecord(record.id, {
        nome: record.nome,
        exercicios: updatedExercicios,
      });
    }
  };

  const handleUpdateHistory = (id: number, data: { nome: string; exercicios: ExerciseFormData[] }) => {
    updateTrainingRecord(id, data);
  };

  const handleDelete = (id: number) => {
    deleteTrainingRecord(id);
  };

return (
  <section className="h-full flex flex-col items-center py-4">
    <h2 className="text-lg font-bold text-gray-700 mb-3">Histórico de Treinos</h2>
    
    <div className="w-full flex-1 overflow-y-auto px-2">
      <div className="flex flex-col items-center gap-3">
        {history.map((record) => (
          <TrainingCard
            key={record.id}
            training={{
              id: record.id,
              nome: record.nome,
              exercicios: record.exercicios,
            }}
            duracao={record.duracao}
            dataTreino={record.data}
            isHistoryMode={true}
            onUpdateHistory={handleUpdateHistory}
            onEditExercise={handleEditExercise}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  </section>
);
}