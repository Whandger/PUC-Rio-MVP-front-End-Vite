export interface Exercise {
  id: number;
  nome_exercicio: string;
  series: number;
  repeticoes: number;
}

export interface Training {
  id: number;
  nome: string;
  exercicios: Exercise[];
}

export interface ExerciseFormData {
  nomeExercicio: string;
  serie: string;
  repeticoes: string;
}