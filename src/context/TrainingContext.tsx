import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Training, ExerciseFormData } from '../types';
import type { ReactNode } from 'react';

interface TrainingContextType {
  trainings: Training[];
  addTraining: (data: { nome: string; exercicios: ExerciseFormData[] }) => boolean;
  deleteTraining: (id: number) => void;
  updateExercise: (exerciseId: number, data: ExerciseFormData) => void;
  updateTraining: (id: number, data: { nome: string; exercicios: ExerciseFormData[] }) => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

const STORAGE_KEY = 'trainings';

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTrainings(JSON.parse(stored));
    } catch (err) {
      console.error('Erro ao carregar treinos:', err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
  }, [trainings]);

  const getNextId = (): number => {
    if (trainings.length === 0) return 1;
    return Math.max(...trainings.map(t => t.id)) + 1;
  };

  const addTraining = useCallback((data: { nome: string; exercicios: ExerciseFormData[] }): boolean => {
    if (trainings.some(t => t.nome.toLowerCase() === data.nome.toLowerCase())) {
      alert('Já existe um treino com esse nome.');
      return false;
    }

    const exerciciosComId = data.exercicios.map((ex, idx) => ({
      ...ex,
      id: Date.now() + idx,
    }));

    const newTraining: Training = {
      id: getNextId(),
      nome: data.nome,
      exercicios: exerciciosComId,
    };

    setTrainings(prev => [...prev, newTraining]);
    return true;
  }, [trainings]);

  const deleteTraining = useCallback((id: number) => {
    if (!confirm('Deseja excluir este treino?')) return;
    setTrainings(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateExercise = useCallback((exerciseId: number, data: ExerciseFormData) => {
    setTrainings(prev =>
      prev.map(training => ({
        ...training,
        exercicios: training.exercicios.map(ex =>
          ex.id === exerciseId ? { ...ex, ...data } : ex
        )
      }))
    );
  }, []);
  
  const updateTraining = useCallback((id: number, data: { nome: string; exercicios: ExerciseFormData[] }) => {
    setTrainings(prev =>
      prev.map(t => t.id === id ? { ...t, nome: data.nome, exercicios: data.exercicios } : t)
    );
  }, []);

  return (
    <TrainingContext.Provider value={{ trainings, addTraining, deleteTraining, updateExercise, updateTraining }}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTrainingContext() {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTrainingContext deve ser usado dentro de TrainingProvider');
  }
  return context;
}