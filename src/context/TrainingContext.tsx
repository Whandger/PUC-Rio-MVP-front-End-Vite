import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Training, ExerciseFormData } from '../types';
import type { ReactNode } from 'react';
import { generateExerciseId, generateTrainingId } from '../utils/generateId';

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

  // Carregar do localStorage e corrigir exercícios sem ID
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Migração: garante que todo exercício tenha ID
        const fixed = parsed.map((t: Training) => ({
          ...t,
          exercicios: t.exercicios.map((ex: ExerciseFormData) => ({
            ...ex,
            id: ex.id || generateExerciseId(),
          })),
        }));
        setTrainings(fixed);
      }
    } catch (err) {
      console.error('Erro ao carregar treinos:', err);
    }
  }, []);

  // Persistir no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
  }, [trainings]);

  // Adicionar treino
  const addTraining = useCallback((data: { nome: string; exercicios: ExerciseFormData[] }): boolean => {
    if (trainings.some(t => t.nome.toLowerCase() === data.nome.toLowerCase())) {
      alert('Já existe um treino com esse nome.');
      return false;
    }

    // Garante que todo exercício tenha ID usando a função unificada
    const exerciciosComId = data.exercicios.map((ex) => ({
      ...ex,
      id: ex.id || generateExerciseId(),
    }));

    const newTraining: Training = {
      id: generateTrainingId(trainings),
      nome: data.nome,
      exercicios: exerciciosComId,
    };

    setTrainings(prev => [...prev, newTraining]);
    return true;
  }, [trainings]);

  // Excluir treino
  const deleteTraining = useCallback((id: number) => {
    if (!confirm('Deseja excluir este treino?')) return;
    setTrainings(prev => prev.filter(t => t.id !== id));
  }, []);

  // Atualizar exercício
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

  // Atualizar treino completo
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