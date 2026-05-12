import { useEffect, useState } from 'react';

import type { Training } from '../types';

import { getFirstTraining } from '../services/trainingSummaryService';

export function useTreinoSummary() {
  const [training, setTraining] = useState<Training | null>(null);

  useEffect(() => {
    async function loadTraining() {
      try {
        const treino = await getFirstTraining();

        setTraining(treino);
      } catch (error) {
        console.error(error);
      }
    }

    loadTraining();
  }, []);

  return {
    training,
  };
}