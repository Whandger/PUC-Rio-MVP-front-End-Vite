import { useTreinoSummary } from '../../hooks/useTreinoSummary';

export default function TreinoSummary() {
  const { training } = useTreinoSummary();

  if (!training) {
    return (
      <section className="bg-white w-[92%] rounded-lg shadow-md p-4">
        <p className="text-gray-500">
          Nenhum treino cadastrado
        </p>
      </section>
    );
  }

  const exerciciosStr = training.exercicios
    .map(
      (ex) =>
        `${ex.nome_exercicio} ${ex.series}x${ex.repeticoes}`
    )
    .join(', ');

  return (
    <section className="bg-white w-[92%] rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-700 font-bold text-base">
          Treino
        </h3>

        <p className="text-[#3588d4] font-bold text-sm">
          Alterar Treinos
        </p>
      </div>

      <p className="text-gray-600">{exerciciosStr}</p>
    </section>
  );
}