import { useTrainingContext } from '../context/TrainingContext';
import type { Training } from '../types';

export function useTreinoSummary() {
  const { trainings } = useTrainingContext();
  
  // Pega o primeiro treino da lista
  const training: Training | null = trainings.length > 0 ? trainings[0] : null;

  return {
    training,
  };
}