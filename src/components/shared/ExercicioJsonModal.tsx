// src/components/shared/ModalExercicioJson.tsx
import type { ExercicioJSON } from "../../types";

interface Props {
  exercise: ExercicioJSON | null;
  onClose: () => void;
}

export default function ModalExercicioJson({ exercise, onClose }: Props) {
  if (!exercise) return null;

  // Função para renderizar as instruções
  const renderInstrucoes = () => {
    const instrucoes = exercise.instrucoes;

    if (!instrucoes) {
      return <p className="text-gray-700">Instruções em breve.</p>;
    }

    // Se for um array, renderiza cada item em uma linha
    if (Array.isArray(instrucoes)) {
      return (
        <div className="space-y-4 text-gray-700">
          {instrucoes.map((passo, index) => (
            <p key={index} className="pl-1">
              {passo}
            </p>
          ))}
        </div>
      );
    }

    // Se for uma string simples
    return <p className="text-gray-700">{instrucoes}</p>;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col relative">
        {/* Botão de fechar */}
        <button
          className="absolute top-3 right-3 z-10 border border-gray-500 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-400 text-[18px] leading-none shadow-md"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Título */}
        <h3 className="text-xl font-bold p-4 py-10 pb-2 text-center shrink-0">
          {exercise.nome}
        </h3>

        {/* Conteúdo */}
        <div className="overflow-y-auto px-6 pb-6">
          <img
            src={exercise.gifUrl}
            alt={exercise.nome}
            className="w-full h-auto rounded mb-4"
          />
          <div>
            <h4 className="font-semibold mb-3">Como realizar:</h4>
            {renderInstrucoes()}
          </div>
        </div>
      </div>
    </div>
  );
}
