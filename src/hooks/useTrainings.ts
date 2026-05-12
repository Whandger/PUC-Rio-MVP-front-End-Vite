import { useCallback, useEffect, useState } from 'react';
import type { ExerciseFormData, Training } from '../types';

import {
  createTrainingService,
  deleteTrainingService,
  getTrainings,
  updateExerciseService,
} from '../services/trainingService';

export function useTrainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const fetchTrainings = useCallback(async () => {
    try {
      const json = await getTrainings();

      if (json.success) {
        setTrainings(json.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  async function deleteTraining(id: number) {
    if (!confirm('Deseja excluir?')) return;

    const res = await deleteTrainingService(id);

    if (res.ok) {
      setTrainings((prev) => prev.filter((t) => t.id !== id));
    }
  }

  async function updateExercise(
    exerciseId: number,
    data: ExerciseFormData
  ) {
    const res = await updateExerciseService(exerciseId, data);

    if (res.ok) {
      fetchTrainings();
    }
  }

  async function addTraining(trainingData: {
    nome: string;
    exercicios: ExerciseFormData[];
  }) {
    const res = await createTrainingService(trainingData);

    if (res.status === 409) {
      const data = await res.json();
      alert(data.error);
      return;
    }

    if (res.ok) {
      fetchTrainings();
      return true;
    }

    alert('Erro ao salvar');
  }

  return {
    trainings,
    addTraining,
    deleteTraining,
    updateExercise,
  };
}