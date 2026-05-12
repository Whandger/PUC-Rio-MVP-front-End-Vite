import { useState } from 'react';

import type { ExerciseFormData } from '../types';

interface AddTrainingData {
  nome: string;
  exercicios: ExerciseFormData[];
}

interface Params {
  onAdd: (data: AddTrainingData) => void;
}

export function useAddTrainingForm({ onAdd }: Params) {
  const [nomeTreino, setNomeTreino] = useState('');

  const [exercicios, setExercicios] = useState<
    ExerciseFormData[]
  >([
    {
      nomeExercicio: '',
      serie: '',
      repeticoes: '',
    },
  ]);

  function addRow() {
    setExercicios([
      ...exercicios,
      {
        nomeExercicio: '',
        serie: '',
        repeticoes: '',
      },
    ]);
  }

  function updateRow(
    index: number,
    field: keyof ExerciseFormData,
    value: string
  ) {
    const newExercicios = [...exercicios];

    newExercicios[index][field] = value;

    setExercicios(newExercicios);
  }

  function resetForm() {
    setNomeTreino('');

    setExercicios([
      {
        nomeExercicio: '',
        serie: '',
        repeticoes: '',
      },
    ]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nomeTreino.trim()) {
      return alert('Informe o nome do treino');
    }

    const validExercises = exercicios.filter((ex) =>
      ex.nomeExercicio.trim()
    );

    if (validExercises.length === 0) {
      return alert('Adicione pelo menos um exercício');
    }

    onAdd({
      nome: nomeTreino,
      exercicios: validExercises,
    });

    resetForm();
  }

  return {
    nomeTreino,
    exercicios,

    setNomeTreino,

    addRow,
    updateRow,
    handleSubmit,
  };
}