import { usePresenca } from '../../hooks/usePresenca';

export default function Presenca() {
  const { timeString, marcarPresenca } = usePresenca();

  return (
    <section className="bg-white w-[92%] rounded-lg shadow-md flex flex-col items-center justify-center py-3">
      <h3 className="text-gray-700 font-bold text-lg">
        {timeString || 'Carregando...'}
      </h3>

      <button
        onClick={marcarPresenca}
        className="bg-[#3588d4] text-white px-4 py-1 rounded mt-2 hover:bg-blue-600 transition"
      >
        Marcar presença
      </button>
    </section>
  );
}