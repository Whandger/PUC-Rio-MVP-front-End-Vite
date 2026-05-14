import { useState } from "react";

import AddTrainingForm from "../components/Training/AddTrainingForm";
import TrainingList from "../components/Training/TrainingList";

import { useTrainings } from "../hooks/useTrainings";

export default function TreinoPage() {
  const [showForm, setShowForm] = useState(false);
  // forçar a recriação do formulário
  const [formKey, setFormKey] = useState(0);

  const { trainings, addTraining, deleteTraining, updateExercise } = useTrainings();

  async function handleAddTraining(data: any) {
    const success = await addTraining(data);
    if (success) {
      setShowForm(false);
      setFormKey(prev => prev + 1); // Reseta o formulário
    }
  }

  const handleCancelForm = () => {
    setShowForm(false);
    setFormKey(prev => prev + 1); // Reseta o formulário ao cancelar
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <AddTrainingForm
        key={formKey}
        visible={showForm}
        onAdd={handleAddTraining}
        onCancel={handleCancelForm}
        onToggle={() => setShowForm((prev) => !prev)}
      />
      <TrainingList
        trainings={trainings}
        onDelete={deleteTraining}
        onUpdateExercise={updateExercise}
      />
    </div>
  );
}
