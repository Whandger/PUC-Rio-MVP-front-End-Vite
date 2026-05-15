import { useState, useEffect, useRef } from 'react';
import { useTrainingContext } from '../context/TrainingContext';
import type { Training } from '../types';

interface UsePresencaProps {
  training: Training | null;
}

export function usePresenca({ training }: UsePresencaProps) {
  const { saveTrainingRecord } = useTrainingContext();
  const [timeString, setTimeString] = useState('');
  const [horas, setHoras] = useState('');
  const [minutos, setMinutos] = useState('');
  const [duracaoAutomatica, setDuracaoAutomatica] = useState('0h0m');
  const startTimeRef = useRef<Date | null>(null);

  // Cronômetro automático
  useEffect(() => {
    const agora = new Date();
    startTimeRef.current = agora;

    function update() {
      const agora = new Date();

      const diaSemana = agora
        .toLocaleDateString('pt-BR', {
          weekday: 'short',
        })
        .replace('.', '');

      const data = agora.toLocaleDateString('pt-BR');

      const horaFormatada = String(agora.getHours()).padStart(2, '0');
      const minutoFormatado = String(agora.getMinutes()).padStart(2, '0');

      setTimeString(`${diaSemana} ${data} ${horaFormatada}:${minutoFormatado}`);

      // Atualiza duração automática
      if (startTimeRef.current) {
        const diffMs = agora.getTime() - startTimeRef.current.getTime();
        const diffMin = Math.floor(diffMs / 60000);
        const h = Math.floor(diffMin / 60);
        const m = diffMin % 60;
        setDuracaoAutomatica(`${h}h${m}m`);
      }
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  function marcarPresenca() {
    if (!training) {
      alert('Nenhum treino selecionado!');
      return;
    }

    // Valida se a duração foi preenchida
    if (!horas.trim() && !minutos.trim()) {
      alert('Por favor, preencha a duração do treino!');
      return;
    }

    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

    // Se algum campo estiver vazio, considera como 0
    const horasFinal = horas.trim() || '0';
    const minutosFinal = minutos.trim() || '0';
    const duracaoFinal = `${horasFinal}h${minutosFinal}m`;

    // Salva no histórico
    saveTrainingRecord(training, duracaoFinal, data, hora);
    alert(`Presença registrada! Treino: ${training.nome} - ${duracaoFinal}`);
  }

  return {
    timeString,
    horas,
    setHoras,
    minutos,
    setMinutos,
    duracaoAutomatica,
    marcarPresenca,
  };
}