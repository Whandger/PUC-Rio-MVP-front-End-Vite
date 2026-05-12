import { useState } from 'react';

import AddTrainingForm from '../components/Training/AddTrainingForm';
import TrainingList from '../components/Training/TrainingList';

import { useTrainings } from '../hooks/useTrainings';

export default function TreinoPage() {
  const [showForm, setShowForm] = useState(false);

  const {
    trainings,
    addTraining,
    deleteTraining,
    updateExercise,
  } = useTrainings();

  async function handleAddTraining(data: any) {
    const success = await addTraining(data);

    if (success) {
      setShowForm(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <TrainingList
        trainings={trainings}
        onDelete={deleteTraining}
        onUpdateExercise={updateExercise}
      />

      <AddTrainingForm
        visible={showForm}
        onAdd={handleAddTraining}
        onCancel={() => setShowForm(false)}
        onToggle={() => setShowForm((prev) => !prev)}
      />
    </div>
  );
}