import { useEffect, useState } from 'react';

export function usePresenca() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    function update() {
      const agora = new Date();

      const diaSemana = agora
        .toLocaleDateString('pt-BR', {
          weekday: 'short',
        })
        .replace('.', '');

      const data = agora.toLocaleDateString('pt-BR');

      const horas = String(agora.getHours()).padStart(2, '0');

      const minutos = String(agora.getMinutes()).padStart(2, '0');

      setTimeString(
        `${diaSemana} ${data} ${horas}:${minutos}`
      );
    }

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  function marcarPresenca() {
    // futura request POST
    alert('Presença registrada!');
  }

  return {
    timeString,
    marcarPresenca,
  };
}