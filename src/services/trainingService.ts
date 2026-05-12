import type { ExerciseFormData } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function getTrainings() {
  const res = await fetch(`${API_BASE}/data/ler_treinos`);
  return res.json();
}

export async function deleteTrainingService(id: number) {
  return fetch(`${API_BASE}/data/deletar_treino/${id}`, {
    method: 'DELETE',
  });
}

export async function updateExerciseService(
  exerciseId: number,
  data: ExerciseFormData
) {
  const payload = {
    nome_exercicio: data.nomeExercicio,
    serie: data.serie,
    repeticao: data.repeticoes,
  };

  return fetch(`${API_BASE}/data/atualizar_treino/${exerciseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function createTrainingService(trainingData: {
  nome: string;
  exercicios: ExerciseFormData[];
}) {
  const payload = {
    nome: trainingData.nome,
    exercicios: trainingData.exercicios.map((ex) => ({
      nomeExercicio: ex.nomeExercicio,
      serie: ex.serie,
      repeticoes: ex.repeticoes,
    })),
  };

  return fetch(`${API_BASE}/data/salvar_treinos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}