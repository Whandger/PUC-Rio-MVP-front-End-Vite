import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Training, ExerciseFormData } from '../types';
import type { ReactNode } from 'react';

interface TrainingContextType {
  trainings: Training[];
  addTraining: (data: { nome: string; exercicios: ExerciseFormData[] }) => boolean;
  deleteTraining: (id: number) => void;
  updateExercise: (exerciseId: number, data: ExerciseFormData) => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

const STORAGE_KEY = 'trainings';

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [trainings, setTrainings] = useState<Training[]>([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTrainings(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Erro ao carregar treinos:', err);
    }
  }, []);

  // Persistir sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
  }, [trainings]);

  // Gera IDs sequenciais simples
  const getNextId = (): number => {
    if (trainings.length === 0) return 1;
    return Math.max(...trainings.map(t => t.id)) + 1;
  };

  // Adicionar treino
  const addTraining = useCallback((data: { nome: string; exercicios: ExerciseFormData[] }): boolean => {
    // Verifica se já existe treino com mesmo nome
    if (trainings.some(t => t.nome.toLowerCase() === data.nome.toLowerCase())) {
      alert('Já existe um treino com esse nome.');
      return false;
    }

    // Cria exercícios com ID
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

  return (
    <TrainingContext.Provider value={{ trainings, addTraining, deleteTraining, updateExercise }}>
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