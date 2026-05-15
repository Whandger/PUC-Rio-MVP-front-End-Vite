import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Training, ExerciseFormData, TrainingRecord } from '../types';
import type { ReactNode } from 'react';
import { generateExerciseId, generateTrainingId } from '../utils/generateId';

interface TrainingContextType {
  trainings: Training[];
  history: TrainingRecord[];
  addTraining: (data: { nome: string; exercicios: ExerciseFormData[] }) => boolean;
  deleteTraining: (id: number) => void;
  updateExercise: (exerciseId: number, data: ExerciseFormData) => void;
  updateTraining: (id: number, data: { nome: string; exercicios: ExerciseFormData[] }) => void;
  saveTrainingRecord: (training: Training, duracao: string, data: string, hora: string) => void;
  updateTrainingRecord: (id: number, data: { nome: string; exercicios: ExerciseFormData[] }) => void;
  deleteTrainingRecord: (id: number) => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

const STORAGE_KEY = 'trainings';
const HISTORY_KEY = 'training_history';

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [history, setHistory] = useState<TrainingRecord[]>([]);

  // Carregar treinos do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
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

  // Carregar histórico do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
    }
  }, []);

  // Persistir treinos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
  }, [trainings]);

  // Persistir histórico
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

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

  // SALVAR REGISTRO DO TREINO NO HISTÓRICO
  const saveTrainingRecord = useCallback((
    training: Training,
    duracao: string,
    data: string,
    hora: string
  ) => {
    const record: TrainingRecord = {
      id: Date.now(),
      nome: training.nome,
      data,
      hora,
      duracao,
      exercicios: training.exercicios.map(ex => ({
        ...ex,
        peso: ex.peso || '',
      })),
    };

    setHistory(prev => [...prev, record]);
  }, []);

  // ATUALIZAR REGISTRO DO HISTÓRICO
  const updateTrainingRecord = useCallback((id: number, data: { nome: string; exercicios: ExerciseFormData[] }) => {
    setHistory(prev =>
      prev.map(record =>
        record.id === id
          ? { ...record, nome: data.nome, exercicios: data.exercicios }
          : record
      )
    );
  }, []);

  // EXCLUIR REGISTRO DO HISTÓRICO
  const deleteTrainingRecord = useCallback((id: number) => {
    if (!confirm('Deseja excluir este registro do histórico?')) return;
    setHistory(prev => prev.filter(record => record.id !== id));
  }, []);

  return (
    <TrainingContext.Provider value={{
      trainings,
      history,
      addTraining,
      deleteTraining,
      updateExercise,
      updateTraining,
      saveTrainingRecord,
      updateTrainingRecord,
      deleteTrainingRecord,
    }}>
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