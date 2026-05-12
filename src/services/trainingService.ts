import type { ExerciseFormData, Training } from '../types';
import trainingsData from '../data/trainings.json';

// Estado local em memória — simula o banco de dados enquanto a sessão está aberta
let localData: typeof trainingsData = JSON.parse(JSON.stringify(trainingsData));

// Contador para gerar IDs únicos de novos treinos e exercícios
let nextTrainingId = Math.max(...localData.data.map((t) => t.id)) + 1;
let nextExerciseId =
  Math.max(...localData.data.flatMap((t) => t.exercicios.map((e) => e.id))) + 1;

export async function getTrainings(): Promise<{ success: boolean; data: Training[] }> {
  return structuredClone(localData);
}

export async function deleteTrainingService(id: number): Promise<{ ok: boolean }> {
  localData.data = localData.data.filter((t) => t.id !== id);
  return { ok: true };
}

export async function updateExerciseService(
  exerciseId: number,
  data: ExerciseFormData
): Promise<{ ok: boolean }> {
  for (const training of localData.data) {
    const ex = training.exercicios.find((e) => e.id === exerciseId);
    if (ex) {
      ex.nome_exercicio = data.nomeExercicio;
      ex.series = Number(data.serie);
      ex.repeticoes = Number(data.repeticoes);
      return { ok: true };
    }
  }
  return { ok: false };
}

export async function createTrainingService(trainingData: {
  nome: string;
  exercicios: ExerciseFormData[];
}): Promise<{ ok: boolean; status: number; json: () => Promise<{ error: string }> }> {
  // Verifica nome duplicado
  const exists = localData.data.some(
    (t) => t.nome.toLowerCase() === trainingData.nome.toLowerCase()
  );

  if (exists) {
    return {
      ok: false,
      status: 409,
      json: async () => ({ error: 'Já existe um treino com esse nome.' }),
    };
  }

  const newTraining: Training = {
    id: nextTrainingId++,
    nome: trainingData.nome,
    exercicios: trainingData.exercicios.map((ex) => ({
      id: nextExerciseId++,
      nome_exercicio: ex.nomeExercicio,
      series: Number(ex.serie),
      repeticoes: Number(ex.repeticoes),
    })),
  };

  localData.data.push(newTraining);

  return { ok: true, status: 201, json: async () => ({ error: '' }) };
}