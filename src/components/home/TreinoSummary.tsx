import { useTreinoSummary } from "../../hooks/useTreinoSummary";

export default function TreinoSummary() {
  const { training } = useTreinoSummary();

  if (!training) {
    return (
      <section className="bg-white w-[92%] rounded-lg shadow-md p-4">
        <p className="text-gray-500">Nenhum treino cadastrado</p>
      </section>
    );
  }

  return (
    <section className="bg-white w-[92%] rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-700 font-bold text-base">{training.nome}</h3>

        <p className="text-[#3588d4] font-bold text-sm">Alterar Treinos</p>
      </div>

      <div className="flex flex-col gap-1">
        {training.exercicios.map((ex, index) => (
          <p key={index} className="text-gray-600">
            {ex.nomeExercicio} {ex.serie}x{ex.repeticoes}
          </p>
        ))}
      </div>
    </section>
  );
}