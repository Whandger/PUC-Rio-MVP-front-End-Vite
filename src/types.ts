export interface ExerciseFormData {
  id?: number; 
  nomeExercicio: string;
  serie: string;
  repeticoes: string;
  jsonId?: string; // ID do exercício no JSON
}

export type Exercise = ExerciseFormData;

export interface Training {
  id: number;
  nome: string;
  exercicios: ExerciseFormData[];
}

export interface ExercicioJSON {
  nome: string;
  exerciseId: string;
  musculoAlvo: string[];
  gifUrl: string;
}